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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const CategoryMain = () => {
    const [SearchBox, setSearchBox] = useState("");
    return (
        <View style={{flexDirection:'column', backgroundColor:'#fff', flex:1}}>
            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                <Text style={{marginEnd:'auto', fontSize:20, color:'red', fontWeight:'bold'}}>ABC</Text>
                <View style={{borderWidth:1, borderRadius:10, padding:5}}>
                    <Ionicons name='cart' size={30} color='#000' />
                </View>
            </View>
            <View style={{flexDirection:'row', margin:10, borderWidth:1, borderRadius:10, padding: 5, alignItems:'center'}}>
                <FontAwesome6 name='magnifying-glass' size={30} color='#000' style={{marginEnd:'auto'}} />
                <TextInput
                    value={SearchBox}
                    onChangeText={item => setSearchBox(item)}
                    autoComplete='false'
                    keyboardType='default'
                    placeholder='Searching category products'
                    style={{backgroundColor:'white', marginStart:10,marginEnd:10 , width:300, fontSize:20}} />
                <MaterialCommunityIcons name='line-scan' size={30} color='#000'  style={{marginStart:'auto'}} />
            </View>
            <View style={{flexDirection:'column', margin:10}}>
                <Text style={{fontSize:19, fontWeight:'bold', marginEnd:'auto'}}>Category</Text>
                <View style={{flexDirection:'row', margin:10}}>
                    {/* 1 */}
                    <View style={{flexDirection:'column', marginHorizontal:3}}>
                        <View style={{borderWidth:1, borderRadius:10, paddingVertical:20, paddingHorizontal:40, justifyContent:'center', alignItems:'center', marginVertical:5}}>
                            <Text style={{fontSize:20, fontWeight:'bold',}}>ABC</Text>
                        </View>
                        <View style={{borderWidth:1, borderRadius:10, paddingVertical:20, paddingHorizontal:40, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:20, fontWeight:'bold',}}>ABC</Text>
                        </View>
                    </View>
                    {/* 2 */}
                    <View style={{flexDirection:'column', marginHorizontal:3}}>
                        <View style={{borderWidth:1, borderRadius:10, paddingVertical:20, paddingHorizontal:40, justifyContent:'center', alignItems:'center', marginVertical:5}}>
                            <Text style={{fontSize:20, fontWeight:'bold',}}>ABC</Text>
                        </View>
                        <View style={{borderWidth:1, borderRadius:10, paddingVertical:20, paddingHorizontal:40, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:20, fontWeight:'bold',}}>ABC</Text>
                        </View>
                    </View>
                    {/* 3 */}
                    <View style={{flexDirection:'column', marginHorizontal:3}}>
                        <View style={{borderWidth:1, borderRadius:10, paddingVertical:20, paddingHorizontal:40, justifyContent:'center', alignItems:'center', marginVertical:5}}>
                            <Text style={{fontSize:20, fontWeight:'bold',}}>ABC</Text>
                        </View>
                        <View style={{borderWidth:1, borderRadius:10, paddingVertical:20, paddingHorizontal:40, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:20, fontWeight:'bold',}}>ABC</Text>
                        </View>
                    </View>
                    {/* 4 */}
                    <View style={{flexDirection:'column', marginHorizontal:3}}>
                        <View style={{borderWidth:1, borderRadius:10, paddingVertical:20, paddingHorizontal:40, justifyContent:'center', alignItems:'center', marginVertical:5}}>
                            <Text style={{fontSize:20, fontWeight:'bold',}}>ABC</Text>
                        </View>
                        <View style={{borderWidth:1, borderRadius:10, paddingVertical:20, paddingHorizontal:40, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:20, fontWeight:'bold',}}>ABC</Text>
                        </View>
                    </View>
                </View> 
            </View>

            <ScrollView style={{flexDirection:'column', margin:10}}>
                <Text style={{fontSize:19, fontWeight:'bold', marginEnd:'auto'}}>Category</Text>
                <View style={{marginVertical:3, flexDirection:'row', borderWidth:1, borderRadius:10, padding:10}}>
                    <View style={{flexDirection:'column', marginEnd:'auto'}}>
                        <Text style={{fontSize:20, color:'#000',fontWeight:'bold'}}>Table</Text>
                        <Text style={{fontSize:17}}>3 products</Text>
                    </View>
                    <View style={{marginStart:'auto', backgroundColor:'yellow'}}>
                        <Text>ABC</Text>
                    </View>
                </View>
                <View style={{marginVertical:3, flexDirection:'row', borderWidth:1, borderRadius:10, padding:10}}>
                    <View style={{flexDirection:'column', marginEnd:'auto'}}>
                        <Text style={{fontSize:20, color:'#000',fontWeight:'bold'}}>Table</Text>
                        <Text style={{fontSize:17}}>3 products</Text>
                    </View>
                    <View style={{marginStart:'auto', backgroundColor:'yellow'}}>
                        <Text>ABC</Text>
                    </View>
                </View>
                <View style={{marginVertical:3, flexDirection:'row', borderWidth:1, borderRadius:10, padding:10}}>
                    <View style={{flexDirection:'column', marginEnd:'auto'}}>
                        <Text style={{fontSize:20, color:'#000',fontWeight:'bold'}}>Table</Text>
                        <Text style={{fontSize:17}}>3 products</Text>
                    </View>
                    <View style={{marginStart:'auto', backgroundColor:'yellow'}}>
                        <Text>ABC</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

export default CategoryMain;