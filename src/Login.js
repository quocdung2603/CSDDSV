import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    


    return (
        <View style={{
            backgroundColor: '#1d1d27',
            flex: 1,
        }}>
            <KeyboardAwareScrollView>
                <Image
                    source={require('../Img/tdmu_logo.png')}
                    style={{
                        marginTop: 40,
                        marginRight: 34,
                        width: 260,
                        height: 125,
                        resizeMode: 'stretch',
                        alignSelf: 'center',
                        // marginHorizontal:10 cho xung quanh khoản cách là 10px
                    }}

                />

                <Text
                    style={{
                        alignSelf: 'center',
                        marginTop: 50,
                        fontSize: 20,
                        fontWeight: '800',
                        color: 'red',
                        textAlign: 'center'
                    }}>
                    TRAO ĐỔI ĐỒ DÙNG TDMU
                </Text>

                <TextInput
                    value={email}
                    onChange={txt => {
                        setEmail(txt);
                    }}
                    placeholder="Gmail"
                    placeholderTextColor={'grey'}
                    keyboardType='email-address'
                    style={{
                        width: '84%',
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 0.5,
                        alignSelf: 'center',
                        paddingLeft: 15,
                        marginTop: 45,
                        color: 'black',
                        backgroundColor: '#2a293b'
                    }}
                />
                <TextInput
                    value={pass}
                    onChange={txt => {
                        setPass(txt);
                    }}
                    placeholder="Mật khẩu"
                    placeholderTextColor={'grey'}
                    secureTextEntry={true}
                    style={{
                        width: '84%',
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 0.5,
                        alignSelf: 'center',
                        paddingLeft: 15,
                        marginTop: 20,
                        color: 'black',
                        backgroundColor: '#2a293b'
                    }}
                />

                <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('ForgotPass')
                }}
                >
                    <Text style={{
                        marginTop: 10,
                        fontSize: 13,
                        alignSelf: 'center',
                        color: 'white',
                    }}>
                        Quên mật khẩu?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '60%',
                        height: 50,
                        backgroundColor: '#cb2a5c',
                        borderRadius: 40,
                        marginTop: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}
                    onPress={() => {

                    }}>
                    <Text style={{ fontSize: 20, color: 'white', }}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '84%',
                        height: 50,
                        // backgroundColor: 'orange',
                        borderRadius: 10,
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}
                    onPress={() => {
                        navigation.navigate('Register');
                    }}>
                    <Text style={{ fontSize: 15, color: 'white', }}>
                        Đăng ký
                    </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )

}
export default Login;