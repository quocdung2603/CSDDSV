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

const OrderSuccess = ({navigation}) => {

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{marginEnd:'auto'}}></View>
                <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold' }}>Đơn Hàng</Text>
                <TouchableOpacity 
                    onPress={() => {navigation.goBack()}}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginStart: 'auto', margin: 10 }}>
                    <Ionicons name='close' size={30} color='#FE7E00' />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'column', margin:50, justifyContent:'center', alignItems:'center'}}>
                <View style={{borderWidth:1, width:350, height:380}}></View>
                <Text style={{fontSize:25, fontWeight:'bold', color:'#000'}}>Giao dịch thành công</Text>
                <Text style={{fontSize:20, textAlign:'center'}}>Yêu cầu giao dịch này đã được gửi đến người đăng.</Text>
                <Text style={{fontSize:20, textAlign:'center'}}>Hãy kiểm tra lại đơn hàng của bạn trong danh sách đơn hàng.</Text>
            </View>
            <View style={{marginTop:'auto', borderWidth:1, backgroundColor:'#FE7E00', justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, fontWeight:'bold',color:'#fff', padding:10}}>Kiểm tra đơn hàng</Text>
            </View>
        </View>
    );
};

export default OrderSuccess;