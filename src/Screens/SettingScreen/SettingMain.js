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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore, { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingMain = ({ navigation }) => {

    useEffect(() => {
        loadUser()
    }, [])

    const [data, setData] = useState();
    const [ava, setAva] = useState('');
    const loadUser = async () => {
        let userId = await AsyncStorage.getItem('USERID', userId);
        // console.log(userId)
        firestore()
            .collection('Users')
            .doc(userId)
            .get()
            .then(temp => {
                setData(temp._data);
                setAva(temp._data.proFilePic)
                console.log(data);
            })
    }


    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto' }}>
                    <AntDesign name="arrowleft" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>
                    Cài Đặt
                </Text>
                <View style={{ marginStart: 'auto' }}>
                </View>
            </View>
            <View style={{ flexDirection: 'column', margin: 40 }}>
                {ava === '' ? (
                    <Image
                        style={{ height: 150, width: 150, borderRadius: 75, justifyContent: 'center', alignSelf: 'center' }}
                        source={require('../../../Img/user.png')} />) :
                    (
                        <Image
                            style={{ height: 150, width: 150, borderRadius: 75, justifyContent: 'center', alignSelf: 'center' }}
                            source={{ uri: ava }} />
                    )}
            </View>
            <View style={{ flexDirection: 'column', margin: 10 }}>
                {/* thong tin ca nhan */}
                <TouchableOpacity
                    onPress={() => { navigation.navigate('SettingInformation') }}
                    style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
                    <View style={{ borderWidth: 1, borderRadius: 50, marginEnd: 10 }}>
                        <AntDesign name="user" size={27} color='#000' />
                    </View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Thông Tin Cá Nhân</Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.2, margin: 10 }} />
                {/* tài khoản */}
                <TouchableOpacity
                    onPress={() => { loadUser() }}
                    style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
                    <View style={{ borderWidth: 1, borderRadius: 50, marginEnd: 10 }}>
                        <MaterialIcons name="manage-accounts" size={27} color='#000' />
                    </View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Tài Khoản</Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.2, margin: 10 }} />
                {/* bảo mật */}
                <TouchableOpacity
                    onPress={() => { }}
                    style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
                    <View style={{ borderWidth: 1, borderRadius: 50, marginEnd: 10 }}>
                        <AntDesign name="Safety" size={27} color='#000' />
                    </View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Bảo Mật</Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.2, margin: 10 }} />
                {/* dang xuat */}
                <TouchableOpacity
                    onPress={() => { }}
                    style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
                    <View style={{ borderWidth: 1, borderRadius: 50, marginEnd: 10 }}>
                        <Entypo name="log-out" size={25} color='#000' />
                    </View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Đăng Xuất</Text>
                </TouchableOpacity>
                {/* <View style={{borderWidth:0.2, margin:10}}/> */}
            </View>
        </View>
    )
}
export default SettingMain;