import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ManagerReportPost = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [reasons, setReasons] = useState([]);
    const [deleting, setDeleting] = useState(false);

    // Lấy danh sách báo cáo và gộp theo postId
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('ReportPost')
            .onSnapshot(async snapshot => {
                const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Gộp các báo cáo theo postId
                const grouped = {};
                for (const report of reports) {
                    if (!grouped[report.postId]) grouped[report.postId] = [];
                    grouped[report.postId].push(report);
                }
                // Lấy thông tin bài viết từ Posts
                const postIds = Object.keys(grouped);
                const postsSnap = await firestore().collection('Posts').where('idPost', 'in', postIds).get();
                const postsMap = {};
                postsSnap.docs.forEach(doc => {
                    postsMap[doc.data().idPost] = doc.data();
                });
                // Tạo mảng dữ liệu cho FlatList
                const data = postIds.map(postId => ({
                    postId,
                    reasons: grouped[postId].map(r => r.reason),
                    reportCount: grouped[postId].length,
                    post: postsMap[postId] || null,
                }));
                setReportData(data);
                setLoading(false);
            });
        return () => unsubscribe();
    }, []);

    // Xử lý xóa bài viết
    const handleDeletePost = async (postId) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa bài viết này không?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: async () => {
                        setDeleting(true);
                        try {
                            // Xóa bài viết
                            await firestore().collection('Posts').doc(postId).delete();
                            // Xóa các báo cáo liên quan
                            const reportsSnap = await firestore().collection('ReportPost').where('postId', '==', postId).get();
                            const batch = firestore().batch();
                            reportsSnap.docs.forEach(doc => batch.delete(doc.ref));
                            await batch.commit();
                            Alert.alert('Thành công', 'Đã xóa bài viết và các báo cáo liên quan');
                        } catch (err) {
                            Alert.alert('Lỗi', 'Không thể xóa bài viết');
                        }
                        setDeleting(false);
                    }
                }
            ]
        );
    };

    // Khi bấm vào 1 bài viết
    const handlePressItem = (item) => {
        setSelectedPost(item);
        setReasons(item.reasons);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handlePressItem(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="file-document-outline" size={28} color="#FCBB3C" />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.post?.text ? item.post.text : '[Bài viết đã bị xóa]'}
                    </Text>
                    <Text style={styles.subTitle}>Số lần bị báo cáo: <Text style={{ color: '#FE7E00', fontWeight: 'bold' }}>{item.reportCount}</Text></Text>
                </View>
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeletePost(item.postId)}
                    disabled={deleting}
                >
                    <MaterialCommunityIcons name="delete" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Quản lý báo cáo bài viết</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FCBB3C" style={{ marginTop: 30 }} />
            ) : (
                <FlatList
                    data={reportData}
                    keyExtractor={item => item.postId}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 15 }}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888', marginTop: 30 }}>Không có bài viết bị báo cáo</Text>}
                />
            )}

            {/* Modal hiển thị lý do báo cáo */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Lý do bị báo cáo</Text>
                        <FlatList
                            data={reasons}
                            keyExtractor={(item, idx) => idx.toString()}
                            renderItem={({ item, index }) => (
                                <Text style={styles.reasonItem}>{index + 1}. {item}</Text>
                            )}
                            ListEmptyComponent={<Text style={{ color: '#888' }}>Không có lý do</Text>}
                        />
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { fontSize: 20, fontWeight: 'bold', color: '#FCBB3C', textAlign: 'center', marginVertical: 15 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 2 },
    title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    subTitle: { fontSize: 14, color: '#555', marginTop: 4 },
    deleteBtn: { backgroundColor: '#FE7E00', borderRadius: 8, padding: 8, marginLeft: 10 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#FCBB3C' },
    reasonItem: { fontSize: 15, color: '#333', marginBottom: 8, textAlign: 'left', width: '100%' },
    closeBtn: { marginTop: 20, backgroundColor: '#FE7E00', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 30 },
});

export default ManagerReportPost;
