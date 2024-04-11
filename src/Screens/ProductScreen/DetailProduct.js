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
    ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const DetailProduct = ({ route, navigation }) => {
    let item = route.params
    console.log(item)
    useEffect(() => {

    })

    const randomIma = item.img[Math.floor(Math.random() * item.img.length)]
    // console.log(randomIma)

    

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'column', borderWidth: 1 }}>
                <ImageBackground
                    source={{ uri: randomIma }}
                >

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto', margin: 10, marginBottom: 'auto' }}>
                            <AntDesign name="arrowleft" size={30} color="#000" />
                        </View>
                        <View style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginBottom: 'auto', margin: 10 }}>
                            <Ionicons name='cart' size={30} color='#000' />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 180, marginBottom: 10 }}>
                        <View style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5, marginEnd: 'auto', margin: 10, marginBottom: 'auto' }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Table</Text>
                        </View>
                        <View style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginBottom: 'auto', margin: 10 }}>
                            <Ionicons name="bookmark" size={30} color="#0AC9BD" />
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <ScrollView>
                <View style={{ flexDirection: 'row', margin: 10, padding: 10, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>{item.title}</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>$100</Text>
                </View>
                <View style={{ margin: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                <View style={{ flexDirection: 'column', margin: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>Description</Text>
                    <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                        <Text style={{ fontSize: 15, color: 'grey' }}>{item.description}</Text>
                    </View>
                </View>
                <View style={{ margin: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>

            </ScrollView>
            <TouchableOpacity style={{ marginTop: 'auto', borderWidth: 1, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {

                }}
            >
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', padding: 10 }}>Add To Cart</Text>
            </TouchableOpacity>
        </View>
    )
};

export default DetailProduct