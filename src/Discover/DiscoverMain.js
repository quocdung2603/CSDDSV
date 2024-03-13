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
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DiscoverMain = () => {
    return (
        <View style={{flexDirection:'column', backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                <Text style={{marginEnd:'auto', fontSize:20, color:'red', fontWeight:'bold'}}>ABC</Text>
                <View style={{borderWidth:1, borderRadius:10, padding:5}}>
                    <Ionicons name='cart' size={30} color='#000' />
                </View>
            </View>
            <View style={{flexDirection:'row', margin:10, borderWidth:1, borderRadius:10, padding: 5, alignItems:'center'}}>
                <FontAwesome6 name='magnifying-glass' size={30} color='#000' />
                <TextInput 
                    
                />
            </View>
        </View>
    )
};

export default DiscoverMain;