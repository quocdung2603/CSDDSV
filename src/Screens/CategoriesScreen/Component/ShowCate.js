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
                                        <TouchableOpacity style={{
                                            borderWidth: 1,
                                            marginVertical: 10,
                                        }}

                                            onPress={() => {
                                                navigation.navigate('DetailProduct', item)
                                            }}
                                        >
                                            <Text>
                                                Tên sản phẩm {item.title}
                                            </Text>
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