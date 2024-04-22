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
    ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
const IndexChat = ({ navigation }) => {

    useEffect(() => {
        getAllChats();
    }, [])

    const [listChat, setListChat] = useState()

    const getAllChats = async () => {
        var listUser = []
        let userId = await AsyncStorage.getItem('USERID')
        const t = await firestore()
            .collection('Users')
            .doc(userId)
            .get()

        t._data.listChat.map(item => {
            m = userId < item ? userId + "-" + item : item + "-" + userId
            listUser.push(m);
        })
        setListChat(listUser);
        // const tt = await firestore()
        //     .collection('Chats')
        //     .doc(userId)
        //     .collection()
        //     .get()
        //     .then(dt => {
        //         console.log(dt, 123)
        //     })
        // console(tt, 456)
    };

    const showComponent = async () => {

    }

    // console.log(listChat, 123);

    // biến, const
    const [SC, setSC] = useState(0);
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ marginEnd: 'auto', marginStart: 10 }} >
                    <AntDesign name='caretleft' size={30} color={'#FCBB3C'} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FCCC6F' }}>BOX CHAT</Text>
                <View style={{ marginStart: 'auto', marginEnd: 10 }}></View>
            </View>
            <View style={{}}>

                {/* <FlatList
                    data={listChat}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 5, padding: 10, borderWidth: 1, borderRadius: 10 }}>
                                    <View style={{ width: 40, height: 40, backgroundColor: 10, borderRadius: 20, backgroundColor: 'yellow' }}></View>
                                    <View style={{ flexDirection: 'column', marginStart: 10 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Nguyễn Quốc Dũng</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>10:43 PM</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => { SC === 0 ? setSC(1) : setSC(0) }}
                                        style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginStart: 'auto' }}>
                                        <Entypo name='dots-three-horizontal' size={20} color='#000' />
                                    </TouchableOpacity>
                                </View>
                                {SC === 1 ? (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, marginHorizontal: 20 }}>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, padding: 2, borderWidth: 1, borderRadius: 10, borderColor: '#FCCC6F', backgroundColor: '#FCCC6F' }}>
                                            <Entypo name='lock' size={25} color='#000' />
                                            <Text style={{ color: '#000', fontWeight: 'bold' }}>Khóa tin nhắn</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, padding: 2, borderWidth: 1, borderRadius: 10, borderColor: '#FCCC6F', backgroundColor: '#FCCC6F' }}>
                                            <Entypo name='lock' size={25} color='#000' />
                                            <Text style={{ color: '#000', fontWeight: 'bold' }}>Xóa tin nhắn</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : ""}
                            </>
                        )
                    }}
                /> */}

            </View>
        </View>
    )
}
export default IndexChat;