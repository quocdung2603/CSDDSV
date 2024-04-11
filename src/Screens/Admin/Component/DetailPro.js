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

const DetailPro = ({ route, navigation }) => {
    let item = route.params.item
    let listPro = route.params.listPro

    useEffect(() => {

    })
    // console.log(listPro, item.userId, 1)
    const randomIma = item.img[Math.floor(Math.random() * item.img.length)]
    // console.log(randomIma)
    const handleCancel = async () => {

        let gettt
        const gett = await firestore()
            .collection('Products')
            .doc(item.userId)
            .get()
            .then(dt => {
                console.log(dt._data.post)
                gettt = dt._data.post
            })
        let listFinal = gettt.filter(dt => dt.idPro !== item.idPro)


        const upp = await firestore()
            .collection('Products')
            .doc(item.userId);
        upp.update({
            post: listFinal,
        })

    }

    const handleAcp = async () => {
        let gettt
        const gett = await firestore()
            .collection('Products')
            .doc(item.userId)
            .get()
            .then(dt => {
                // console.log(dt._data.post)
                gettt = dt._data.post
            })
        gettt.map(dt => {
            if (item.idPro === dt.idPro) {
                dt.rule = !dt.rule
            }
        })
        console.log(gettt, 12);

        const upp = await firestore()
            .collection('Products')
            .doc(item.userId);
        upp.update({
            post: gettt,
        })
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'column', borderWidth: 1 }}>
                <ImageBackground
                    source={{ uri: randomIma }}
                    style={{
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto', margin: 10, marginBottom: 'auto' }}>
                            <AntDesign name="arrowleft" size={30} color="#000" />
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 300, marginBottom: 10 }}>
                    </View>
                </ImageBackground>
            </View>
            <ScrollView>
                <View style={{ flexDirection: 'row', margin: 10, padding: 10, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
                            Tên sản phẩm: {item.title}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>$100</Text>
                </View>
                <View style={{ margin: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                <View style={{ flexDirection: 'column', margin: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>Description</Text>
                    <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                        <Text style={{ fontSize: 15, color: 'grey' }}>
                            {item.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 5
            }}>
                <TouchableOpacity
                    onPress={() => {
                        handleCancel()
                    }}
                    style={{ marginTop: 'auto', borderWidth: 1, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', padding: 10 }}>Từ chối</Text>
                </TouchableOpacity>
                <View style={{
                    marginHorizontal: 10,
                }}>

                </View>
                <TouchableOpacity
                    onPress={() => {
                        handleAcp()
                    }}
                    style={{ marginTop: 'auto', borderWidth: 1, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', padding: 10 }}>Đổi lựa chọn</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default DetailPro;