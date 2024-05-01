import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import MapView from 'react-native-maps';

const Index = () => {

    return (
        <View
            style={{
                flex: 1,
                borderWidth: 1,
                borderColor: 'black',
            }}
        >
            <Text>fdafdas</Text>
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
        </View>
    )
}
export default Index;
