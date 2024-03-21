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

const OrderDetail = ({navigation}) => {

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {navigation.goBack()}} 
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto', margin: 10 }}>
                    <AntDesign name="arrowleft" size={30} color="#FE7E00" />
                </TouchableOpacity>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Chi Tiết Đơn Hàng</Text>
                <View style={{marginStart:'auto'}}></View>
            </View>
            <ScrollView>
                <View style={{ flexDirection: 'column', margin: 10 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000' }}>Thông Tin Đơn</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, marginEnd: 'auto', color: '#000' }}>Mã Giao Dịch</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>#ABC1234</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, marginEnd: 'auto', color: '#000' }}>Ngày </Text>
                        <Text style={{ fontSize: 20, color: '#000' }}>17, March 2024</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                <View style={{ flexDirection: 'column', margin: 10 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000' }}>Thông Tin Người Đăng</Text>
                    <View style={{ margin: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginEnd: 'auto', color: '#000' }}>Tên:</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Nguyễn Quốc Dũng</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginEnd: 'auto', color: '#000' }}>Số điện thoại:</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Nguyễn Quốc Dũng</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginEnd: 'auto', color: '#000' }}>Zalo:</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>0901291640</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginEnd: 'auto', color: '#000' }}>Facebook:</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>nguyenquocdung.560</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginEnd: 'auto', color: '#000' }}>Instagram:</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>@ditmelonTai_666</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                <View style={{flexDirection:'column', margin:10}}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000' }}>Địa Chỉ</Text>
                    <View style={{flexDirection:'row', marginHorizontal:10}}>
                        <Text style={{fontSize:20, color:'#000'}}>349/19 Nguyễn Văn Trỗi, Hiệp Thành, Bình Dương</Text>
                    </View>
                    <View style={{borderWidth:1, borderRadius:10, backgroundColor:'yellow', height:150, marginTop:5}}>
                        {/* bản đồ */}
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                <View style={{ flexDirection: 'column', margin: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Sản Phẩm</Text>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'red', marginStart: 'auto' }}>2</Text>
                    </View>
                </View>
                {/* sản phẩm 1 -> làm thành 1 list hàng dọc*/}
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 5, borderWidth: 1, borderRadius: 10 }}>
                    <View style={{ flex: 0.4, backgroundColor: 'yellow', marginEnd: 'auto' }}>
                    </View>
                    <View style={{ flexDirection: 'column', marginEnd: 'auto', flex: 0.6 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                            <View style={{ flexDirection: 'column', marginEnd: 'auto', marginStart: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cu giả</Text>
                                <Text>Màu: Trắng</Text>
                                <Text>Số lượng: x2</Text>
                            </View>
                            <Text style={{ marginStart: 'auto', marginEnd: 10 }}>100$</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => {Alert.alert("bấm dô là hủy đơn hàng")}} 
                style={{marginTop:'auto', borderWidth:1, backgroundColor:'grey', justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, fontWeight:'bold',color:'#fff', padding:10}}>Hủy Giao Dịch</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OrderDetail;