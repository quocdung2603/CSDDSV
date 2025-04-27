import React, { useContext, useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
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
import QueryName from './Component/QueryName';
let id
const Chat = ({ route, navigation }) => {
    let idNhan = route.params.item.userId
    let idUser = route.params.userIdd
    const [idUC, setIdUC] = useState(null);
    const idChat = idNhan < idUser ? idNhan + "-" + idUser : idUser + "-" + idNhan

    const [messages, setMessages] = useState();
    const [imageData, setImageData] = useState(null);
    const [chatedUser1, setChatedUser1] = useState([]);
    const [chatedUser2, setChatedUser2] = useState([]);
    const [address, setAddress] = useState()
    const [arrayMess, setArrayMess] = useState()
    const [Name, seTName] = useState()
    const [ReceiverName, setReceiverName] = useState();

    useEffect(() => {
        (async () => {
            const userId = await AsyncStorage.getItem('USERID');
            setIdUC(userId);
        })();
        getChat()
        getName()
        getReceiverName()
    }, [])

    const getName = async () => {
        let temp
        id = await AsyncStorage.getItem('USERID');
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
            let allMess = dt.docs.map(snap => {
                // console.log(snap.data(), 1)
                return { ...snap.data(), createAt: new Date() };
            });
            allMess.sort((a, b) => a.box.createAt - b.box.createAt);
            setArrayMess(allMess)
            console.log(arrayMess, 1);
        })

    }

    const getReceiverName = async () => {
        let temp = '';
        await firestore()
            .collection('Users')
            .doc(idNhan)
            .get()
            .then(dt => {
                temp = dt._data.name;
            })
        setReceiverName(temp);
    }

    const newChat = async () => {
        temp = ({
            senderId: idUser,
            mess: messages,
            createAt: new Date(),
        })

        tempp = ({
            senderId: idUser,
            mess: messages,
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
    const coverTime = time => {
        let date = time.toDate();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let yyyy = date.getFullYear();
        let munis = date.getMinutes();// phút
        let hh = date.getHours(); // giờ
        if (dd < '10')
            dd = '0' + dd;
        if (mm < '10')
            mm = '0' + mm;
        if (hh < '10')
            hh = '0' + hh;
        if (munis < '10')
            munis = '0' + munis;
        date = hh + ':' + munis + ' ' + dd + '/' + mm;
        return date;
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <AntDesign name='arrowleft' size={24} color={'#fff'} />
                    </TouchableOpacity>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerName}>{ReceiverName}</Text>
                    </View>
                    <View style={styles.headerRight} />

                </View>

                <FlatList
                    data={arrayMess}
                    style={styles.chatList}
                    contentContainerStyle={styles.chatListContent}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={[
                                styles.messageContainer,
                                idUser === item.box.senderId ? styles.sentMessage : styles.receivedMessage
                            ]}>
                                {idUser !== item.box.senderId && (
                                    <View style={styles.avatarContainer}>
                                        <QueryAvata userId={item.box.senderId} size={35} />
                                    </View>
                                )}
                                <View style={[
                                    styles.messageBubble,
                                    idUser === item.box.senderId ? styles.sentBubble : styles.receivedBubble
                                ]}>
                                    <View style={styles.messageHeader}>
                                        <QueryName userId={item.box.senderId} style={styles.senderName} />
                                        <Text style={styles.messageTime}>{coverTime(item.box.createAt)}</Text>
                                    </View>
                                    <Text style={styles.messageText}>{item.box.mess}</Text>
                                </View>
                                {idUser === item.box.senderId && (
                                    <View style={styles.avatarContainer}>
                                        <QueryAvata userId={idUser} size={35} />
                                    </View>
                                )}
                            </View>
                        );
                    }}
                />

                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.inputButton}>
                        <Entypo name='image' size={24} color="#666" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.inputButton}
                        onPress={() => navigation.navigate('Mapp')}
                    >
                        <AntDesign name='enviromento' size={24} color="#666" />
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={(txt) => { setMessages(txt) }}
                        value={messages}
                        style={styles.input}
                        placeholder='Nhập tin nhắn'
                        placeholderTextColor="#999"
                        multiline
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => { newChat(); }}
                    >
                        <Feather name='send' size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#2196F3',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    backButton: {
        padding: 5,
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
    headerRight: {
        width: 40,
    },
    chatList: {
        flex: 1,
    },
    chatListContent: {
        padding: 10,
    },
    messageContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        maxWidth: '80%',
    },
    sentMessage: {
        alignSelf: 'flex-end',
    },
    receivedMessage: {
        alignSelf: 'flex-start',
    },
    avatarContainer: {
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 15,
        maxWidth: '100%',
    },
    sentBubble: {
        backgroundColor: '#2196F3',
        borderTopRightRadius: 5,
    },
    receivedBubble: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
    },
    messageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    senderName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },
    messageTime: {
        fontSize: 12,
        color: '#000',
        marginLeft: 8,
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    inputButton: {
        padding: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 8,
        maxHeight: 100,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: '#2196F3',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Chat;
