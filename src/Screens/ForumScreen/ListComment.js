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
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import Comment from './component/Comment';
import RepComment from './component/RepComment';
import QueryAvata from '../Chat/Component/QueryAvata';
import QueryName from '../Chat/Component/QueryName';
let userId = ''
const ListComment = ({ route, navigation }) => {
    let { idPost, cmt } = route.params.item
    console.log(idPost, cmt)
    const [text, setText] = useState('')

    useEffect(() => {

    }, [])

    // const getId = async () => {

    // }
    const upCmt = async () => {
        userId = await AsyncStorage.getItem('USERID');
        cmt.push({
            userId: userId,
            text: text,
            createAt: new Date(),
        })
        console.log(cmt, 123)
        setText('')
        await firestore()
            .collection('Posts')
            .doc(idPost)
            .update({
                cmt: cmt,
            })

    }
    console.log(cmt)
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                <AntDesign name='caretleft' size={30} color='#000' />
            </View>
            {/*  */}
            <FlatList
                data={cmt}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            <View style={{ flexDirection: 'column', marginHorizontal: 10, marginVertical: 5 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <QueryAvata userId={item.userId} size={40} />
                                    <View style={{ flexDirection: 'column', marginStart: 10 }}>
                                        {/* <Text style={{ fontSize: 18, fontWeight: 'bold', marginStart: 10 }}>Nguyễn Quốc Dũng</Text> */}
                                        <QueryName userId={item.userId} />

                                        <Text style={{ marginStart: 10 }}>15/4/2024 12:05 AM</Text>
                                    </View>
                                </View>
                                <View style={{ marginHorizontal: 10, padding: 5 }}>
                                    <Text style={{ fontSize: 16, textAlign: 'justify' }}>
                                        {item.text}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                    <TouchableOpacity
                                        onPress={() => { }}
                                        style={{ marginEnd: 'auto', marginStart: 100 }} >
                                        <AntDesign name='like2' size={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { }}
                                        style={{ marginEnd: 100, marginStart: 'auto' }}>
                                        <Entypo name='chat' size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    )
                }}
            />
            {/*  */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginTop: 'auto' }}>
                <View
                    style={{ borderWidth: 0.5, borderRadius: 10, width: 300, maxHeight: 50, marginEnd: 'auto' }}>
                    <TextInput
                        keyboardType='default'
                        placeholder='Nhập bình luận của bạn'
                        value={text}
                        onChangeText={(txt) => {
                            setText(txt)
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        upCmt()
                    }}
                    style={{ marginStart: 'auto', borderWidth: 0.5, borderRadius: 10, padding: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default ListComment;