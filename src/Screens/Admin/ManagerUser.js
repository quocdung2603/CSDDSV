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
    FlatList
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManagerUser = () => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <View style={{flex: 1}}>
            <View style={{ justifyContent: 'center', alignItems: 'center', margin:10 }}>
                <Text style={{ fontSize: 30, color: '#FCBB3C', fontWeight: 'bold' }} >
                    QUẢN LÝ TÀI KHOẢN
                </Text>
            </View>
            <View style={{margin:10}} >
                <View style={{ marginHorizontal: 40, justifyContent: 'center', }} >
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập nội dung"
                        placeholderTextColor="#888"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:10, marginVertical:5, padding:10, borderWidth:1, borderRadius:10}}>
                <View style={{width:40, height:40, backgroundColor:10, borderRadius:20, backgroundColor:'yellow'}}></View>
                <Text style={{fontSize:16, fontWeight:'bold', marginStart:10}}>Nguyễn Quốc Dũng</Text>
                <TouchableOpacity 
                    onPress={() => {Alert.alert("Xem chi tiết người dùng")}}
                    style={{borderWidth:1, borderRadius:10, padding:5, marginStart:'auto', marginEnd:10}}>
                    <Ionicons name='eye' size={20} color='#000' />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {Alert.alert("Khóa tài khoản người dùng")}}
                    style={{borderWidth:1, borderRadius:10, padding:5}}>
                    <Octicons name='blocked' size={20} color='#000' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ManagerUser;
const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});