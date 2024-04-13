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
        <View style={{ flex: 1 }}>
            <View style={{ margin: 10, alignItems: 'center' }}>
                <Text style={{ color: '#FCBB3C', fontSize: 30, fontWeight: 'bold' }}>
                    ĐĂNG KÝ MỞ CỬA HÀNG
                </Text>
            </View>
            <View style={{flexDirection:'column', margin:10, padding:5, borderWidth:1, borderRadius:10, borderColor:'#fff', backgroundColor:'#fff'}}>
                {listUser && <FlatList
                    data={listUser}
                    renderItem={({ item, index }) => {
                        return (<>
                            <View style={{ flexDirection:'row', alignItems:'center', marginHorizontal:10, marginVertical:5, padding:10, borderWidth:1, borderRadius:10 }}>
                                <Text style={{fontSize:17, fontWeight:'bold', marginEnd:'auto'}}>
                                    {item.name}
                                </Text>
                                <CheckRes user={item}/>
                            </View>
                        </>)
                    }}
                />}
            </View>
        </View>
    )
}
export default ManagerRegis;