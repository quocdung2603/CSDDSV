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
const ProductList = () => {
    const [SearchBox, setSearchBox] = useState("");
    return (
        <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto', margin: 10 }}>
                    <AntDesign name="arrowleft" size={30} color="#000" />
                </View>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Product List</Text>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
                    <Ionicons name='cart' size={30} color='#000' />
                </View>
            </View>
            <View style={{ flexDirection: 'row', margin: 10, borderWidth: 1, borderRadius: 10, padding: 5, alignItems: 'center' }}>
                <FontAwesome6 name='magnifying-glass' size={30} color='#000' style={{ marginEnd: 'auto' }} />
                <TextInput
                    value={SearchBox}
                    onChangeText={item => setSearchBox(item)}
                    autoComplete='false'
                    keyboardType='default'
                    placeholder='Searching category products'
                    style={{ backgroundColor: 'white', marginStart: 10, marginEnd: 10, width: 300, fontSize: 20 }} />
                <MaterialCommunityIcons name='line-scan' size={30} color='#000' style={{ marginStart: 'auto' }} />
            </View>
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 5, borderWidth: 1, borderRadius: 10, padding: 3, alignItems: 'center' }}>
                    <Entypo name='box' size={30} color='#000' />
                    <Text>All Category</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 5, borderWidth: 1, borderRadius: 10, padding: 3, alignItems: 'center' }}>
                    <Entypo name='box' size={30} color='#000' />
                    <Text>All Category</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 5, borderWidth: 1, borderRadius: 10, padding: 3, alignItems: 'center' }}>
                    <Entypo name='box' size={30} color='#000' />
                    <Text>All Category</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 5, borderWidth: 1, borderRadius: 10, padding: 3, alignItems: 'center' }}>
                    <Entypo name='box' size={30} color='#000' />
                    <Text>All Category</Text>
                </View>
            </View>
            <Text style={{margin:10, fontSize:20, fontWeight:'bold', color:'#000'}}>0 products</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', marginVertical: 10, marginHorizontal: 13 }}>
                    <View style={{ borderWidth: 1, width: 180, height: 220, borderWidth: 1, borderRadius: 20 }}>
                        <View style={{ padding: 10, marginStart: 'auto' }}>
                            <Ionicons name="bookmark" size={25} color="#0AC9BD" />
                        </View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 100, marginStart: 10 }} >Con chim</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ marginStart: 10, marginEnd: 'auto' }}>100$</Text>
                            <View style={{ flexDirection: 'column', marginStart: 'auto', marginEnd: 10 }}>
                                <AntDesign name='plussquare' size={35} color='ograne' />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginVertical: 10, marginHorizontal: 13, borderRadius: 10 }}>
                    <View style={{ borderWidth: 1, width: 180, height: 220, borderWidth: 1, borderRadius: 20 }}>
                        <View style={{ padding: 10, marginStart: 'auto' }}>
                            <Ionicons name="bookmark" size={25} color="#0AC9BD" />
                        </View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 100, marginStart: 10 }} >Con cò</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ marginStart: 10, marginEnd: 'auto' }}>100$</Text>
                            <View style={{ flexDirection: 'column', marginStart: 'auto', marginEnd: 10 }}>
                                <AntDesign name='plussquare' size={35} color='ograne' />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
};

export default ProductList;