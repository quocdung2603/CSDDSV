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
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'


const RepComment = ({ navigation }) => {

    return (
        <View style={{ flexDirection: 'column', marginEnd:10, marginStart:50, marginVertical: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: 'yellow' }}></View>
                <View style={{ flexDirection: 'column', marginStart: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginStart: 10 }}>Nguyễn Quốc Dũng</Text>
                    <Text style={{ marginStart: 10, fontSize:12 }}>15/4/2024 12:05 AM</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 10, padding: 5 }}>
                <Text style={{ fontSize: 14, textAlign: 'justify' }}>
                    Tôi năm nay hơn 20 tuổi đầu rồi nhưng chưa thấy ai tệ như Nguyễn Tấn Tài, Người gì đâu vừa tệ bạc vừa lười biến, nếu mà có cây súng chắc là tôi đấm nó chết mẹ luôn.
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={{ marginEnd: 'auto', marginStart: 100 }} >
                    <AntDesign name='like2' size={18} />
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default RepComment;