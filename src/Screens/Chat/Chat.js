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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore, { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import { create } from 'react-test-renderer';
import MapView from 'react-native-maps'


const Chat = ({ route, navigation }) => {
    let idNhan = route.params.item.userId
    let idUser = route.params.userIdd
    // console.log(idNhan, 1);

    const idChat = idNhan < idUser ? idNhan + "-" + idUser : idUser + "-" + idNhan

    useEffect(() => {
        getChat()
    }, [])

    const [messages, setMessages] = useState('');
    const [imageData, setImageData] = useState(null);
    const [chatedUser1, setChatedUser1] = useState([]);
    const [chatedUser2, setChatedUser2] = useState([]);
    const [address, setAddress] = useState()
    const [arrayMess, setArrayMess] = useState()
    let listchat
    const getChat = () => {

        const doit = firestore()
            .collection('Chats')
            .doc(idUser)
            .collection(idChat)
        doit.onSnapshot(dt => {
            const allMess = dt.docs.map(snap => {
                console.log(snap.data(), 1)
                return { ...snap.data(), createAt: new Date() };
            });
            allMess.sort()
            setArrayMess(allMess)
            console.log(arrayMess, 1);
        })

    }

    const newChat = async () => {
        temp = ({
            userId: idUser,
            senderId: idNhan,
            mess: messages,
            createAt: new Date(),
        })

        tempp = ({
            userId: idNhan,
            senderId: idUser,
            messages: messages,
            createAt: new Date(),
        })

        let check = firestore()
            .collection('Chats')
            .doc(idUser)

        let checkk = firestore()
            .collection('Chats')
            .doc(idNhan)

        let check11 = await checkk.get()
        let check1 = await check.get()

        if (check1.exists) {

            let t
            t = check1._data.box

            t = temp

            firestore()
                .collection('Chats')
                .doc(idUser)
                .collection(idChat)
                .add({
                    box: t
                })

            let tt
            tt = check11._data.box
            tt = tempp

            firestore()
                .collection('Chats')
                .doc(idNhan)
                .collection(idChat)
                .add({
                    box: tt
                })

        }
        else {

            let t
            t = temp
            firestore()
                .collection('Chats')
                .doc(idUser)
                .collection(idChat)
                .add({
                    box: t
                })

            let tt
            tt = tempp
            firestore()
                .collection('Chats')
                .doc(idNhan)
                .collection(idChat)
                .add({
                    box: tt
                })
        }
    }

    // console.log(arrayMess, 2)

    return (
        <View style={{
            flex: 1
        }}>
            <View
                style={{
                    backgroundColor: 'skyblue',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 50
                }}
            >
                <AntDesign name='caretleft' size={30} color={'red'}
                />
                <Text
                    style={{
                        fontSize: 20,
                        color: 'black',
                        alignSelf: 'center'
                    }}
                >
                    Tên người dùng
                </Text>
                <View
                    style={{
                        marginRight: '5%'
                    }}
                />
            </View>
            <View style={{
                borderWidth: 1,
                marginTop: 20,
                height: '80%',
            }}>

                <FlatList
                    data={arrayMess}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <View
                                    style={{ borderWidth: 1 }}
                                >
                                    <Text style={{
                                        fontSize: 30
                                    }}>
                                        {item.box.mess}
                                    </Text>
                                </View>
                            </>
                        )
                    }}
                />

            </View>
            <View
                style={{
                    borderWidth: 2,
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        borderWidth: 1,
                        width: 'auto',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Entypo name='image' size={25} />
                    <View
                        style={{ marginHorizontal: 3 }}
                    />
                    <AntDesign name='enviromento' size={25} />
                </View>

                <View
                    style={{
                        borderWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 40
                    }}
                >
                    <TextInput
                        onChangeText={(txt) => {
                            setMessages(txt)
                        }}
                        value={messages}
                        style={{
                            width: 305,
                            height: 40,
                            borderWidth: 1
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            newChat();
                        }}

                    >
                        <Feather name='send' size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Chat