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
const CartMain = ({navigation}) => {
    const [SearchBox, setSearchBox] = useState("");
    return (
        <View style={{ flexDirection: 'column', flex:1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <TouchableOpacity 
                    onPress={() => {navigation.goBack()}}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto', margin: 10 }}>
                    <AntDesign name="arrowleft" size={30} color="#FE7E00" />
                </TouchableOpacity>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Your Cart</Text>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
                    <Ionicons name='cart' size={30} color='#FE7E00' />
                </View>
            </View>
            <Text style={{margin:10, fontSize:20, fontWeight:'bold', color:'#000'}}>0 products</Text>
            <ScrollView style={{margin:10}}>
                <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5, borderWidth:1, borderRadius:10}}> 
                    <View style={{width:140, height:120, backgroundColor:'yellow', marginEnd:'auto'}}>
                    </View>
                    <View style={{flexDirection:'column', marginEnd:'auto', flex:1}}>
                        <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
                            <View style={{flexDirection:'column', marginEnd:'auto', marginStart:10}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Con cò</Text>
                                <Text>Màu: trắng</Text>
                            </View>
                            <Text style={{marginStart:'auto', marginEnd:10}}>100$</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop:'auto', marginStart:'auto', marginEnd:20, marginBottom:10, alignItems:'center'}}>
                            <TouchableOpacity

                            >
                                <AntDesign name='minussquare' size={30} color='grey' />
                            </TouchableOpacity>
                            <Text style={{marginHorizontal:10}}>1</Text>
                            <TouchableOpacity
                            
                            >
                                <AntDesign name='plussquare' size={30} color='grey' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5, borderWidth:1, borderRadius:10}}> 
                    <View style={{width:140, height:120, backgroundColor:'yellow', marginEnd:'auto'}}>
                    </View>
                    <View style={{flexDirection:'column', marginEnd:'auto', flex:1}}>
                        <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
                            <View style={{flexDirection:'column', marginEnd:'auto', marginStart:10}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Con cò</Text>
                                <Text>Màu: trắng</Text>
                            </View>
                            <Text style={{marginStart:'auto', marginEnd:10}}>100$</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop:'auto', marginStart:'auto', marginEnd:20, marginBottom:10, alignItems:'center'}}>
                            <TouchableOpacity

                            >
                                <AntDesign name='minussquare' size={30} color='grey' />
                            </TouchableOpacity>
                            <Text style={{marginHorizontal:10}}>1</Text>
                            <TouchableOpacity
                            
                            >
                                <AntDesign name='plussquare' size={30} color='grey' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5, borderWidth:1, borderRadius:10}}> 
                    <View style={{width:140, height:120, backgroundColor:'yellow', marginEnd:'auto'}}>
                    </View>
                    <View style={{flexDirection:'column', marginEnd:'auto', flex:1}}>
                        <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
                            <View style={{flexDirection:'column', marginEnd:'auto', marginStart:10}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Con cò</Text>
                                <Text>Màu: trắng</Text>
                            </View>
                            <Text style={{marginStart:'auto', marginEnd:10}}>100$</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop:'auto', marginStart:'auto', marginEnd:20, marginBottom:10, alignItems:'center'}}>
                            <TouchableOpacity

                            >
                                <AntDesign name='minussquare' size={30} color='grey' />
                            </TouchableOpacity>
                            <Text style={{marginHorizontal:10}}>1</Text>
                            <TouchableOpacity
                            
                            >
                                <AntDesign name='plussquare' size={30} color='grey' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5, borderWidth:1, borderRadius:10}}> 
                    <View style={{width:140, height:120, backgroundColor:'yellow', marginEnd:'auto'}}>
                    </View>
                    <View style={{flexDirection:'column', marginEnd:'auto', flex:1}}>
                        <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
                            <View style={{flexDirection:'column', marginEnd:'auto', marginStart:10}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Con cò</Text>
                                <Text>Màu: trắng</Text>
                            </View>
                            <Text style={{marginStart:'auto', marginEnd:10}}>100$</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop:'auto', marginStart:'auto', marginEnd:20, marginBottom:10, alignItems:'center'}}>
                            <TouchableOpacity

                            >
                                <AntDesign name='minussquare' size={30} color='grey' />
                            </TouchableOpacity>
                            <Text style={{marginHorizontal:10}}>1</Text>
                            <TouchableOpacity
                            
                            >
                                <AntDesign name='plussquare' size={30} color='grey' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5, borderWidth:1, borderRadius:10}}> 
                    <View style={{width:140, height:120, backgroundColor:'yellow', marginEnd:'auto'}}>
                    </View>
                    <View style={{flexDirection:'column', marginEnd:'auto', flex:1}}>
                        <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
                            <View style={{flexDirection:'column', marginEnd:'auto', marginStart:10}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Con cò</Text>
                                <Text>Màu: trắng</Text>
                            </View>
                            <Text style={{marginStart:'auto', marginEnd:10}}>100$</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop:'auto', marginStart:'auto', marginEnd:20, marginBottom:10, alignItems:'center'}}>
                            <TouchableOpacity

                            >
                                <AntDesign name='minussquare' size={30} color='grey' />
                            </TouchableOpacity>
                            <Text style={{marginHorizontal:10}}>1</Text>
                            <TouchableOpacity
                            
                            >
                                <AntDesign name='plussquare' size={30} color='grey' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* checkout */}
            <View style={{flexDirection:'column', backgroundColor:'#1D2A44', height:250}}>
                <View style={{margin:10, flexDirection:'row'}}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>Total: </Text>
                    <Text style={{fontSize:20, color:'white'}}>3</Text>
                </View>
                <View style={{borderWidth:1, backgroundColor:'orange', justifyContent:'center', alignItems:'center', padding:10, marginTop:'auto'}}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>Checkout</Text>
                </View>
            </View>
        </View>
    )
};

export default CartMain;