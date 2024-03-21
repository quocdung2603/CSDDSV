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

const Personal = ({ navigation }) => {
    const [TabPost, setTabPost] = useState(1);
    const [TabFollower, setTabFollower] = useState(0);
    const [TabFollowing, setTabFollowing] = useState(0);
    return (
        <View style={{ flex: 1, flexDirection:'column', backgroundColor:'#fff'}}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <TouchableOpacity 
                    onPress={() => {navigation.navigate("StoreMain")}}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto' }}>
                    <Ionicons name="storefront" size={30} color="#FE7E00" />
                </TouchableOpacity>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Profile</Text>
                <TouchableOpacity 
                    onPress={() => {navigation.navigate("SettingMain")}}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
                    <Ionicons name='settings' size={30} color='#FE7E00' />
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center' }}>
                <Avatar.Image size={200} source={require('../../../Img/Dong_Doan.jpg')} />
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#000' }}>Đông Đoàn</Text>
            </View>

            <View style={{flexDirection: 'row', borderTopColor: 'grey', marginVertical:10}}>
                <TouchableOpacity 
                    onPress={() => {setTabPost(1); setTabFollower(0); setTabFollowing(0)}}
                    style={{borderWidth: 1, marginEnd:'auto', paddingVertical:10, paddingHorizontal:3, backgroundColor: TabPost === 1 ? '#FE7E00' : '#fff'}}
                >
                    <Text style={{fontSize:20, fontWeight:'bold', color: TabPost === 1 ? '#fff' : '#000'}}>Các Bài Viết</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {setTabPost(0); setTabFollower(1); setTabFollowing(0)}}
                    style={{borderWidth: 1, paddingVertical:10, paddingHorizontal:3, backgroundColor: TabFollower === 1 ? '#FE7E00' : '#fff'}}
                >
                    <Text style={{fontSize:20, fontWeight:'bold', color: TabFollower === 1 ? '#fff' : '#000'}}>Người Theo Dõi</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {setTabPost(0); setTabFollower(0); setTabFollowing(1)}}
                    style={{borderWidth: 1, marginStart:'auto', paddingVertical:10, paddingHorizontal:3, backgroundColor: TabFollowing === 1 ? '#FE7E00' : '#fff'}}
                >
                    <Text style={{fontSize:20, fontWeight:'bold', color: TabFollowing === 1 ? '#fff' : '#000'}}>Đang Theo Dõi</Text>   
                </TouchableOpacity>
            </View>
            {TabPost === 1 ? (
                <View style={{flex:1, flexDirection:'column'}}>
                    <ScrollView>
                        <View style={{flexDirection:'column', margin:10, borderWidth:0.5, borderRadius:10, borderColor:'grey', padding:2}}>
                            <View style={{flexDirection:'row'}}>
                                <Avatar.Image size={50} source={require('../../../Img/Dong_Doan.jpg')} />
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:22, fontWeight:'bold', marginStart:10}}>Đoàn Xuân Đông</Text>
                                    <Text style={{marginStart:10}}>21/3/2024 9:20 AM</Text>
                                </View>
                            </View>
                            <View style={{marginHorizontal:10, padding:5}}>
                                <Text style={{fontSize:20,textAlign:'justify'}}>Tôi năm nay hơn 20 tuổi đầu rồi nhưng chưa thấy ai tệ như Nguyễn Tấn Tài, Người gì đâu vừa tệ bạc vừa lười biến, nếu mà có cây súng chắc là tôi đấm nó chết mẹ luôn.</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            ) : ""}
            {TabFollower === 1 ? (
                <View style={{flex:1, flexDirection:'column'}}>
                    <ScrollView>
                        <View style={{flexDirection:'row', marginVertical:5, marginHorizontal:20, alignItems:'center'}}>
                            <Avatar.Image size={50} source={require('../../../Img/Dong_Doan.jpg')} />
                            <Text style={{fontSize:22, fontWeight:'bold', marginStart:10}}>Đoàn Xuân Đông</Text>
                        </View>
                    </ScrollView>
                </View>
            ) : ""}
            {TabFollowing === 1 ? (
                <View style={{flex:1, flexDirection:'column'}}>
                    <ScrollView>
                        <View style={{flexDirection:'row', marginVertical:5, marginHorizontal:20, alignItems:'center'}}>
                            <Avatar.Image size={50} source={require('../../../Img/Dong_Doan.jpg')} />
                            <Text style={{fontSize:22, fontWeight:'bold', marginStart:10}}>Đoàn Xuân Đông</Text>
                        </View>
                    </ScrollView>
                </View>
            ) : ""}
        </View>
    )
}

export default Personal;