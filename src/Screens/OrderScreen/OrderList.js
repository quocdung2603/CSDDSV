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

const OrderList = ({navigation}) => {
    const [All, setAll] = useState(1)
    const [Wait, setWait] = useState(0)
    const [Finish, setFinish] = useState(0)
    const [Cancel, setCancel] = useState(0)
    return (
        <View style={{flex:1, flexDirection:'column', backgroundColor:'#fff'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity 
                    onPress={() => {navigation.goBack()}}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto', margin: 10 }}>
                    <AntDesign name="arrowleft" size={30} color="#FE7E00" />
                </TouchableOpacity>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Danh Sách Đơn Giao Dịch</Text>
                <View style={{marginStart:'auto'}}></View>
            </View>
            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                <TouchableOpacity 
                    onPress={() => { setAll(1), setWait(0), setFinish(0), setCancel(0) }}
                    style={{borderWidth:1, borderRadius:10, marginHorizontal:3, flex:0.25, paddingVertical:5, backgroundColor: All === 1 ? '#FE7E00' : '#fff'}}
                >
                    <Text style={{fontSize:20, fontWeight:'bold', color: All===1 ? '#fff' :'#000', textAlign:'center'}}>Tất Cả</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => { setAll(0), setWait(1), setFinish(0), setCancel(0) }}
                    style={{borderWidth:1, borderRadius:10, marginHorizontal:3, flex:0.25, paddingVertical:5, backgroundColor: Wait === 1 ? '#FE7E00' : '#fff'}}
                >
                    <Text style={{fontSize:20, fontWeight:'bold', color: Wait===1 ? '#fff' :'#000', textAlign:'center'}}>Đang Chờ</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => { setAll(0), setWait(0), setFinish(1), setCancel(0) }}
                    style={{borderWidth:1, borderRadius:10, marginHorizontal:3, flex:0.25, paddingVertical:5, backgroundColor: Finish === 1 ? '#FE7E00' : '#fff'}}
                >
                    <Text style={{fontSize:20, fontWeight:'bold', color: Finish===1 ? '#fff' :'#000', textAlign:'center'}}>Hoàn Tất</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => { setAll(0), setWait(0), setFinish(0), setCancel(1) }}
                    style={{borderWidth:1, borderRadius:10, marginHorizontal:3, flex:0.25, paddingVertical:5, backgroundColor: Cancel === 1 ? '#FE7E00' : '#fff'}}
                >
                    <Text style={{fontSize:20, fontWeight:'bold', color: Cancel===1 ? '#fff' :'#000', textAlign:'center'}}>Đã Hủy</Text>
                </TouchableOpacity>
            </View>
            {All === 1 ? (
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 5, borderWidth: 1, borderRadius: 10 }}>
                            <View style={{ flex: 0.4, backgroundColor: 'yellow', marginEnd: 'auto' }}>
                            </View>
                            <View style={{ flexDirection: 'column', marginEnd: 'auto', flex: 0.6 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                                    <View style={{ flexDirection: 'column', marginEnd: 'auto', marginStart: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ca dủ</Text>
                                        <Text>Màu: Trắng</Text>
                                        <Text>Số lượng: x2</Text>
                                    </View>
                                    <Text style={{ marginStart: 'auto', marginEnd: 10 }}>100$</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            ) : ""}
            {Wait === 1 ? (
                <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 5, borderWidth: 1, borderRadius: 10 }}>
                            <View style={{ flex: 0.4, backgroundColor: 'yellow', marginEnd: 'auto' }}>
                            </View>
                            <View style={{ flexDirection: 'column', marginEnd: 'auto', flex: 0.6 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                                    <View style={{ flexDirection: 'column', marginEnd: 'auto', marginStart: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>là dỗn</Text>
                                        <Text>Màu: Trắng</Text>
                                        <Text>Số lượng: x2</Text>
                                    </View>
                                    <Text style={{ marginStart: 'auto', marginEnd: 10 }}>100$</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            ) : ""}
            {Finish === 1 ? (
                <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 5, borderWidth: 1, borderRadius: 10 }}>
                            <View style={{ flex: 0.4, backgroundColor: 'yellow', marginEnd: 'auto' }}>
                            </View>
                            <View style={{ flexDirection: 'column', marginEnd: 'auto', flex: 0.6 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                                    <View style={{ flexDirection: 'column', marginEnd: 'auto', marginStart: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>tả giêu ình</Text>
                                        <Text>Màu: Trắng</Text>
                                        <Text>Số lượng: x2</Text>
                                    </View>
                                    <Text style={{ marginStart: 'auto', marginEnd: 10 }}>100$</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            ) : ""}
            {Cancel === 1 ? (
                <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 5, borderWidth: 1, borderRadius: 10 }}>
                            <View style={{ flex: 0.4, backgroundColor: 'yellow', marginEnd: 'auto' }}>
                            </View>
                            <View style={{ flexDirection: 'column', marginEnd: 'auto', flex: 0.6 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                                    <View style={{ flexDirection: 'column', marginEnd: 'auto', marginStart: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>chứng cắm sồng</Text>
                                        <Text>Màu: Trắng</Text>
                                        <Text>Số lượng: x2</Text>
                                    </View>
                                    <Text style={{ marginStart: 'auto', marginEnd: 10 }}>100$</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            ) : ""}
        </View>
    );
};

export default OrderList;