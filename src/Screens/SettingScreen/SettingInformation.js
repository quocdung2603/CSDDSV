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

let tempUserId = ""
const SettingInformation = ({ navigation }) => {

    useEffect(() => {
        temp()
    }, [])

    const temp = async (userId) => {
        tempUserId = await AsyncStorage.getItem('USERID', userId);
        console.log(tempUserId);

    };

    const [usernames, setUsernames] = useState(0)
    const [nameUser, setNameUser] = useState('');

    const [imageData, setImageData] = useState(null);
    const [imagePicked, setImagePicked] = useState(false);
    const [UploadedPicUrl, setUploadedPicUrl] = useState('');

    const openCamera = async () => {
        const result = await launchCamera({ mediaType: 'photo' });

        setImageData(result);
        console.log(result);
    };
    const openGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        console.log("User selected image " + JSON.stringify(result));

        // Check is user select picture yet
        if (result.assets != null || result.didCancel == false) {
            setImagePicked(true);
            setImageData(result);
        }
    };
    const uploadProfilePic = async () => {
        const reference = storage().ref(imageData.assets[0].fileName);
        const pathToFile = imageData.assets[0].uri;
        await reference.putFile(pathToFile);
        const url = await storage()
            .ref(imageData.assets[0].fileName)
            .getDownloadURL();

        // Reset image url when uploaded
        // Fix image auto change to old image before new image was uploaded
        setUploadedPicUrl(url);
        SetAvata(url);
        setImagePicked(false);
    };

    const SetAvata = async url => {

        console.log(tempUserId, ' ' + url);
        firestore()
            .collection('Users')
            .doc(tempUserId)
            .update({
                proFilePic: url,
            })
            .then(() => {
                // console.log('profile updated!');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const UpdateName = async () => {
        firestore()
            .collection('Users')
            .doc(tempUserId)
            .update({
                name: nameUser,
            })
            .then(() => {
                console.log("Doi ten thanh cong")
            })
    }

    const RegisterShop = async () => {  // đăng ký trao đổi hàng
        firestore()
            .collection('Shop')
            .doc(tempUserId)
            .set({
                checkRes: '1',
                userId: tempUserId,
            })
            .then(() => {

            })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto' }}>
                    <AntDesign name="arrowleft" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Cài Đặt Thông Tin Người Dùng</Text>
                <View style={{ marginStart: 'auto' }}>
                </View>
            </View>
            <View style={{ borderWidth: 1, margin: 10, marginTop: 20, }}>
                <View style={{
                    height: 40,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    opacity: 0.3,
                    justifyContent: 'center',
                }} >
                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        color: 'red',
                        paddingStart: 10,
                        fontWeight: 'bold'
                    }}>
                        Thông tin cá nhân
                    </Text>
                </View>
                <View style={{ borderWidth: 1 }}>
                    <TouchableOpacity
                        onPress={() => {
                            // alert('change avatars')
                            if (imagePicked === false) {
                                openGallery();
                            } else {
                                uploadProfilePic();
                            }
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center'
                        }} >
                            <Image source={require('../../../Img/user.png')}
                                style={{
                                    height: 18,
                                    width: 18,
                                    marginStart: 10,
                                }} />
                            <Text style={{
                                color: 'black',
                                fontSize: 15,
                                paddingStart: 5,
                            }}>
                                {imagePicked === true ? 'Lưu thay đổi' : 'Ảnh đại diện'}
                            </Text>
                            <View style={{ flex: 1 }} ></View>
                            <Image source={require('../../../Img/exchange.png')}
                                style={{
                                    height: 17,
                                    width: 17,
                                    marginEnd: 10,
                                    tintColor: 'black',
                                }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 1 }}>
                    <TouchableOpacity onPress={() => {
                        usernames == 0 ? setUsernames(1) : setUsernames(0)
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center'
                        }} >
                            <Image source={require('../../../Img/id-card.png')}
                                style={{
                                    height: 20,
                                    width: 20,
                                    marginStart: 10,
                                    tintColor: '#eb660d',
                                }} />
                            <Text style={{
                                color: 'black',
                                fontSize: 15,
                                paddingStart: 5,
                            }}>Tên người dùng</Text>
                            <View style={{ flex: 1 }} ></View>
                            <Image source={require('../../../Img/exchange.png')}
                                style={{
                                    height: 17,
                                    width: 17,
                                    marginEnd: 10,
                                    tintColor: 'black',
                                }} />
                        </View>
                    </TouchableOpacity>
                    {usernames == 1 ? (
                        <View style={{
                            // backgroundColor: 'skyblue',
                            flexDirection: 'row',
                            // flex: 1,
                        }}>
                            <TextInput
                                style={{
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    marginStart: 30,
                                    // marginEnd: 30,
                                    height: 37,
                                    width: 250,
                                    color: 'black',
                                    borderRadius: 10
                                }}
                                value={nameUser}
                                onChangeText={txt => {
                                    setNameUser(txt);
                                }}
                                autoFocus
                                placeholder='Nhập tên mới'
                                placeholderTextColor={'grey'}
                            />
                            <View style={{
                                // backgroundColor: 'skyblue',
                                flex: 1,
                                // marginEnd: 5,
                                marginBottom: 5
                            }}>
                                <TouchableOpacity onPress={() => {
                                    if (nameUser != '') {
                                        setUsernames(0);
                                        UpdateName();
                                    }
                                    else {
                                        Alert.alert('', 'Username không được để trống!');
                                        setUsernames(0);
                                    }
                                }}>
                                    <View style={{
                                        alignSelf: 'flex-end',
                                        borderWidth: 0.2,
                                        borderRadius: 5,
                                        backgroundColor: 'skyblue',
                                        // marginTop: 10,
                                        marginEnd: 30,
                                        height: 35,

                                    }}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: 15,
                                            padding: 5,
                                            fontWeight: 'bold',

                                        }}> Lưu </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : ""}
                </View>
                <View style={{
                    height: 40,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    opacity: 0.3,
                    justifyContent: 'center',
                }} >
                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        color: 'red',
                        paddingStart: 10,
                        fontWeight: 'bold'
                    }}>
                        Thông tin trang trao đổi
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        RegisterShop();
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                        alignItems: 'center'
                    }} >
                        <FontAwesome5 name='cash-register' size={18} style={{ marginStart: 10 }} />
                        <Text style={{
                            color: 'black',
                            fontSize: 15,
                            paddingStart: 5,
                        }}>
                            Đăng ký thông tin trao đổi
                        </Text>
                        <View style={{ flex: 1 }} ></View>
                        <Image source={require('../../../Img/exchange.png')}
                            style={{
                                height: 17,
                                width: 17,
                                marginEnd: 10,
                                tintColor: 'black',
                            }} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default SettingInformation;