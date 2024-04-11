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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import DetailPro from './Component/DetailPro';
let listProo = []
const ManagerPro = ({ navigation }) => {

    useEffect(() => {
        listProo = []
        getListPro()
        setListPro(listPro, [])
    }, [])

    const [listPro, setListPro] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const getListPro = async () => {
        let tempList
        setListPro(null)
        let gett = await
            firestore()
                .collection('Products')
                .get().then((dt) => {
                    tempList = dt._docs
                })
        step = 0
        let setList = await tempList.map(item => {
            item._data.post.map(i => {
                listProo.push(i);
            })
        })
        setListPro(listProo)
        console.log(listPro, "11")
    }

    const goToPro = (item) => {
        navigation.navigate('DetailPro', { item, listPro })
    }

    return (
        <View style={{
            flex: 1
        }}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        color: 'black',
                        fontWeight: '600'
                    }}
                >
                    Quản lý sản phẩm
                </Text>
            </View>
            <View
                style={{
                    borderWidth: 1,
                    marginTop: 30
                }}
            >
                <View
                    style={{
                        marginHorizontal: 40,
                        justifyContent: 'center',

                    }}
                >
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập nội dung"
                        placeholderTextColor="#888"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        underlineColorAndroid="transparent"
                    />
                </View>

                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 14,
                        }}
                    >
                        Danh sách sản phẩm
                    </Text>
                </View>
                <ScrollView
                    style={{
                        marginTop: 10,
                        borderWidth: 1
                    }}
                >
                    {
                        listPro && <FlatList
                            data={listPro}
                            renderItem={({ item, index }) => {
                                return <>
                                    <TouchableOpacity
                                        onPress={() => {
                                            goToPro(item);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18
                                            }}
                                        >
                                            Tên sản phẩm: {item.title}
                                        </Text>
                                        <Text>
                                            userId: {item.userId}
                                        </Text>
                                        <Text>
                                            {item.idPro}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            }}
                        />
                    }
                </ScrollView>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default ManagerPro;