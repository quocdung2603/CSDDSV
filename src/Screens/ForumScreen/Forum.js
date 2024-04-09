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
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

const Forum = ({ navigation }) => {
    useEffect(() => {
        GetPost()
    }, [])

    const [list, setList] = useState([])

    const GetPost = async () => {
        firestore()
            .collection('Posts')
            .get()
            .then(dt => {
                console.log(dt)
            })
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
            <Text style={{ margin: 10, textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#000' }}>Diễn Đàn Tìm Kiếm</Text>
            <TouchableOpacity style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}
                onPress={() => {
                    navigation.navigate('AddPost')
                }}
            >
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, alignItems: 'center', marginEnd: 'auto', flex: 0.9 }}>
                    <Text style={{ fontSize: 18 }}>Bạn cần đăng bài tìm sản phẩm gì ?</Text>
                </View>
                <View style={{ marginStart: 'auto', flex: 0.1, marginStart: 10 }}>
                    <AntDesign name='picture' size={37} color='#000' />
                </View>
            </TouchableOpacity>
            <ScrollView style={{ margin: 10 }}>
                
                <View style={{ flexDirection: 'column', margin: 10, borderWidth: 0.5, borderRadius: 10, borderColor: 'grey', padding: 2 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar.Image size={50} source={require('../../../Img/Dong_Doan.jpg')} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', marginStart: 10 }}>Đoàn Xuân Đông</Text>
                            <Text style={{ marginStart: 10 }}>21/3/2024 9:20 AM</Text>
                        </View>
                        <View style={{ marginStart: 'auto' }}>
                            <Ionicons name='ellipsis-horizontal' size={30} color='grey' />
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, padding: 5 }}>
                        <Text style={{ fontSize: 20, textAlign: 'justify' }}>Tôi năm nay hơn 20 tuổi đầu rồi nhưng chưa thấy ai tệ như Nguyễn Tấn Tài, Người gì đâu vừa tệ bạc vừa lười biến, nếu mà có cây súng chắc là tôi đấm nó chết mẹ luôn.</Text>
                    </View>
                </View>

                {/* <View style={{ flexDirection: 'column', margin: 10, borderWidth: 0.5, borderRadius: 10, borderColor: 'grey', padding: 2 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar.Image size={50} source={require('../../../Img/Dong_Doan.jpg')} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', marginStart: 10 }}>Đoàn Xuân Đông</Text>
                            <Text style={{ marginStart: 10 }}>21/3/2024 3:04 PM</Text>
                        </View>
                        <View style={{ marginStart: 'auto' }}>
                            <Ionicons name='ellipsis-horizontal' size={30} color='grey' />
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, padding: 5 }}>
                        <Text style={{ fontSize: 20, textAlign: 'justify' }}>Nếu có một điều ước, tôi sẽ ước để làm sao bạn Tài của tôi siêng năng trở lại, nhưng mà ... làm đéo gì có điều ước nào. </Text>
                    </View>
                </View> */}
            </ScrollView>
        </View>
    )
}
export default Forum;