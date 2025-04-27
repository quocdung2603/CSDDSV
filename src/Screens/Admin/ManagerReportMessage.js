import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ManagerReportMessage = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [reasons, setReasons] = useState([]);
    const [deleting, setDeleting] = useState(false);
    const MAX_RESOLVE = 3; // Số lần giải quyết tối đa trước khi khóa tài khoản

    // Lấy danh sách báo cáo và gộp theo chatId
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('ReportsChat')
            .onSnapshot(async snapshot => {
                const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Gộp các báo cáo theo chatId
                const grouped = {};
                for (const report of reports) {
                    if (!grouped[report.chatId]) grouped[report.chatId] = [];
                    grouped[report.chatId].push(report);
                }
                // Lấy thông tin người dùng bị báo cáo
                const chatIds = Object.keys(grouped);
                // Lấy thông tin người bị báo cáo từ báo cáo đầu tiên của mỗi chatId
                const userIds = chatIds.map(id => grouped[id][0]?.reportedUserId).filter(Boolean);
                let usersMap = {};
                if (userIds.length > 0) {
                    const usersSnap = await firestore().collection('Users').where('userId', 'in', userIds).get();
                    usersSnap.docs.forEach(doc => {
                        usersMap[doc.data().userId] = doc.data();
                    });
                }
                // Tạo mảng dữ liệu cho FlatList
                const data = chatIds.map(chatId => ({
                    chatId,
                    reasons: grouped[chatId].map(r => r.reason),
                    reportCount: grouped[chatId].length,
                    reportedUser: usersMap[grouped[chatId][0]?.reportedUserId] || null,
                }));
                setReportData(data);
                setLoading(false);
            });
        return () => unsubscribe();
    }, []);

    // Xử lý giải quyết báo cáo
    const handleResolve = async (chatId, reportedUserId) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn giải quyết báo cáo này không?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Giải quyết',
                    style: 'default',
                    onPress: async () => {
                        setDeleting(true);
                        try {
                            // Tăng resolveCount cho user bị báo cáo
                            const userRef = firestore().collection('Users').doc(reportedUserId);
                            const userDoc = await userRef.get();
                            let resolveCount = userDoc.data()?.resolveCount || 0;
                            resolveCount += 1;

                            // Không còn tự động khóa tài khoản nữa!
                            await userRef.update({ resolveCount });
                            Alert.alert('Đã giải quyết báo cáo. Số lần vi phạm: ' + resolveCount);

                            // Xóa các báo cáo liên quan sau khi giải quyết
                            const reportsSnap = await firestore().collection('ReportsChat').where('chatId', '==', chatId).get();
                            const batch = firestore().batch();
                            reportsSnap.docs.forEach(doc => batch.delete(doc.ref));
                            await batch.commit();
                        } catch (err) {
                            Alert.alert('Lỗi', 'Không thể giải quyết báo cáo');
                        }
                        setDeleting(false);
                    }
                }
            ]
        );
    };

    // Khi bấm vào 1 cuộc trò chuyện
    const handlePressItem = (item) => {
        setSelectedChat(item);
        setReasons(item.reasons);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handlePressItem(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="message-alert-outline" size={28} color="#FCBB3C" />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.reportedUser?.name ? `Người bị báo cáo: ${item.reportedUser.name}` : '[Không tìm thấy người dùng]'}
                    </Text>
                    <Text style={styles.subTitle}>Số lần bị báo cáo: <Text style={{ color: '#FE7E00', fontWeight: 'bold' }}>{item.reportCount}</Text></Text>
                </View>
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleResolve(item.chatId, item.reportedUser?.userId)}
                    disabled={deleting}
                >
                    <MaterialCommunityIcons name="check-circle-outline" size={24} color="#fff" />
                    <Text style={{ color: '#fff', marginLeft: 5 }}>Giải quyết</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Quản lý báo cáo tin nhắn</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FCBB3C" style={{ marginTop: 30 }} />
            ) : (
                <FlatList
                    data={reportData}
                    keyExtractor={item => item.chatId}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 15 }}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888', marginTop: 30 }}>Không có tin nhắn bị báo cáo</Text>}
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

export default ManagerReportMessage;
