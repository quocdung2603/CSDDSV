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
import QueryUser from './component/QueryUser'


const Forum = ({ navigation }) => {
    useEffect(() => {
        GetPost()
    }, [])

    const [list, setList] = useState()

    const GetPost = async () => {
        firestore()
            .collection('Posts')
            .onSnapshot(dt => {
                // setList(dt._docs)
                getList(dt.docs)
            })
    }

    const getList = (data) => {
        let goooo = []
        console.log(data,123)
        data.map(item => {
            let i = item._data;
            // i.map(ii => {
                goooo.push(i)
            // })
        })
        setList(goooo);
        console.log(goooo, 1)
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
            <Text style={{ margin: 10, textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#000' }}>Diễn Đàn Tìm Kiếm</Text>
            <TouchableOpacity style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}
                onPress={() => {
                    navigation.navigate('AddPost')
                }}
            >
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, alignItems: 'center', marginEnd: 'auto', flex: 0.9 }}>
                    <Text style={{ fontSize: 18 }}>Bạn cần đăng bài tìm sản phẩm gì ?</Text>
                </View>
                <View style={{ marginStart: 'auto', flex: 0.1, marginStart: 10 }}>
                    <AntDesign name='picture' size={37} color='#000' />
                </View>
            </TouchableOpacity>
            <ScrollView style={{ margin: 10 }}>
                <FlatList
                    data={list}
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
                                        <TouchableOpacity onPress={() => { navigation.navigate('ListComment') }} >
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
    )
}
export default Forum;