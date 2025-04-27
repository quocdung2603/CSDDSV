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
        // console.log(listPro, "11")
    }

    const goToPro = (item) => {
        navigation.navigate('DetailPro', { item, listPro })
    }

    return (
        <View style={{ flex: 1, margin: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, color: '#FCBB3C', fontWeight: 'bold' }} >
                    QUẢN LÝ SẢN PHẨM
                </Text>
            </View>
            <View style={{}} >
                <View style={{ marginHorizontal: 40, marginVertical: 10, justifyContent: 'center', }} >
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập nội dung"
                        placeholderTextColor="#888"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <ScrollView>
                    {
                        listPro && <FlatList
                            data={listPro}
                            renderItem={({ item, index }) => {
                                return <>
                                    <TouchableOpacity
                                        style={styles.productCard}
                                        onPress={() => { goToPro(item); }} >
                                        <View style={styles.productInfo}>
                                            <Text style={styles.productTitle}>{item.title}</Text>
                                            <View style={styles.productMeta}>
                                                <View style={styles.metaItem}>
                                                    <Ionicons name="person-outline" size={14} color="#666" />
                                                    <Text style={styles.metaText}>{item.userId}</Text>
                                                </View>
                                                <View style={styles.metaItem}>
                                                    <MaterialCommunityIcons name="barcode-scan" size={14} color="#666" />
                                                    <Text style={styles.metaText}>{item.idPro}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.productAction}>
                                            <AntDesign name="right" size={20} color="#666" />
                                        </View>
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
    },
    productCard: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#eee',
    },
    productInfo: {
        flex: 0.85,
        flexDirection: 'column',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    productMeta: {
        flexDirection: 'column',
        gap: 4,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 13,
        color: '#666',
    },
    productAction: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ManagerPro;