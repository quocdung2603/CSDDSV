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

const IndexChat = ({ navigation }) => {

    useEffect(() => {
        getChat()
    }, [])

    const [listChat, setListChat] = useState()

    const getChat = async () => {
        temp = null
        let doit = await firestore()
            .collection('Chats')
            .doc('1-2')
            .get()
            .then(dt => {
                // console.log(dt, 1)
                temp = dt
                setListChat(temp)
            })
        console.log(listChat)
    }

    return (
        <View style={{flex: 1, flexDirection:'column'}}>
            <View style={{flexDirection: 'row',alignItems: 'center', marginVertical:10}}>
                <AntDesign name='caretleft' size={30} color={'#FCBB3C'} style={{marginEnd:'auto', marginStart:10}}/>
            </View>
            {/* <View style={{borderWidth:1}}>
                <ScrollView>
                    <FlatList
                        data={listChat}
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    
                                </>
                            )
                        }}
                    />
                </ScrollView>
            </View> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 5, padding: 10, borderWidth: 1, borderRadius: 10 }}>
                <View style={{ width: 40, height: 40, backgroundColor: 10, borderRadius: 20, backgroundColor: 'yellow' }}></View>
                <View style={{flexDirection:'column', marginStart:10}}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold'}}>Nguyễn Quốc Dũng</Text>
                    <Text style={{ fontSize: 13, fontWeight: 'bold'}}>10:43 PM</Text>
                </View>
                <TouchableOpacity
                    onPress={() => { Alert.alert("Xem chi tiết người dùng") }}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginStart: 'auto', marginEnd: 10 }}>
                    <Ionicons name='eye' size={20} color='#000' />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { Alert.alert("Khóa tài khoản người dùng") }}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
                    <Octicons name='blocked' size={20} color='#000' />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default IndexChat;