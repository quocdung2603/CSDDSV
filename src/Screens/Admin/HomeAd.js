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
const HomeAd = ({ navigation }) => {

    useEffect(() => {
        GetUser()
    }, [])



    const GetUser = async (userId) => {
        userId = await AsyncStorage.getItem('USERID', userId);

        console.log(userId);

    };


    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: 'auto', marginTop: 10 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>
                    Chào mừng Admin
                </Text>
            </View>
            <View style={{ borderWidth: 1, marginTop: 20, marginHorizontal: 10 }}>
                <TouchableOpacity style={{ borderWidth: 1, marginHorizontal: 10, marginVertical: 5, height: 30, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', fontSize: 15 }}>
                            Quản lý người dùng
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth: 1, marginHorizontal: 10, marginVertical: 5, height: 30, justifyContent: 'center' }}
                    onPress={() => {
                        navigation.navigate('ManagerRegis')
                    }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', fontSize: 15 }}>
                            Quản lý đăng ký trao đổi
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}
export default HomeAd;