import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import MapView from 'react-native-maps';

const Mapp = ({ navigation }) => {


    return (
        <View
            style={{
                flex: 1,
                borderWidth: 1,
                borderColor: 'black',
            }}
        >
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color: 'black',
                        fontSize: 20
                    }}
                >
                    Địa chỉ
                </Text>
            </View>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{
                    height: '90%',
                    width: '100%',
                }}
            />
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10
                }}
            >
                <TouchableOpacity
                    style={{
                        borderRadius: 10,
                        // borderWidth: 1,
                        width: 60,
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'skyblue'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20
                        }}
                    >
                        Gửi
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Mapp;
