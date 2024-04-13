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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
let userId = ""
const HomeAd = ({ navigation }) => {
    useEffect(() => {
        GetUser()
    }, [])
    const GetUser = async (userId) => {
        userId = await AsyncStorage.getItem('USERID', userId);

        console.log(userId);

    };
    // biến, modal, const
    //  --- tab ---
    const [ND, setND] = useState(0);
    const [TD, setTD] = useState(0);
    const [SP, setSP] = useState(0);
    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: 'auto', marginTop: 10 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FCAC12' }}>
                    CHÀO MỪNG ADMIN
                </Text>
            </View>
            <View style={{flexDirection:'column', borderWidth: 1, margin:10, backgroundColor:'#fff', borderRadius:10, borderColor:10, padding:10 }}>
                <TouchableOpacity 
                    onPress={()=>{ND === 1 ? setND(0) : setND(1)}}    
                    style={{ borderWidth: 1, borderRadius:10, borderColor:'#FCBB3C', backgroundColor:'#FCBB3C', margin:10, padding:10, justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', fontSize: 15, textAlign:'center' }}>
                        QUẢN LÝ NGƯỜI DÙNG
                    </Text>
                </TouchableOpacity>
                {ND === 1 ? (
                    <View style={{ flexDirection: 'column', marginVertical: 10,marginHorizontal:30 }}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate('ManagerUser') }}
                            style={{ borderWidth: 1, borderRadius: 10, borderColor: '#FCCC6F', backgroundColor: '#FCCC6F', margin: 10, padding: 10, justifyContent: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>
                                Tài khoản
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {Alert.alert("Danh sách người dùng bị chặn") }}
                            style={{ borderWidth: 1, borderRadius: 10, borderColor: '#FCCC6F', backgroundColor: '#FCCC6F', margin: 10, padding: 10, justifyContent: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>
                                Danh sách chặn
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : ""}
                <TouchableOpacity 
                    style={{ borderWidth: 1, borderRadius:10, borderColor:'#FCBB3C', backgroundColor:'#FCBB3C', margin:10, padding:10, justifyContent: 'center' }}
                    onPress={() => {TD === 1 ? setTD(0) : setTD(1) }}>
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', fontSize: 15, textAlign:'center' }}>QUẢN LÝ TRAO ĐỔI</Text>
                </TouchableOpacity>
                {TD === 1 ? (
                    <View style={{ flexDirection: 'column', marginVertical: 10,marginHorizontal:30 }}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate('ManagerRegis')}}
                            style={{ borderWidth: 1, borderRadius: 10, borderColor: '#FCCC6F', backgroundColor: '#FCCC6F', margin: 10, padding: 10, justifyContent: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>
                                Đăng ký mở cửa hàng
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {Alert.alert("Danh sách coi dc các hoạt động trao đổi dang diễn ra")}}
                            style={{ borderWidth: 1, borderRadius: 10, borderColor: '#FCCC6F', backgroundColor: '#FCCC6F', margin: 10, padding: 10, justifyContent: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>
                                Danh sách trao đổi
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : ""}
                <TouchableOpacity style={{ borderWidth: 1, borderRadius:10, borderColor:'#FCBB3C', backgroundColor:'#FCBB3C', margin:10, padding:10, justifyContent: 'center' }}
                    onPress={() => {SP === 1 ? setSP(0) : setSP(1)}}>
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', fontSize: 15, textAlign:'center' }}>QUẢN LÝ SẢN PHẨM</Text>
                </TouchableOpacity>
                {SP === 1 ? (
                    <View style={{ flexDirection: 'column', marginVertical: 10,marginHorizontal:30 }}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate('ManagerPro')}}
                            style={{ borderWidth: 1, borderRadius: 10, borderColor: '#FCCC6F', backgroundColor: '#FCCC6F', margin: 10, padding: 10, justifyContent: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>
                                Danh sách sản phẩm
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {Alert.alert("Danh sách sản phẩm bị chặn")}}
                            style={{ borderWidth: 1, borderRadius: 10, borderColor: '#FCCC6F', backgroundColor: '#FCCC6F', margin: 10, padding: 10, justifyContent: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>
                                Danh sách chặn
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : ""}
                <TouchableOpacity 
                    onPress={() => {navigation.navigate('Login')}}
                    style={{ borderWidth: 1, borderRadius:10, borderColor:'#FCBB3C', backgroundColor:'#FCBB3C', margin:10, padding:10, justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', fontSize: 15, textAlign:'center' }}>
                        ĐĂNG XUẤT
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default HomeAd;