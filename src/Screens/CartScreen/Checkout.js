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

const Checkout = () => {

    return (
        <View style={{flexDirection:'column', flex:1, backgroundColor:'#fff'}}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto'}}>
                    <AntDesign name="arrowleft" size={30} color="#000" />
                </View>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Checkout</Text>
            </View>
            <View style={{flexDirection:'column', margin:10}}>
                <Text style={{fontSize:22, fontWeight:'bold', color:'#000'}}>Địa Chỉ Giao Dịch</Text>
                <View style={{flexDirection:'row', borderWidth:1, borderRadius:10, marginVertical:10}}>
                    <View style={{flexDirection:'column', flex:0.6}}>
                        <View style={{flexDirection:'row', alignItems:'center', margin:5}}>
                            <Ionicons name="home" size={25} color="#000" />
                            <Text style={{fontSize:22, marginStart:10, color:'#000'}}>Home</Text>
                        </View>
                        <Text style={{margin:10, fontSize:20}}>349/19 Nguyễn Văn Trỗi, Hiệp Thành, Thủ Dầu Một, Bình Dương</Text>
                    </View>
                    <View style={{flex:0.4, backgroundColor:'yellow'}}>
                        {/* bản đồ  */}
                    </View>
                </View>
            </View>
            <View style={{marginHorizontal:10, borderWidth:0.5, borderColor:'grey'}}></View>
            <View style={{flexDirection:'column', margin:10}}>
                <Text style={{fontSize:22, fontWeight:'bold', color:'#000'}}>Thông tin liên hệ</Text>
                <View style={{margin:10}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:20, marginEnd:'auto', color:'#000'}}>Tên:</Text>
                        <Text style={{fontSize:20, fontWeight:'bold', color:'#000'}}>Nguyễn Quốc Dũng</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:20, marginEnd:'auto', color:'#000'}}>Số điện thoại:</Text>
                        <Text style={{fontSize:20, fontWeight:'bold', color:'#000'}}>Nguyễn Quốc Dũng</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:20, marginEnd:'auto', color:'#000'}}>Zalo:</Text>
                        <Text style={{fontSize:20, fontWeight:'bold', color:'#000'}}>0901291640</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:20, marginEnd:'auto', color:'#000'}}>Facebook:</Text>
                        <Text style={{fontSize:18, fontWeight:'bold', color:'#000'}}>nguyenquocdung.560</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:20, marginEnd:'auto', color:'#000'}}>Instagram:</Text>
                        <Text style={{fontSize:18, fontWeight:'bold', color:'#000'}}>@ditmelonTai_666</Text>
                    </View>
                </View>
            </View>
            <View style={{marginHorizontal:10, borderWidth:0.5, borderColor:'grey'}}></View>
            <View style={{flexDirection:'column', margin:10}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:22, fontWeight:'bold', color:'#000', marginEnd:'auto'}}>Sản Phẩm</Text>
                    <Text style={{fontSize:22, fontWeight:'bold', color:'red', marginStart:'auto'}}>2</Text>
                </View>
            </View>
            <ScrollView>
                <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5, borderWidth:1, borderRadius:10}}> 
                    <View style={{flex:0.4, backgroundColor:'yellow', marginEnd:'auto'}}>
                    </View>
                    <View style={{flexDirection:'column', marginEnd:'auto', flex:0.6}}>
                        <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
                            <View style={{flexDirection:'column', marginEnd:'auto', marginStart:10}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Cu giả</Text>
                                <Text>Màu: Trắng</Text>
                                <Text>Số lượng: x2</Text>
                            </View>
                            <Text style={{marginStart:'auto', marginEnd:10}}>100$</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5, borderWidth:1, borderRadius:10}}> 
                    <View style={{flex:0.4, backgroundColor:'yellow', marginEnd:'auto'}}>
                    </View>
                    <View style={{flexDirection:'column', marginEnd:'auto', flex:0.6}}>
                        <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
                            <View style={{flexDirection:'column', marginEnd:'auto', marginStart:10}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Cu giả</Text>
                                <Text>Màu: Trắng</Text>
                                <Text>Số lượng: x2</Text>
                            </View>
                            <Text style={{marginStart:'auto', marginEnd:10}}>100$</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5, borderWidth:1, borderRadius:10}}> 
                    <View style={{flex:0.4, backgroundColor:'yellow', marginEnd:'auto'}}>
                    </View>
                    <View style={{flexDirection:'column', marginEnd:'auto', flex:0.6}}>
                        <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
                            <View style={{flexDirection:'column', marginEnd:'auto', marginStart:10}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Cu giả</Text>
                                <Text>Màu: Trắng</Text>
                                <Text>Số lượng: x2</Text>
                            </View>
                            <Text style={{marginStart:'auto', marginEnd:10}}>100$</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{marginTop:'auto', borderWidth:1, backgroundColor:'orange', justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, fontWeight:'bold',color:'#fff', padding:10}}>Hoàn Tất</Text>
            </View>
        </View>
    );
};

export default Checkout;