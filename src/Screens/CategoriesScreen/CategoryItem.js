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

const CategoryItem = () => {
    return (
        <View style={{ flexDirection: 'column', backgroundColor: 'white', flex:1 }}>
            <View style={{ flexDirection: 'column', borderWidth: 1 }}>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, marginEnd: 'auto', margin: 10 }}>
                    <AntDesign name="arrowleft" size={30} color="#000" />
                </View>
                <View style={{ marginEnd: 'auto', marginStart: 30, marginTop: 180, marginBottom: 20 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>Table</Text>
                    <Text style={{ fontSize: 20, color: 'grey' }}>3 products</Text>
                </View>
            </View>
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

export default CategoryItem;