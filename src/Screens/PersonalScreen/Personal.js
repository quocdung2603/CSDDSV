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
    FlatList
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
import { Avatar } from 'react-native-paper';
import QueryUser from '../ForumScreen/component/QueryUser'
const Personal = ({ navigation }) => {

    useEffect(() => {
        loadUser()
        getPost()
    }, [])

    const [data, setData] = useState();
    const [ava, setAva] = useState('');
    const [name, setName] = useState('');

    const loadUser = async () => {
        let userId = await AsyncStorage.getItem('USERID', userId);
        console.log(userId)
        await firestore()
            .collection('Users')
            .doc(userId)
            .get()
            .then(temp => {
                setData(temp._data);
                setName(temp._data.name)
                setAva(temp._data.proFilePic)
            })
    }

    const [listPost, setListPost] = useState()
    const getPost = async () => {
        let userId = await AsyncStorage.getItem('USERID', userId);
        let doIt = await firestore()
            .collection('Posts')
            .where('userId', '==', userId)
            .get()
        let temp = []
        doIt._docs.map(item => {
            temp.push(item._data)
        })
        // console.log(temp, 123)
        setListPost(temp)
    }

    const [TabPost, setTabPost] = useState(1);
    const [TabFollower, setTabFollower] = useState(0);
    const [TabFollowing, setTabFollowing] = useState(0);
    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate("StoreMain") }}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto' }}>
                    <Ionicons name="storefront" size={30} color="#FE7E00" />
                </TouchableOpacity>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Profile</Text>
                <TouchableOpacity
                    onPress={() => { navigation.navigate("SettingMain") }}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
                    <Ionicons name='settings' size={30} color='#FE7E00' />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
                {ava === '' ? (
                    <Image
                        style={{ height: 175, width: 175, borderRadius: 75, justifyContent: 'center', alignSelf: 'center' }}
                        source={require('../../../Img/user.png')} />) :
                    (
                        <Image
                            style={{ height: 175, width: 175, borderRadius: 75, justifyContent: 'center', alignSelf: 'center' }}
                            source={{ uri: ava }} />
                    )}
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#000' }}>{name}</Text>
            </View>

            <View style={{ flexDirection: 'row', borderTopColor: 'grey', marginVertical: 10 }}>
                <TouchableOpacity
                    onPress={() => { setTabPost(1); setTabFollower(0); setTabFollowing(0) }}
                    style={{ borderWidth: 1, marginEnd: 'auto', paddingVertical: 10, paddingHorizontal: 3, backgroundColor: TabPost === 1 ? '#FE7E00' : '#fff' }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: TabPost === 1 ? '#fff' : '#000' }}>Các Bài Viết</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setTabPost(0); setTabFollower(1); setTabFollowing(0) }}
                    style={{ borderWidth: 1, paddingVertical: 10, paddingHorizontal: 3, backgroundColor: TabFollower === 1 ? '#FE7E00' : '#fff' }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: TabFollower === 1 ? '#fff' : '#000' }}>Người Theo Dõi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setTabPost(0); setTabFollower(0); setTabFollowing(1) }}
                    style={{ borderWidth: 1, marginStart: 'auto', paddingVertical: 10, paddingHorizontal: 3, backgroundColor: TabFollowing === 1 ? '#FE7E00' : '#fff' }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: TabFollowing === 1 ? '#fff' : '#000' }}>Đang Theo Dõi</Text>
                </TouchableOpacity>
            </View>
            {TabPost === 1 ? (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <ScrollView>
                        <FlatList
                            data={listPost}
                            renderItem={({ item, index }) => {
                                return (
                                    <>
                                        <View style={{ flexDirection: 'column', borderWidth: 0.5, borderRadius: 10, marginVertical: 5 }}>
                                            <QueryUser user={item.userId} time={item.time} />
                                            <View style={{ marginHorizontal: 10, padding: 5 }}>
                                                <Text style={{ fontSize: 20, textAlign: 'justify' }}>
                                                    {item.text}
                                                </Text>
                                            </View>
                                            <View style={{ height: 220, width: 'auto', marginHorizontal: 10 }}>
                                                <Image
                                                    style={{
                                                        borderRadius: 15,
                                                        height: 220,
                                                    }}
                                                    source={{ uri: item.img }}
                                                />
                                            </View>
                                            {/* comment */}
                                            <View
                                                style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                                <TouchableOpacity
                                                    style={{ marginEnd: 'auto', marginStart: 40 }} >
                                                    <AntDesign name='like2' size={25} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { navigation.navigate('ListComment', { item }) }} >
                                                    <Entypo name='chat' size={25} />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{ marginEnd: 40, marginStart: 'auto' }} >
                                                    <Ionicons name='share-social' size={25} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </>
                                )
                            }}

                        />
                    </ScrollView>
                </View>
            ) : ""}
            {TabFollower === 1 ? (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 20, alignItems: 'center' }}>
                            <Avatar.Image size={50} source={require('../../../Img/Dong_Doan.jpg')} />
                            <Text style={{ fontSize: 22, fontWeight: 'bold', marginStart: 10 }}>Đoàn Xuân Đông</Text>
                        </View>
                    </ScrollView>
                </View>
            ) : ""}
            {TabFollowing === 1 ? (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 20, alignItems: 'center' }}>
                            <Avatar.Image size={50} source={require('../../../Img/Dong_Doan.jpg')} />
                            <Text style={{ fontSize: 22, fontWeight: 'bold', marginStart: 10 }}>Đoàn Xuân Đông</Text>
                        </View>
                    </ScrollView>
                </View>
            ) : ""}
        </View>
    )
}

export default Personal;