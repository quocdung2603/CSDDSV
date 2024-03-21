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

const CategoryMain = ({ navigation }) => {
    const [SearchBox, setSearchBox] = useState("");
    const [TabStudy, setTabStudy] = useState(1);
    const [TabClothes, setTabClothes] = useState(0);
    const [TabHouseware, setTabHouseware] = useState(0);
    return (
        <View style={{ flexDirection: 'column', backgroundColor: '#fff', flex: 1 }}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: 'red', fontWeight: 'bold' }}>ABC</Text>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('CartMain') }}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
                    <Ionicons name='cart' size={30} color='#000' />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', margin: 10, borderWidth: 1, borderRadius: 10, padding: 5, alignItems: 'center' }}>
                <FontAwesome6 name='magnifying-glass' size={30} color='#000' style={{ marginEnd: 'auto' }} />
                <TextInput
                    value={SearchBox}
                    onChangeText={item => setSearchBox(item)}
                    autoComplete='false'
                    keyboardType='default'
                    placeholder='Searching category products'
                    style={{ backgroundColor: 'white', marginStart: 10, marginEnd: 10, width: 300, fontSize: 20 }} />
                <MaterialCommunityIcons name='line-scan' size={30} color='#000' style={{ marginStart: 'auto' }} />
            </View>
            <View style={{ flexDirection: 'column', margin: 10 }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', marginEnd: 'auto' }}>Category</Text>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <TouchableOpacity
                        onPress={() => { setTabStudy(1); setTabClothes(0); setTabHouseware(0) }}
                        style={{ marginEnd: 'auto', borderWidth: 1, borderRadius: 10, borderColor: TabStudy === 1 ? '#FE7E00' : 'grey', backgroundColor: TabStudy === 1 ? '#FE7E00' : 'grey', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>HỌC TẬP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setTabStudy(0); setTabClothes(1); setTabHouseware(0) }}
                        style={{ borderWidth: 1, borderRadius: 10, borderColor: TabClothes === 1 ? '#FE7E00' : 'grey', backgroundColor: TabClothes === 1 ? '#FE7E00' : 'grey', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>QUẦN ÁO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setTabStudy(0); setTabClothes(0); setTabHouseware(1) }}
                        style={{ marginStart: 'auto', borderWidth: 1, borderRadius: 10, borderColor: TabHouseware === 1 ? '#FE7E00' : 'grey', backgroundColor: TabHouseware === 1 ? '#FE7E00' : 'grey', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>GIA DỤNG</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{ fontSize: 19, fontWeight: 'bold', marginEnd: 'auto', marginHorizontal:10}}>Category</Text>
            {TabStudy === 1 ? (
                <ScrollView style={{ flexDirection: 'column', margin: 10 }}>
                    <View style={{ marginVertical: 3, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                            <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Phần Mềm</Text>
                            <Text style={{ fontSize: 17 }}>3 products</Text>
                        </View>
                        <View style={{ marginStart: 'auto', backgroundColor: 'yellow' }}>
                            <Text>Hình ảnh</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 3, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                            <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Phần Cứng</Text>
                            <Text style={{ fontSize: 17 }}>3 products</Text>
                        </View>
                        <View style={{ marginStart: 'auto', backgroundColor: 'yellow' }}>
                            <Text>Hình ảnh</Text>
                        </View>
                    </View>
                </ScrollView>
            ) : ""}
            {TabClothes === 1 ? (
                <ScrollView style={{ flexDirection: 'column', margin: 10 }}>
                    <View style={{ marginVertical: 3, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                            <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Đồ Thể Dục</Text>
                            <Text style={{ fontSize: 17 }}>3 products</Text>
                        </View>
                        <View style={{ marginStart: 'auto', backgroundColor: 'yellow' }}>
                            <Text>ABC</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 3, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                            <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Áo Sơ Mi</Text>
                            <Text style={{ fontSize: 17 }}>3 products</Text>
                        </View>
                        <View style={{ marginStart: 'auto', backgroundColor: 'yellow' }}>
                            <Text>ABC</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 3, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                            <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Giày</Text>
                            <Text style={{ fontSize: 17 }}>3 products</Text>
                        </View>
                        <View style={{ marginStart: 'auto', backgroundColor: 'yellow' }}>
                            <Text>ABC</Text>
                        </View>
                    </View>
                </ScrollView>
            ) : ""}
            {TabHouseware === 1 ? (
                <ScrollView style={{ flexDirection: 'column', margin: 10 }}>
                    <View style={{ marginVertical: 3, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                            <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Bàn</Text>
                            <Text style={{ fontSize: 17 }}>3 products</Text>
                        </View>
                        <View style={{ marginStart: 'auto', backgroundColor: 'yellow' }}>
                            <Text>ABC</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 3, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                            <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Ghế</Text>
                            <Text style={{ fontSize: 17 }}>3 products</Text>
                        </View>
                        <View style={{ marginStart: 'auto', backgroundColor: 'yellow' }}>
                            <Text>ABC</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 3, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                            <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Tủ</Text>
                            <Text style={{ fontSize: 17 }}>3 products</Text>
                        </View>
                        <View style={{ marginStart: 'auto', backgroundColor: 'yellow' }}>
                            <Text>ABC</Text>
                        </View>
                    </View>
                </ScrollView>
            ) : ""}
        </View>
    )
};

export default CategoryMain;