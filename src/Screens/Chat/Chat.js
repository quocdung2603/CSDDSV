import React, { useContext, useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import firestore, { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { create } from 'react-test-renderer';
import MapView from 'react-native-maps';
import QueryAvata from './Component/QueryAvata';

let id
const Chat = ({ route, navigation }) => {
    let idNhan = route.params.item.userId
    let idUser = route.params.userIdd
    let idUC = AsyncStorage.getItem('USERID');
    const idChat = idNhan < idUser ? idNhan + "-" + idUser : idUser + "-" + idNhan

    useEffect(() => {
        getChat()
        getName()
    }, [])

    const [messages, setMessages] = useState();
    const [imageData, setImageData] = useState(null);
    const [chatedUser1, setChatedUser1] = useState([]);
    const [chatedUser2, setChatedUser2] = useState([]);
    const [address, setAddress] = useState()
    const [arrayMess, setArrayMess] = useState()
    const [Name, seTName] = useState()

    const getName = async () => {
        let temp
        id = AsyncStorage.getItem('USERID', id);
        let doit = await firestore()
            .collection('Users')
            .doc(idUser)
            .get()
            .then(dt => {
                temp = dt._data.name;
            })
        seTName(temp)
    }

    const getChat = () => {

        const doit = firestore()
            .collection('Chats')
            .doc(idUser)
            .collection(idChat)
        doit.onSnapshot(dt => {
            const allMess = dt.docs.map(snap => {
                // console.log(snap.data(), 1)
                return { ...snap.data(), createAt: new Date() };
            });
            allMess.sort((a, b) => a.createAt - b.createAt);
            setArrayMess(allMess)
            // console.log(arrayMess, 1);
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
        addList()
    }

    const addList = async () => {
        let listChat
        check = false

        let doit = await firestore()
            .collection('Users')
            .where('userId', '==', idUser)
            .where('listChat', 'array-contains', idNhan)
            .get()

        listChat = (doit._docs)
        if (doit._docs.length === 0) {

            let getList = await firestore()
                .collection('Users')
                .doc(idUser)
                .get()
            let tempp = getList._data.listChat
            tempp.push(idNhan)
            await firestore()
                .collection('Users')
                .doc(idUser)
                .update({
                    listChat: tempp
                })
            tempp = null
            let getList1 = await firestore()
                .collection('Users')
                .doc(idNhan)
                .get()
            tempp = getList1._data.listChat
            tempp.push(idUser)
            await firestore()
                .collection('Users')
                .doc(idNhan)
                .update({
                    listChat: tempp
                })
        }
        else {

            console.log(listChat);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'skyblue', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 50 }} >
                <AntDesign name='caretleft' size={30} color={'red'} />
                <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center' }}>{Name}</Text>
                <View style={{ marginRight: '5%' }} />
            </View>
            <View style={{}}>
                <FlatList
                    data={arrayMess}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                {idUC !== idNhan ? (
                                    //ngta nhắn
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10, marginEnd: 'auto', width: 280 }} >
                                        <View style={{ marginStart: 20 }}>
                                            <QueryAvata userId={item.box.userId} size={30} />
                                        </View>
                                        <View style={{ flexDirection: 'column', marginStart:5, borderWidth: 1, borderRadius: 10, padding: 5 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginStart: 5 }}>{Name}</Text>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginStart: 5, marginStart: 10 }}>10:00</Text>
                                            </View>
                                            <Text style={{ fontSize: 17 }}>Sau nhieu ngay khong gap lai, em van ngu lon nhu ngay nao, oi deo hieu sao toi lai quen em</Text>
                                            {/* <Text style={{ fontSize: 18 }}>{item.box.mess}</Text> */}
                                        </View>
                                        
                                    </View>
                                ) : (
                                    //minh nhắn
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10, marginStart: 'auto', width: 280 }} >
                                        <View style={{ flexDirection: 'column', marginEnd: 5, borderWidth: 1, borderRadius: 10, padding: 5 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginStart: 5 }}>{Name}</Text>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginStart: 5, marginStart: 10 }}>10:00</Text>
                                            </View>
                                            <Text style={{ fontSize: 17 }}>Sau nhieu ngay khong gap lai, em van ngu lon nhu ngay nao, oi deo hieu sao toi lai quen em</Text>
                                            {/* <Text style={{ fontSize: 18 }}>{item.box.mess}</Text> */}
                                        </View>
                                        <View style={{ marginEnd: 20 }}>
                                            <QueryAvata userId={item.box.userId} size={30} />
                                        </View>
                                    </View>
                                )}
                            </>
                        );
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginTop: 'auto' }}>
                <Entypo name='image' size={30} style={{ marginEnd: 5 }} />
                <AntDesign name='enviromento' size={30} style={{ marginStart: 5, marginEnd: 5 }} />
                <TextInput 
                    onChangeText={(txt) => { setMessages(txt) }} value={messages} 
                    style={{ marginStart: 5, marginEnd: 5, borderWidth: 0.5, borderRadius: 10, maxHeight: 40, width: 275 }} 
                    placeholder='Nhập tin nhắn'
                />
                <TouchableOpacity onPress={() => { newChat(); }}>
                    <Feather name='send' size={30} style={{ marginStart: 5 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Chat;
