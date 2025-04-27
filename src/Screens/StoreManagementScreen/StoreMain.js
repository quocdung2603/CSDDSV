import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

const StoreMain = ({ navigation }) => {
    const [checkRes, setCheckRes] = useState();
    const [listPro, setListPro] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        GetUser();
        GetPro();
    }, []);

    const GetUser = async () => {
        let userId = await AsyncStorage.getItem('USERID', userId);
        firestore()
            .collection('Shop')
            .doc(userId)
            .get()
            .then((dt) => {
                setCheckRes(dt._data.checkRes);
            });
    };

    const GetPro = async () => {
        try {
            let userId = await AsyncStorage.getItem('USERID', userId);
            const products = await firestore()
                .collection('Products')
                .doc(userId)
                .get();

            if (products.exists) {
                setListPro(products._data.post || []);
            }
            setLoading(false);
            setRefreshing(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        GetPro();
    };

    const handleDeleteProduct = async (productId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa sản phẩm này?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        setDeletingId(productId);
                        try {
                            let userId = await AsyncStorage.getItem('USERID');
                            const productDoc = await firestore()
                                .collection('Products')
                                .doc(userId)
                                .get();

                            if (productDoc.exists) {
                                const currentPosts = productDoc.data().post || [];
                                const newPosts = currentPosts.filter(item => item.id !== productId);

                                await firestore()
                                    .collection('Products')
                                    .doc(userId)
                                    .update({ post: newPosts });

                                setListPro(newPosts);
                            }
                        } catch (error) {
                            Alert.alert("Lỗi", "Không thể xóa sản phẩm.");
                        } finally {
                            setDeletingId(null);
                        }
                    }
                }
            ]
        );
    };

    const renderProduct = ({ item }) => {
        return (
            <View style={styles.productContainer}>
                {item.img && item.img.length > 0 && (
                    <Image
                        source={{ uri: item.img[0] }}
                        style={styles.productImage}
                    />
                )}
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.title}</Text>
                    <Text style={styles.productCategory}>{item.category}</Text>
                    <Text style={styles.productDescription} numberOfLines={2}>
                        {item.description}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteProduct(item.id)}
                    disabled={deletingId === item.id}
                >
                    {deletingId === item.id ? (
                        <ActivityIndicator size={20} color="#FE7E00" />
                    ) : (
                        <AntDesign name="delete" size={24} color="#FE7E00" />
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            {checkRes === '1' ? (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                            style={styles.backButton}>
                            <AntDesign name="arrowleft" size={30} color="#FE7E00" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Quản Lý Sản Phẩm</Text>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('SettingStore') }}
                            style={styles.settingsButton}>
                            <Ionicons name='settings' size={30} color='#FE7E00' />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => { navigation.navigate('AddProduct') }}
                        style={styles.addProductButton}>
                        <View style={styles.addProductContent}>
                            <Text style={styles.addProductText}>Thêm sản phẩm mới</Text>
                            <AntDesign name='plus' size={24} color='#FE7E00' />
                        </View>
                    </TouchableOpacity>

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#FE7E00" />
                        </View>
                    ) : (
                        <FlatList
                            data={listPro}
                            renderItem={renderProduct}
                            keyExtractor={(item, index) => item.id || index.toString()}
                            contentContainerStyle={styles.listContent}
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
                                    <Text style={styles.emptyText}>Chưa có sản phẩm nào</Text>
                                </View>
                            }
                        />
                    )}
                </View>
            ) : (
                <>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                            style={styles.backButton}>
                            <AntDesign name="arrowleft" size={30} color="#FE7E00" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Quản Lý</Text>
                    </View>
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>
                            Vui lòng vào phần cài đặt thông tin cá nhân để đăng ký mở chức năng đăng ký
                        </Text>
                    </View>
                </>
            )}
        </>
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
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    settingsButton: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    addProductButton: {
        margin: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    addProductContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        justifyContent: 'space-between',
    },
    addProductText: {
        fontSize: 16,
        color: '#666',
        flex: 1,
    },
    productContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    productInfo: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    productCategory: {
        fontSize: 16,
        color: '#FE7E00',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingBottom: 15,
        paddingTop: 10,
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
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    messageText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        marginLeft: 8,
    },
});

export default StoreMain;

