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

import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

const AddPost = ({ navigation }) => {

    useEffect(() => {

    }, [])

    const [textPost, setTextPost] = useState()

    const [imageData, setImageData] = useState(null);
    const [imagePicked, setImagePicked] = useState(false);
    // const [UploadedPicUrl, setUploadedPicUrl] = useState('');
    const [listIma, setListIma] = useState([]);

    const openGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });


        if (result.assets != null || result.didCancel == false) {
            setImagePicked(true);
            if (imageData == null) {
                setImageData(result);
            }
            else if (imageData.assets.length >= 1) {
                imageData.assets.push(result.assets[0]);
            }
        }
    };

    const UpLoadImgProDuct = async () => {

        let temp = []
        imageData.assets.forEach(item => {

            const reference = storage().ref(item.fileName);
            const pathToFile = item.uri;
            reference.putFile(pathToFile);
            storage()
                .ref(item.fileName)
                .getDownloadURL()
                .then(dt => {
                    temp.push(dt);
                    setListIma(temp)
                })

        });
        SetPost(listIma);
    };



    const SetPost = async Img => {
        let userId = await AsyncStorage.getItem('USERID', userId);
        let idPost = uuid.v4();
        let PS = ({
            idPost: idPost,
            userId: userId,
            text: textPost,
            img: Img,
            cmt: [],
            like: [],
            time: new Date(),
            rule: false,
        })
        let t = firestore()
            .collection('Posts')
            .doc(userId)
        let check = await t.get()
        if (check.exists) {
            let temp = []
            temp = check._data.post
            temp.push(PS)
            firestore()
                .collection('Posts')
                .doc(userId)
                .set({
                    post: temp,
                })
        }
        else {
            let temp = []
            temp.push(PS)
            firestore()
                .collection('Posts')
                .doc(userId)
                .set({
                    post: temp,
                })
        }
    }


    return (
        <ScrollView style={{ flex: 1 }}>
            <View
                style={{
                    height: 60,
                    backgroundColor: 'skyblue',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Forum')
                    }}>
                    <Image source={require('../../../Img/left.png')}
                        style={{
                            height: 25,
                            width: 25,
                            marginStart: 10,
                            tintColor: 'white',
                        }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Tạo bài viết</Text>
                <Text
                    style={{
                        marginEnd: 10,
                        fontSize: 18,
                        color: 'blue',
                        fontWeight: 'bold',
                    }}
                    onPress={() => {
                        UpLoadImgProDuct();
                    }}>
                    {' '}
                    Đăng
                </Text>
            </View>
            <View
                style={{
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: 20,
                    borderColor: '#8e8e8e',
                    borderRadius: 10,
                    height: 150,
                    borderWidth: 0.2,
                    flexDirection: 'row',
                }}>

                <Image
                    source={require('../../../Img/image.png')}
                    style={{ width: 50, height: 50, borderRadius: 10, margin: 10 }}
                />

                <TextInput
                    multiline={true}
                    keyboardType='default'
                    onChangeText={txt => {
                        setTextPost(txt)
                    }}
                    placeholder="type Caption here..."
                    placeholderTextColor={'grey'}
                    style={{ width: '70%', color: 'black' }}
                />
            </View>
            <TouchableOpacity
                style={{
                    width: '100%',
                    marginTop: 5,
                    height: 50,
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#8e8e8e',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={() => {

                }}>
                <Image
                    source={require('../../../Img/photo-camera.png')}
                    style={{ width: 24, height: 24, marginLeft: 20, tintColor: '#4599ff', }}
                />
                <Text style={{ marginLeft: 20, color: 'grey' }}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    width: '100%',
                    marginTop: 5,
                    height: 50,
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#8e8e8e',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={() => {
                    openGallery();
                }}>
                <Image
                    source={require('../../../Img/image-gallery.png')}
                    style={{ width: 24, height: 24, marginLeft: 20, tintColor: '#45bd62', }}
                />
                <Text style={{ marginLeft: 20, color: 'grey' }}>Ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    width: '100%',
                    marginTop: 5,
                    height: 50,
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#8e8e8e',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={() => {
                    Alert.alert('', 'Gắn thẻ người khác')
                }}>
                <Image
                    source={require('../../../Img/friend.png')}
                    style={{ width: 24, height: 24, marginLeft: 20, tintColor: '#1877f2', }}
                />
                <Text style={{ marginLeft: 20, color: 'grey' }}>Gắn thẻ người khác</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    width: '100%',
                    marginTop: 5,
                    height: 50,
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#8e8e8e',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={() => {
                    Alert.alert('', 'Thêm cảm xúc/hoạt động')
                }}>
                <Image
                    source={require('../../../Img/happy.png')}
                    style={{ width: 24, height: 24, marginLeft: 20, tintColor: '#f7b928', }}
                />
                <Text style={{ marginLeft: 20, color: 'grey' }}>Cảm xúc/hoạt dộng</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    width: '100%',
                    marginTop: 5,
                    height: 50,
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#8e8e8e',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={() => {
                    Alert.alert('', 'Thêm địa điểm check in')
                }}>
                <Image
                    source={require('../../../Img/check-in.png')}
                    style={{
                        width: 24, height: 24, marginLeft: 20,
                        // tintColor: '#f5533d', 

                    }}
                />
                <Text style={{ marginLeft: 20, color: 'grey' }}>check in</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    width: '100%',
                    marginTop: 5,
                    height: 50,
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#8e8e8e',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={() => {
                    Alert.alert('', 'Phát trực tiếp')
                }}>
                <Image
                    source={require('../../../Img/facebook.png')}
                    style={{
                        width: 24, height: 24, marginLeft: 20,
                        // tintColor: 'black',
                    }}
                />
                <Text style={{ marginLeft: 20, color: 'grey' }}>Video trực tiếp</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    width: '100%',
                    marginTop: 5,
                    height: 50,
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#8e8e8e',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={() => {
                    Alert.alert('', 'Thêm màu nền')
                }}>
                <Image
                    source={require('../../../Img/font-size.png')}
                    style={{ width: 24, height: 24, marginLeft: 20, tintColor: '#43d1be', }}
                />
                <Text style={{ marginLeft: 20, color: 'grey' }}>Màu nền</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    width: '100%',
                    marginTop: 5,
                    height: 50,
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#8e8e8e',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={() => {
                    Alert.alert('', 'Thêm file GIF')
                }}>
                <Image
                    source={require('../../../Img/gif.png')}
                    style={{ width: 24, height: 24, marginLeft: 20, tintColor: 'black', }}
                />
                <Text style={{ marginLeft: 20, color: 'grey' }}>File GIF</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    width: '100%',
                    marginTop: 5,
                    height: 50,
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#8e8e8e',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={() => {
                    Alert.alert('', 'Thêm bài hát')
                }}>
                <Image
                    source={require('../../../Img/music.png')}
                    style={{ width: 24, height: 24, marginLeft: 20, tintColor: 'orange', }}
                />
                <Text style={{ marginLeft: 20, color: 'grey' }}>Nhạc</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};



export default AddPost;