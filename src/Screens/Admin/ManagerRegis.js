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
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckRes from './Component/CheckRes';
import { fonts } from 'react-native-elements/dist/config';
let listU = []
const ManagerRegis = ({ navigation }) => {

    useEffect(() => {
        GetManagerShop();
    }, [])


    const [listUser, setListUser] = useState([]);

    const GetManagerShop = async () => {
        firestore()
            .collection('Shop')
            .get()
            .then(item => {
                listU = [];
                const list = item._docs.map(ele => {
                    // console.log(ele._data.userId);
                    return firestore()
                        .collection('Users')
                        .doc(ele._data.userId)
                        .get()
                    // .doc(`Users/${ele._data.userId}`).get()
                });
                Promise.all(list).then(dt => {
                    setListUser(dt.map(userData => userData._data))
                })
                // console.log(listUser);
                //
            })
    }

    const AcpOpenShop = async userId => {
        firestore()
            .collection('Products')
            .doc(userId)
            .set({
                listPro: [],
            })
            .then(() => {
                // console.log('profile updated!');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    ĐĂNG KÝ MỞ CỬA HÀNG
                </Text>
            </View>
            <View style={styles.container}>
                {listUser && <FlatList
                    data={listUser}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.userCard}>
                                <View style={styles.userInfo}>
                                    <Image
                                        source={item.avatar ? { uri: item.avatar } : { uri: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' }}
                                        style={styles.avatar}
                                    />
                                    <View style={styles.userDetails}>
                                        <Text style={styles.userName}>{item.name}</Text>
                                        <Text style={styles.userEmail}>{item.email}</Text>
                                    </View>
                                </View>
                                <CheckRes user={item} />
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerText: {
        color: '#FCBB3C',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        padding: 15,
    },
    userCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
});

export default ManagerRegis;