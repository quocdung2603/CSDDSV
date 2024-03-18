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
const Personal = () => {

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', borderWidth: 1 }}>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto' }}>
                    <AntDesign name="arrowleft" size={30} color="#000" />
                </View>
                <Text style={{ marginEnd: 'auto', position: "relative", fontSize: 20, color: '#000', fontWeight: 'bold' }}>
                    Settings
                </Text>
            </View>
            <View style={{ borderWidth: 1, alignItems: 'center' }}>
                <Avatar.Image size={200} source={require('../../../Img/Dong_Doan.jpg')} />
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.2, margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Icon name="pencil" size={30} />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>
                            Personal settings
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.2, margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Icon name="pencil" size={30} />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>
                            Personal settings
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.2, margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Icon name="pencil" size={30} />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>
                            Personal settings
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.2, margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Icon name="pencil" size={30} />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>
                            Personal settings
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.2, margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Icon name="pencil" size={30} />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>
                            Personal settings
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.2, margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Icon name="pencil" size={30} />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>
                            Personal settings
                        </Text>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default Personal;