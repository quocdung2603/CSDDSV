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
import { Avatar } from 'react-native-paper';

const Profile = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto' }}>
                    <AntDesign name="arrowleft" size={30} color="#000" />
                </View>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>
                    Profile
                </Text>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
                    <Ionicons name='settings' size={30} color='#000' />
                </View>
            </View>
            <View style={{ borderWidth: 1, alignItems: 'center' }}>
                <Avatar.Image size={200} source={require('../../../Img/Dong_Doan.jpg')} />
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#000' }}>
                    Đông Đoàn
                </Text>
                <Text style={{ fontSize: 15, color: '#000' }}>
                    Thích busloonf
                </Text>
            </View>
            <View style={{ borderTopColor: 'grey', marginTop: 10, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: 'grey' }}>
                
            </View>
        </View>
    )
}

export default Profile;