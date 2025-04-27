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

import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
let thatsme = ''
const QueryUser = (props) => {

    const userId = props.user
    let time = props.time
    useEffect(() => {
        getUser()
    })

    const [Name, setName] = useState()
    const [Avata, setAvata] = useState()

    const coverTime = time => {
        let date = time.toDate();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let yyyy = date.getFullYear();
        let munis = date.getMinutes();// phút
        let hh = date.getHours(); // giờ
        if (dd < '10')
            dd = '0' + dd;
        if (mm < '10')
            mm = '0' + mm;
        if (hh < '10')
            hh = '0' + hh;
        if (munis < '10')
            munis = '0' + munis;
        date = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + munis;
        return date;
    }

    const getUser = async () => {

        thatsme = await AsyncStorage.getItem('USERID')

        firestore()
            .collection('Users')
            .doc(props.user)
            .get()
            .then(dt => {
                // console.log(dt._data, 1)
                setName(dt._data.name)
                setAvata(dt._data.proFilePic);
            })
        // console.log(Name, Avata, 1)
        console.log(thatsme)
    }

    return (
        <View style={{ flexDirection: 'column', margin: 10, borderColor: 'grey', padding: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    Avata !== null ? <Avatar.Image size={50} source={{ uri: Avata }} /> : <Avatar.Image size={50} source={require('../../../../Img/Dong_Doan.jpg')} />
                }
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginStart: 10 }}>{Name}</Text>
                    <Text style={{ marginStart: 10 }}>{coverTime(time)}</Text>
                </View>
            </View>
        </View>
    )

}

export default QueryUser;