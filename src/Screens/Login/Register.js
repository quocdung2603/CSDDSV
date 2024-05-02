import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native'

import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging'

const Register = ({ navigation }) => {
    useEffect(() => {
        firestore()
            .collection('Users')
            .get()
            .then(data => {
                setListAccount(data._docs);
                // console.log(listAccount);
            })
    }, [])
    //backend
    const [listAccount, setListAccount] = useState();
    // fontend
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState();
    const [hoTen, SetHoTen] = useState();

    const checkAccountCreated = () => {
        checkacc = false
        listAccount.forEach(data => {
            if (data._data.email === email)
                checkacc = true
            console.log(data._data.email);
        });
        if (checkacc === true) // tài khoản đã tồn tại
        {
            console.log("Tai khoan ton tai")
        }
        else if (checkacc === false) {
            console.log("tao thanh cong")
            createAccount();
            navigation.goBack();
        }
        console.log(checkacc)
    }

    const createAccount = () => {
        let id = uuid.v4();
        // console.log(hoTen);
        firestore()
            .collection('Users')
            .doc(id)
            .set({
                name: hoTen,
                email: email,
                password: pass,
                userId: id,
                proFilePic: '',
                address: '',
                numberPhone: '',
                gender: '',
                post: [],
                typeAcc: 1,
                listChat: [],
                block: false,
            })
            .then(() => {
                console.log('User added!');
                // saveLocalData();
                // getToken();
            });
        console.log('1');
    };

    const getToken = async () => {
        const token = await messaging().getToken();
        console.log("token: " + token);
    }

    const saveLocalData = async () => {
        await AsyncStorage.setItem('NAME', hoTen);
        await AsyncStorage.setItem('EMAIL', email);
        await AsyncStorage.setItem('PASSWORD', pass);
    };

    return (
        <View style={{
            backgroundColor: '#1d1d27',
            flex: 1,
        }}>

            <Image
                source={require('../../../Img/tdmu_logo.png')}
                style={{
                    marginTop: 40,
                    marginRight: 34,
                    width: 260,
                    height: 125,
                    resizeMode: 'stretch',
                    alignSelf: 'center',
                    // marginHorizontal:10 cho xung quanh khoản cách là 10px
                }}

            />

            <Text
                style={{
                    alignSelf: 'center',
                    marginTop: 50,
                    fontSize: 20,
                    fontWeight: '800',
                    color: 'red',
                    textAlign: 'center'
                }}>
                ĐĂNG KÝ TÀI KHOẢN
            </Text>
            <TextInput // họ và tên 
                value={hoTen}
                onChangeText={txt => {
                    SetHoTen(txt);
                }}
                placeholder="Họ và tên"
                placeholderTextColor={'grey'}
                style={{
                    width: '84%',
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    paddingLeft: 15,
                    marginTop: 45,
                    color: 'white',
                    backgroundColor: '#2a293b'
                }}
            />

            <TextInput // email
                value={email}
                onChangeText={txt => {
                    setEmail(txt);
                }}
                placeholder="Gmail"
                placeholderTextColor={'grey'}
                keyboardType='email-address'
                style={{
                    width: '84%',
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    paddingLeft: 15,
                    marginTop: 25,
                    color: 'white',
                    backgroundColor: '#2a293b'
                }}
            />
            <TextInput
                value={pass}
                onChangeText={txt => {
                    setPass(txt);
                }}
                placeholder="Mật khẩu"
                placeholderTextColor={'grey'}
                secureTextEntry={true}
                style={{
                    width: '84%',
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    paddingLeft: 15,
                    marginTop: 20,
                    color: 'white',
                    backgroundColor: '#2a293b'
                }}
            />

            <TouchableOpacity
                style={{
                    width: '60%',
                    height: 50,
                    backgroundColor: '#cb2a5c',
                    borderRadius: 40,
                    marginTop: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                onPress={() => {
                    checkAccountCreated();
                }}>
                <Text style={{ fontSize: 20, color: 'white', }}>Đăng ký</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    width: '84%',
                    height: 50,
                    // backgroundColor: 'orange',
                    borderRadius: 10,
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                onPress={() => {
                    navigation.navigate('Login');
                }}>
                <Text style={{ fontSize: 15, color: 'white', }}>
                    Back to Login
                </Text>
            </TouchableOpacity>

        </View>
    )

}
export default Register;