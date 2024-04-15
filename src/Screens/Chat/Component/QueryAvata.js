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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-paper';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore, { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

const QueryAvata = (props) => {
    useEffect(() => {
        getAvata()
    })
    // console.log(props)
    const [Avata, setAvata] = useState()
    const getAvata = async () => {
        let temp
        let doIt = await firestore()
            .collection("Users")
            .doc(props.userId)
            .get()
            .then(dt => {
                temp = (dt._data.proFilePic)
            })
        setAvata(temp)
    }

    return (
        <View>
            <Avatar.Image size={25} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/csddsv-815bd.appspot.com/o/1000000034.jpg?alt=media&token=e8e2e64b-43c2-43fb-921d-dc004e310818' }} />
        </View>
    )
}
export default QueryAvata;