import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            checkLogin();
        }, 3000);
    }, []);

    const checkLogin = async () => {
        const createItemUser = await AsyncStorage.getItem('USERID')
        navigation.navigate('Login');
        // }
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={require('../Img/tdmu_logo.png')}
                style={{
                    width: 260,
                    height: 125,
                    // alignSelf:'center'
                    // marginHorizontal:10 cho xung quanh khoản cách là 10px
                }}

            />
        </View>
    )
}

export default Splash;