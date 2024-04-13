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
        <View style={{ flex: 1, margin:10}}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, color: '#FCBB3C', fontWeight: 'bold' }} >
                    QUẢN LÝ SẢN PHẨM
                </Text>
            </View>
            <View style={{}} >
                <View style={{ marginHorizontal: 40, marginVertical:10, justifyContent: 'center', }} >
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
                                        style={{flex:1, flexDirection:'row', borderWidth:1, borderRadius:10,margin:5}}
                                        onPress={() => { goToPro(item); }} >
                                        <View style={{flex:0.75, flexDirection:'column',marginEnd:'auto', backgroundColor:'yellow'}}>
                                            <Text style={{fontSize: 17, fontWeight:'bold' }}> {item.title} </Text>
                                            <Text style={{fontSize:13}}>{item.userId}</Text> 
                                            <Text style={{fontSize:13}}>{item.idPro}</Text>
                                        </View>
                                        <View style={{flex: 0.25, flexDirection:'column',marginStart:'auto', backgroundColor:'violet'}}>
                                            <Text>Hình ảnh</Text>
                                            <Text>Hình ảnh</Text>
                                            <Text>Hình ảnh</Text>
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
});

export default ManagerPro;