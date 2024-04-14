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
import Comment from './component/Comment';
import RepComment from './component/RepComment';

const ListComment = ({navigation}) => {

    return (
        <View style={{flex:1, flexDirection:'column'}}>
            <View style={{flexDirection:'row', alignItems:'center', margin:10}}>
                <AntDesign name='caretleft' size={30} color='#000'/>
            </View>
            {/*  */}
            <Comment />
            <RepComment />
            <Comment />
            <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:10, marginTop:'auto'}}>
                <View
                    style={{borderWidth:0.5, borderRadius:10, width:300, maxHeight:50, marginEnd:'auto'}}>
                    <TextInput
                        keyboardType='default'
                        placeholder='Nhập bình luận của bạn'
                    />
                </View>
                <TouchableOpacity style={{marginStart:'auto', borderWidth:0.5, borderRadius:10, padding:10}}>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default ListComment;