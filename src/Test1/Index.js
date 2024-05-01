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
            <MapView
                initialRegion={{
                    latitude: 11.136039,
                    longitude: 106.701686,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                // style={{
                //     width: Dimensions.get('window').width,
                //     height: Dimensions.get('window').height,
                // }}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </View>
    )
}
export default Index;
