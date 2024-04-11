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
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

const Chat = () => {

    useEffect(() => {

    })
    let idMe = "1"
    let idGuest = "2"
    let idChat = idMe < idGuest ? idMe + "-" + idGuest : idGuest + "-" + idMe
    console.log(idChat)

    const newChat = async () => {

        let check = firestore()
            .collection('Chats')
            .doc(idChat)
        check = check.get()
        if (check.ex) {
            
        }
    }



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
                marginTop: 20
            }}>
                <ScrollView>

                </ScrollView>
            </View>
        </View>
    )
}

export default Chat