import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Alert,
    Modal,
    TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QueryAvata from './Component/QueryAvata';
import QueryName from './Component/QueryName';

const IndexChat = ({ navigation }) => {
    const [listChat, setListChat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [selectedChatForReport, setSelectedChatForReport] = useState(null);

    // Get all chats
    const getAllChats = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const userId = await AsyncStorage.getItem('USERID');
            if (!userId) {
                throw new Error("Không tìm thấy thông tin người dùng");
            }

            const userDoc = await firestore()
                .collection('Users')
                .doc(userId)
                .get();

            if (!userDoc.exists) {
                throw new Error("Không tìm thấy thông tin người dùng");
            }

            const listUser = userDoc.data().listChat.map(item => {
                const chatId = userId < item ? `${userId}-${item}` : `${item}-${userId}`;
                return {
                    userId,
                    sender: item,
                    idChat: chatId
                };
            });

            setListChat(listUser);
        } catch (err) {
            console.error("Error fetching chats:", err);
            setError("Không thể tải danh sách chat");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    // Setup initial data fetch
    useEffect(() => {
        getAllChats();
    }, [getAllChats]);

    // Handle chat selection
    const goToChat = useCallback(async (item) => {
        try {
            const userId = await AsyncStorage.getItem('USERID');
            if (!userId) {
                throw new Error("Không tìm thấy thông tin người dùng");
            }
            navigation.navigate('ChatInBox', { item, userIdd: userId });
        } catch (err) {
            console.error("Error navigating to chat:", err);
            Alert.alert("Lỗi", "Không thể mở chat");
        }
    }, [navigation]);

    // Handle chat options
    const handleChatOptions = useCallback((chatId) => {
        setSelectedChat(selectedChat === chatId ? null : chatId);
    }, [selectedChat]);

    // Handle chat actions
    const handleChatAction = useCallback((action, chatId) => {
        switch (action) {
            case 'lock':
                Alert.alert(
                    "Khóa tin nhắn",
                    "Bạn có chắc chắn muốn khóa cuộc trò chuyện này?",
                    [
                        { text: "Hủy", style: "cancel" },
                        {
                            text: "Khóa",
                            style: "destructive",
                            onPress: () => {
                                // Implement lock chat functionality
                                Alert.alert("Thành công", "Đã khóa cuộc trò chuyện");
                            }
                        }
                    ]
                );
                break;
            case 'delete':
                Alert.alert(
                    "Xóa tin nhắn",
                    "Bạn có chắc chắn muốn xóa cuộc trò chuyện này?",
                    [
                        { text: "Hủy", style: "cancel" },
                        {
                            text: "Xóa",
                            style: "destructive",
                            onPress: async () => {
                                try {
                                    // Implement delete chat functionality
                                    setListChat(prev => prev.filter(chat => chat.idChat !== chatId));
                                    Alert.alert("Thành công", "Đã xóa cuộc trò chuyện");
                                } catch (err) {
                                    console.error("Error deleting chat:", err);
                                    Alert.alert("Lỗi", "Không thể xóa cuộc trò chuyện");
                                }
                            }
                        }
                    ]
                );
                break;
            case 'report':
                setSelectedChatForReport(chatId);
                setReportModalVisible(true);
                break;
        }
        setSelectedChat(null);
    }, []);

    const handleSubmitReport = useCallback(async () => {
        if (!reportReason.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập lý do báo cáo");
            return;
        }

        try {
            const userId = await AsyncStorage.getItem('USERID');
            if (!userId) {
                throw new Error("Không tìm thấy thông tin người dùng");
            }

            // Tìm thông tin người bị báo cáo từ chatId
            const chat = listChat.find(chat => chat.idChat === selectedChatForReport);
            if (!chat) {
                throw new Error("Không tìm thấy thông tin cuộc trò chuyện");
            }

            // Thêm report vào collection Reports
            await firestore().collection('ReportsChat').add({
                chatId: selectedChatForReport,
                reporterId: userId, // ID người báo cáo
                reportedUserId: chat.sender, // ID người bị báo cáo
                reason: reportReason,
                status: 'pending',
                createdAt: firestore.FieldValue.serverTimestamp()
            });

            Alert.alert("Thành công", "Báo cáo đã được gửi thành công");
            setReportModalVisible(false);
            setReportReason('');
            setSelectedChatForReport(null);
        } catch (err) {
            console.error("Error submitting report:", err);
            Alert.alert("Lỗi", "Không thể gửi báo cáo");
        }
    }, [reportReason, selectedChatForReport, listChat]);

    // Memoize render item function
    const renderItem = useCallback(({ item }) => (
        <View>
            <TouchableOpacity
                style={styles.chatItem}
                onPress={() => goToChat(item)}
            >
                <QueryAvata userId={item.sender} />
                <View style={styles.chatInfo}>
                    <QueryName userId={item.sender} />
                    <Text style={styles.timeText}>10:43 PM</Text>
                </View>
                <TouchableOpacity
                    style={styles.optionsButton}
                    onPress={() => handleChatOptions(item.idChat)}
                >
                    <Entypo name='dots-three-horizontal' size={20} color='#000' />
                </TouchableOpacity>
            </TouchableOpacity>

            {selectedChat === item.idChat && (
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleChatAction('lock', item.idChat)}
                    >
                        <Entypo name='lock' size={25} color='#000' />
                        <Text style={styles.optionText}>Khóa tin nhắn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleChatAction('delete', item.idChat)}
                    >
                        <Entypo name='trash' size={25} color='#000' />
                        <Text style={styles.optionText}>Xóa tin nhắn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleChatAction('report', item.idChat)}
                    >
                        <Entypo name='flag' size={25} color='#000' />
                        <Text style={styles.optionText}>Báo cáo</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    ), [goToChat, handleChatOptions, handleChatAction, selectedChat]);

    // Handle pull to refresh
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllChats();
    }, [getAllChats]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name='caretleft' size={30} color='#FCBB3C' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>List Chat</Text>
                <View style={styles.headerRight} />
            </View>

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
                    <ActivityIndicator size="large" color="#FCBB3C" />
                </View>
            ) : (
                <FlatList
                    data={listChat}
                    renderItem={renderItem}
                    keyExtractor={item => item.idChat}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#FCBB3C']}
                            tintColor="#FCBB3C"
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Chưa có cuộc trò chuyện nào</Text>
                        </View>
                    }
                />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={reportModalVisible}
                onRequestClose={() => setReportModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Báo cáo tin nhắn</Text>
                        <TextInput
                            style={styles.reportInput}
                            placeholder="Nhập lý do báo cáo..."
                            value={reportReason}
                            onChangeText={setReportReason}
                            multiline
                            numberOfLines={4}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    setReportModalVisible(false);
                                    setReportReason('');
                                    setSelectedChatForReport(null);
                                }}
                            >
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.submitButton]}
                                onPress={handleSubmitReport}
                            >
                                <Text style={[styles.buttonText, styles.submitButtonText]}>Gửi báo cáo</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        elevation: 2,
    },
    backButton: {
        marginLeft: 10,
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FCCC6F',
        flex: 1,
        textAlign: 'center',
    },
    headerRight: {
        width: 40,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 2,
    },
    chatInfo: {
        flexDirection: 'column',
        marginLeft: 10,
        flex: 1,
    },
    timeText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#666',
    },
    optionsButton: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    optionsContainer: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginVertical: 4,
    },
    optionText: {
        color: '#333',
        fontWeight: '500',
        marginLeft: 10,
        fontSize: 14,
    },
    listContent: {
        paddingBottom: 15,
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
        backgroundColor: '#FCBB3C',
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
        backgroundColor: '#FCBB3C',
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
});

export default IndexChat;