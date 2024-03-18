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

const Personal = () => {

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', borderWidth: 1 }}>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto' }}>
                    <AntDesign name="arrowleft" size={30} color="#000" />
                </View>
                <Text style={{ marginEnd: 'auto', position: "relative", fontSize: 20, color: '#000', fontWeight: 'bold' }}>Settings</Text>
            </View>
        </View>
    );
};

export default Personal;