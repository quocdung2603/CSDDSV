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

    useEffect(() => {
        GetUser();
        GetPro();
    }, [])

    const [checkRes, setCheckRes] = useState();
    const GetUser = async () => {
        let userId = await AsyncStorage.getItem('USERID', userId);
        firestore()
            .collection('Shop')
            .doc(userId)
            .get()
            .then((dt) => {
                // console.log(dt);
                setCheckRes(dt._data.checkRes);
            })
    }

    const [listPro, setListPro] = useState([])
    const [SoLuongPro, setSoLuongPro] = useState()
    const GetPro = async () => {
        let userId = await AsyncStorage.getItem('USERID', userId);
        let doIt = firestore()
            .collection('Products')
            .doc(userId)
            .get()
        setListPro(doIt);
        // console.log(listPro._j._data.posts.length,"111")
        setSoLuongPro(listPro._j._data.posts.length)
    }

    return (
        <>
            {checkRes === '1' ? (<View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }} >
                <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => { navigation.goBack() }}
                        style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto' }}>
                        <AntDesign name="arrowleft" size={30} color="#FE7E00" />
                    </TouchableOpacity>
                    <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Quản Lý</Text>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('SettingStore') }}
                        style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
                        <Ionicons name='settings' size={30} color='#FE7E00' />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <View style={{ flexDirection: 'column', borderWidth: 1, borderRadius: 10, padding: 8, marginEnd: 'auto' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Sản phẩm</Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>{SoLuongPro}</Text>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('ProductManage') }}
                            style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 20, paddingHorizontal: 5 }}>
                            <Text style={{ fontSize: 19, marginEnd: 5 }}>Chi Tiết</Text>
                            <Ionicons name='arrow-forward-circle' size={25} color='#FE7E00' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', borderWidth: 1, borderRadius: 10, padding: 8 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Giao Dịch</Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>10</Text>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('TransactionManage') }}
                            style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 20, paddingHorizontal: 5 }}>
                            <Text style={{ fontSize: 19, marginEnd: 5 }}>Chi Tiết</Text>
                            <Ionicons name='arrow-forward-circle' size={25} color='#FE7E00' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', borderWidth: 1, borderRadius: 10, padding: 8, marginStart: 'auto' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Lợi Nhuận</Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>10000</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 20, paddingHorizontal: 5 }}>
                            <Text style={{ fontSize: 19, marginEnd: 5 }}>Chi Tiết</Text>
                            <Ionicons name='arrow-forward-circle' size={25} color='#FE7E00' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', margin: 10, borderWidth: 1, height: 300 }}>
                    {/* chart */}

                </View>
                <View style={{ marginHorizontal: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('AddProduct') }}
                        style={{ flexDirection: 'column', margin: 10, borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                        <View style={{ borderWidth: 1, borderRadius: 20 }}>
                            <AntDesign name='plus' size={35} color='#FE7E00' />
                        </View>
                        <Text>Thêm sản phẩm</Text>
                    </TouchableOpacity>
                    {/* <View style={{flexDirection:'column', margin:10, borderWidth:1, justifyContent:'center', alignItems:'center', padding:5}}>
                    <FontAwesome6 name='clipboard-list' size={35} color='#000' />
                    <Text>Danh Mục Sản Phẩm</Text>
                </View> */}

                </View>
            </View>) : (
                <>
                    <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                            style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto' }}>
                            <AntDesign name="arrowleft" size={30} color="#FE7E00" />
                        </TouchableOpacity>
                        <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Quản Lý</Text>
                    </View>
                    <View style={{ color: 'black', alignItems: 'center' }}>
                        <Text style={{
                            marginTop: 50, color: 'gray', justifyContent: 'center', alignItems: 'center', textAlign: 'center'
                        }}>
                            Vui lòng vào phần cài đặt thông tin cá nhân để đăng ký mở chức năng đăng ký
                        </Text>
                    </View>
                </>
            )}
        </>
    )
}

export default StoreMain;

