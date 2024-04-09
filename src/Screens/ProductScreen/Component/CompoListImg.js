import React, { useContext, useEffect, useState, useRef } from 'react';
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
    Button
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
//  
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

const CompoListImg = () => {
    return (
        <View>
            <View style={{ borderWidth: 1, borderRadius: 10, width: 100, height: 100, marginHorizontal: 5 }}>
                <View style={{ margin: 5, marginStart: 'auto' }}>
                    <AntDesign name="closecircle" size={20} color="red" />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    openGallery();
                }}
                style={{ borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: 100, width: 100, marginHorizontal: 5 }}>
                <AntDesign name='plus' size={60} color='#000' />
            </TouchableOpacity>
        </View>
    )
}

export default CompoListImg;

{
    listIma && listIma.map((item) => {
        <>
            <View style={{ borderWidth: 1, borderRadius: 10, width: 100, height: 100, marginHorizontal: 5 }}>
                <View style={{ margin: 5, marginStart: 'auto' }}>
                    <AntDesign name="closecircle" size={20} color="red" />
                </View>
            </View>
            
        </>
    })
}