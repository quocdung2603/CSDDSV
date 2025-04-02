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

import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore, { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

const ListCateSoft = ({ data, product, navigation }) => {

    const [productClassifed, setProductClassifed] = useState([])
    const [titleCate, setTitleCate] = useState(data)

    // console.log(data, product, 132)
    console.log(navigation, 123)
    useEffect(() => {
        classifyProduct()
    }, [product, data])

    const classifyProduct = () => {

        setProductClassifed(prevState => {
            let temp = product.filter(item => item.category == data);
            // console.log(temp)
            return temp;
        });

    }

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ListItemCateSoft', { productClassifed, titleCate })
                }}
                style={{ marginVertical: 3, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 10 }}>
                <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                    <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>{data}</Text>
                    <Text style={{ fontSize: 17 }}>{productClassifed.length} products</Text>
                </View>
                <View style={{ marginStart: 'auto', backgroundColor: 'yellow' }}>
                    <Text>ABC</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default ListCateSoft;