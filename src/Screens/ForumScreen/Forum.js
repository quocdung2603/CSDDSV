import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Alert,
    Modal,
    TextInput,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QueryUser from './component/QueryUser';

const Forum = ({ navigation }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [selectedPostForReport, setSelectedPostForReport] = useState(null);
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);

    // Get current user ID
    useEffect(() => {
        const getUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('USERID');
                setUserId(id);
            } catch (err) {
                console.error("Error getting user ID:", err);
            }
        };
        getUserId();
    }, []);

    // Memoize the getList function to prevent unnecessary re-renders
    const getList = useCallback((data) => {
        try {
            const posts = data.map(item => item._data);
            posts.sort((a, b) => b.time - a.time);
            setList(posts);
            setError(null);
        } catch (err) {
            console.error("Error processing posts:", err);
            setError("Có lỗi xảy ra khi tải bài viết");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    // Handle like/unlike post
    const handleLike = useCallback(async (postId, currentLikes) => {
        if (!userId) {
            Alert.alert("Lỗi", "Vui lòng đăng nhập để thích bài viết");
            return;
        }

        try {
            const isLiked = currentLikes.includes(userId);
            const newLikes = isLiked
                ? currentLikes.filter(id => id !== userId)
                : [...currentLikes, userId];

            await firestore()
                .collection('Posts')
                .doc(postId)
                .update({
                    like: newLikes
                });

            // Update local state
            setList(prevList =>
                prevList.map(post =>
                    post.idPost === postId
                        ? { ...post, like: newLikes }
                        : post
                )
            );
        } catch (err) {
            console.error("Error updating like:", err);
            Alert.alert("Lỗi", "Không thể cập nhật lượt thích");
        }
    }, [userId]);

    // Memoize the GetPost function
    const GetPost = useCallback(() => {
        try {
            const unsubscribe = firestore()
                .collection('Posts')
                .onSnapshot(
                    dt => getList(dt.docs),
                    err => {
                        console.error("Error fetching posts:", err);
                        setError("Không thể tải bài viết");
                        setLoading(false);
                    }
                );
            return unsubscribe;
        } catch (err) {
            console.error("Error setting up posts listener:", err);
            setError("Có lỗi xảy ra");
            setLoading(false);
        }
    }, [getList]);

    // Setup posts listener
    useEffect(() => {
        const unsubscribe = GetPost();
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [GetPost]);

    // Handle pull to refresh
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        GetPost();
    }, [GetPost]);

    // Handle report post
    const handleReport = useCallback(async () => {
        if (!reportReason.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập lý do báo cáo");
            return;
        }

        try {
            setIsSubmittingReport(true);
            if (!userId) {
                throw new Error("Không tìm thấy thông tin người dùng");
            }

            // Tạo batch write để đảm bảo tính atomic
            const batch = firestore().batch();
            const reportRef = firestore().collection('ReportPost').doc();

            batch.set(reportRef, {
                postId: selectedPostForReport.idPost,
                reporterId: userId,
                reportedUserId: selectedPostForReport.userId,
                reason: reportReason,
                status: 'pending',
                createdAt: firestore.FieldValue.serverTimestamp()
            });

            // Commit batch
            await batch.commit();

            // Đóng modal và reset state
            setReportModalVisible(false);
            setReportReason('');
            setSelectedPostForReport(null);

            // Hiển thị thông báo thành công
            Alert.alert("Thành công", "Báo cáo đã được gửi thành công");
        } catch (err) {
            console.error("Error submitting report:", err);
            Alert.alert("Lỗi", "Không thể gửi báo cáo");
        } finally {
            setIsSubmittingReport(false);
        }
    }, [reportReason, selectedPostForReport, userId]);

    // Memoize the renderPost function
    const renderPost = useCallback(({ item }) => {
        const isLiked = item.like?.includes(userId);
        const isOwnPost = item.userId === userId;

        return (
            <View style={styles.postContainer}>
                <View style={styles.postHeader}>
                    <QueryUser user={item.userId} time={item.time} />
                    {isOwnPost ? (
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => {
                                // Xử lý menu cho bài viết của mình
                                Alert.alert(
                                    "Tùy chọn",
                                    "Bạn muốn thực hiện thao tác gì?",
                                    [
                                        {
                                            text: "Xóa bài viết",
                                            onPress: () => {
                                                Alert.alert(
                                                    "Xác nhận",
                                                    "Bạn có chắc chắn muốn xóa bài viết này?",
                                                    [
                                                        { text: "Hủy", style: "cancel" },
                                                        {
                                                            text: "Xóa",
                                                            style: "destructive",
                                                            onPress: async () => {
                                                                try {
                                                                    await firestore()
                                                                        .collection('Posts')
                                                                        .doc(item.idPost)
                                                                        .delete();
                                                                    Alert.alert("Thành công", "Đã xóa bài viết");
                                                                } catch (err) {
                                                                    console.error("Error deleting post:", err);
                                                                    Alert.alert("Lỗi", "Không thể xóa bài viết");
                                                                }
                                                            }
                                                        }
                                                    ]
                                                );
                                            }
                                        },
                                        { text: "Hủy", style: "cancel" }
                                    ]
                                );
                            }}
                        >
                            <Entypo name='dots-three-horizontal' size={20} color='#666' />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.reportButton}
                            onPress={() => {
                                setSelectedPostForReport(item);
                                setReportModalVisible(true);
                            }}
                        >
                            <Entypo name='flag' size={20} color='#666' />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.postContent}>
                    <Text style={styles.postText}>{item.text}</Text>

                    {item.img && (
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.postImage}
                                source={{ uri: item.img }}
                            />
                        </View>
                    )}

                    <View style={styles.postActions}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => handleLike(item.idPost, item.like || [])}
                        >
                            <AntDesign
                                name={isLiked ? 'like1' : 'like2'}
                                size={24}
                                color={isLiked ? '#FE7E00' : '#666'}
                            />
                            <Text style={[
                                styles.actionText,
                                isLiked && styles.likedText
                            ]}>
                                {item.like?.length || 0} Thích
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => navigation.navigate('ListComment', { item })}
                        >
                            <Entypo name='chat' size={24} color='#666' />
                            <Text style={styles.actionText}>
                                {item.cmt?.length || 0} Bình luận
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name='share-social' size={24} color='#666' />
                            <Text style={styles.actionText}>Chia sẻ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }, [navigation, userId, handleLike]);

    // Memoize the keyExtractor function
    const keyExtractor = useCallback((item, index) => `${item.idPost || index}`, []);

    // Memoize the list content style
    const listContentStyle = useMemo(() => ({
        paddingBottom: 15,
        paddingTop: 10,
    }), []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Diễn Đàn Tìm Kiếm</Text>
            </View>

            <TouchableOpacity
                style={styles.createPostButton}
                onPress={() => navigation.navigate('AddPost')}
            >
                <View style={styles.createPostContent}>
                    <Text style={styles.createPostText}>Bạn cần đăng bài tìm sản phẩm gì?</Text>
                    <AntDesign name='picture' size={24} color='#FE7E00' />
                </View>
            </TouchableOpacity>

            {error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={onRefresh}
                    >
                        <Text style={styles.retryText}>Thử lại</Text>
                    </TouchableOpacity>
                </View>
            ) : loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FE7E00" />
                </View>
            ) : (
                <FlatList
                    data={list}
                    renderItem={renderPost}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={listContentStyle}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#FE7E00']}
                            tintColor="#FE7E00"
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Chưa có bài viết nào</Text>
                        </View>
                    }
                />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={reportModalVisible}
                onRequestClose={() => {
                    if (!isSubmittingReport) {
                        setReportModalVisible(false);
                        setReportReason('');
                        setSelectedPostForReport(null);
                    }
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Báo cáo bài viết</Text>
                        <TextInput
                            style={styles.reportInput}
                            placeholder="Nhập lý do báo cáo..."
                            value={reportReason}
                            onChangeText={setReportReason}
                            multiline
                            numberOfLines={4}
                            editable={!isSubmittingReport}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    if (!isSubmittingReport) {
                                        setReportModalVisible(false);
                                        setReportReason('');
                                        setSelectedPostForReport(null);
                                    }
                                }}
                                disabled={isSubmittingReport}
                            >
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.submitButton,
                                    isSubmittingReport && styles.disabledButton
                                ]}
                                onPress={handleReport}
                                disabled={isSubmittingReport}
                            >
                                {isSubmittingReport ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={[styles.buttonText, styles.submitButtonText]}>
                                        Gửi báo cáo
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        elevation: 2,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FE7E00',
        textAlign: 'center',
    },
    createPostButton: {
        margin: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    createPostContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        justifyContent: 'space-between',
    },
    createPostText: {
        fontSize: 16,
        color: '#666',
        flex: 1,
    },
    postContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    postContent: {
        padding: 15,
    },
    postText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 15,
    },
    imageContainer: {
        height: 220,
        marginBottom: 15,
    },
    postImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    actionText: {
        marginLeft: 5,
        color: '#666',
        fontSize: 14,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#ff4444',
        textAlign: 'center',
        marginBottom: 15,
    },
    retryButton: {
        backgroundColor: '#FE7E00',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    retryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    likedText: {
        color: '#FE7E00',
        fontWeight: 'bold',
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    menuButton: {
        padding: 5,
    },
    reportButton: {
        padding: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    reportInput: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
    },
    submitButton: {
        backgroundColor: '#FE7E00',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    submitButtonText: {
        color: '#fff',
    },
    disabledButton: {
        opacity: 0.7,
    },
});

export default Forum;