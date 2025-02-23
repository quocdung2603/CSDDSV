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
    FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
let userId = ""
import uuid from 'react-native-uuid'

const ManagerCategory = ({ navigation }) => {
    const [listCate, setListCate] = useState()
    const [nameCate, setNameCate] = useState("")

    useEffect(() => {
        firestore()
            .collection('Manager')
            .get()
            .then(data => {
                setListCate(data._docs[0]._data.Cate)
                // console.log(data._docs[0]._data.Cate)
            })
    }, [listCate])

    // listCate.forEach(item => {
    //     console.log(item, 1)
    // })
    // useEffect(() => {

    // },[])
    const addCate = async () => {
        let found = false;

        for (let i = 0; i < listCate.length; i++) {
            if (listCate[i] == nameCate) {
                found = true;
                break;
            }
        }

        if (found == false) {
            listCate.push(nameCate)
            firestore()
                .collection('Manager')
                .doc('Cate')
                .set({
                    Cate: listCate,
                })
                .then(() => {
                    console.log('Add cate Sussces');
                });
        }
    }

    function removeStringFromArray(array, stringToRemove) {
        return array.filter(item => item !== stringToRemove);
    }

    const delCate = async (temp) => {
        let tt = removeStringFromArray(listCate, temp)

        await firestore()
            .collection('Manager')
            .doc('Cate')
            .set({
                Cate: tt,
            })
            .then(() => {
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: 'auto', marginTop: 10 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FCAC12' }}>
                    Quản lý danh mục sản phẩm
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'center'
                }}
            >
                <TextInput
                    style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        width: '80%',

                    }}
                    placeholder='Thêm danh mục'
                    onChangeText={(t) => setNameCate(t)}
                />
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                    }}

                    onPress={
                        () => addCate()
                    }
                >
                    <Icon name="plus" size={30} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={{
                // border: 1,
                marginRight: '10%',
                marginLeft: '10%',
                marginTop: '5%',
                borderColor: 'black',
                borderWidth: 1
            }}>
                <ScrollView>
                    {
                        listCate && <FlatList
                            data={listCate}
                            renderItem={({ item, index }) => {
                                return <>
                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: 'black',
                                                fontSize: 20,

                                            }}
                                        >
                                            {item}
                                        </Text>
                                        <TouchableOpacity
                                            style={{
                                                justifyContent: 'center',
                                                marginLeft: 20
                                            }}
                                            onPress={
                                                () => delCate(item)
                                            }
                                        >
                                            <Icon name="minus" size={20} color="#000" />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }}
                        />
                    }
                </ScrollView>
            </View>
        </View >
    )

}

export default ManagerCategory;