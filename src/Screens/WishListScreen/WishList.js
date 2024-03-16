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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const WishList = () => {
    const [SearchBox, setSearchBox] = useState("");
    return (
        <View style={{flexDirection:'column', backgroundColor:'#fff', flex:1}}>
            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                <Text style={{marginEnd:'auto', fontSize:20, color:'red', fontWeight:'bold'}}>ABC</Text>
                <View style={{borderWidth:1, borderRadius:10, padding:5}}>
                    <Ionicons name='cart' size={30} color='#000' />
                </View>
            </View>
            <View style={{flexDirection:'row', margin:10, borderWidth:1, borderRadius:10, padding: 5, alignItems:'center'}}>
                <FontAwesome6 name='magnifying-glass' size={30} color='#000' style={{marginEnd:'auto'}} />
                <TextInput
                    value={SearchBox}
                    onChangeText={item => setSearchBox(item)}
                    autoComplete='false'
                    keyboardType='default'
                    placeholder='Searching category products'
                    style={{backgroundColor:'white', marginStart:10,marginEnd:'auto' , width:320, fontSize:20}} />
            </View>
            <Text style={{margin:10, fontSize:20, fontWeight:'bold',color:'#000'}}>0 products</Text>
            <View style={{flexDirection:'column', margin:10, justifyContent:'center', alignItems:'center'}}>
                <View style={{height:300,width:300, backgroundColor:'yellow'}}></View>
                <View style={{flexDirection:'row', margin:10, padding:10, borderWidth:1, borderRadius:10, borderColor:'#FE7E00', backgroundColor:'#FE7E00', alignItems:'center'}}>
                    <Text style={{fontSize:25, fontWeight:'bold', color:'#fff'}}>Explore now</Text>
                    <AntDesign name='right' size={30} color="white" />
                </View>
            </View> 
        </View>
    )
};

export default WishList;