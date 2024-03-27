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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckRes = (props) => {
    let { user } = props
    const [check, setCheck] = useState();
    useEffect(() => {
        GetCheckRe()
    }, [])
    const GetCheckRe = async () => {

        firestore()
            .collection('Shop')
            .doc(user.userId)
            .get()
            .then(dt => {
                setCheck(dt._data.checkRes);
                console.log(check, "22");
            })
    }

    const SetCheck = async () => { // hàm đổi đăng ký trao đổi
        if (user.checkRes === '1') {
            firestore()
                .collection('Shop')
                .doc(user.userId)
                .update({
                    checkRes: '0'
                })
                .then(() => {
                    GetCheckRe();
                })
        }
        else {
            firestore()
                .collection('Shop')
                .doc(user.userId)
                .update({
                    checkRes: '1'
                })
                .then(() => {
                    GetCheckRe();
                })
        }

    }

    return (
        <View>
            {check === '1' ? (<Entypo name='check' />) : (<Feather name='x' />)}
        </View>
    )
}

export default CheckRes;