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
        }
        setSelectedChat(null);
    }, []);

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
                <Text style={styles.headerTitle}>BOX CHAT</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginHorizontal: 20,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#FCCC6F',
        backgroundColor: '#FCCC6F',
    },
    optionText: {
        color: '#000',
        fontWeight: 'bold',
        marginLeft: 5,
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
});

export default IndexChat;