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

const ShowCate = ({ route, navigation }) => {
    let { cate } = route.params
    // console.log(cate)

    useEffect(() => {
        getPro()
    }, [])

    const [listPro, setListPro] = useState(null)

    list = []
    const getPro = async () => {

        let gett = await firestore()
            .collection('Products')
            .get()

        list = []
        let i = await gett._docs.map(dt => {
            dt._data.post.map(i => {
                if (i.rule == false) {
                    list.push(i)
                }
            })
        })
        let listCate = list.filter((item) => item.category === cate)
        setListPro(listCate);
    }

    return (
        <View style={{
            flex: 1
        }}>
            <View
                style={{
                    borderWidth: 1,
                    marginTop: 100,
                    height: '80%',
                    marginHorizontal: 20
                    // marginBottom: 50,
                }}
            >
                <ScrollView>
                    {
                        listPro && <FlatList
                            data={listPro}
                            renderItem={({ item, index }) => {
                                return (
                                    <>
                                        <TouchableOpacity
                                            style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderRadius: 10, margin: 5 }}
                                            onPress={() => { navigation.navigate('DetailProduct', item) }} >
                                            <View style={{ flex: 0.75, flexDirection: 'column', marginEnd: 'auto', backgroundColor: 'yellow' }}>
                                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {item.title} </Text>
                                                <Text style={{ fontSize: 13 }}>{item.userId}</Text>
                                                <Text style={{ fontSize: 13 }}>{item.idPro}</Text>
                                            </View>
                                            <View style={{ flex: 0.25, flexDirection: 'column', marginStart: 'auto', backgroundColor: 'violet' }}>
                                                <Text>Hình ảnh</Text>
                                                <Text>Hình ảnh</Text>
                                                <Text>Hình ảnh</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                )
                            }}
                        />
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default ShowCate;