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
        <View style={{ flex: 1 }}>
            <View style={{ borderWidth: 1, margin: 10, alignItems: 'center' }}>
                <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>
                    Danh sách tài khoản đăng ký trao đổi
                </Text>
            </View>
            <View style={{ marginHorizontal: 10, borderTopWidth: 1 }}>
                {listUser && <FlatList
                    data={listUser}
                    renderItem={({ item, index }) => {
                        return (<>
                            <View style={{ borderWidth: 1, flexDirection: 'row' }}>
                                <View>
                                    <Text>
                                        {item.name}
                                    </Text>
                                </View>
                                <CheckRes user={item} />
                            </View>
                        </>)
                    }}
                />}
            </View>
        </View>
    )
}
export default ManagerRegis;