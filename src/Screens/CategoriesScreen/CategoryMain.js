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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore, { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListCate from './Component/ListCate';
import ListCateSoft from './Component/ListCateSoft';
import { FlatList } from 'react-native-gesture-handler';


const CategoryMain = ({ navigation }) => {

    const [SearchBox, setSearchBox] = useState("");
    const [TabStudy, setTabStudy] = useState(1);
    const [TabClothes, setTabClothes] = useState(0);
    const [TabHouseware, setTabHouseware] = useState(0);
    const [dataCate, setDataCate] = useState()

    useEffect(() => {

        const reLoadCate = firestore()
            .collection("Manager")
            .onSnapshot(snap => {
                snap.forEach(doc => {
                    setDataCate(doc.data().Cate)
                })
            })
        return () => reLoadCate()

    }, [])
    // console.log(dataCate, 213)
    const [dataPro, setDataPro] = useState()

    useEffect(() => {
        const reLoadProduct = firestore()
            .collection("Products")
            .onSnapshot(snap => {
                const tempData = []
                snap.forEach(doc => {
                    const tempItem = (doc.data().post) || []
                    tempItem.forEach(element => {
                        tempData.push(element)
                    });
                });
                setDataPro(tempData)
            });
        // tempData = []
        return () => reLoadProduct()
    }, [])

    // console.log(dataPro, 123)
    const [mainClothes, setMainClothes] = useState([]);
    const [mainOthers, setMainOthers] = useState([]);
    const [softLearning, setSoftLearning] = useState([]);
    const [hardLearning, setHardLearning] = useState([]);

    let clothesMap = new Map();
    let otherMap = new Map();
    let softLearningMap = new Map();
    let hardLearningMap = new Map();

    const classify = async () => {
        let keywordsClothes = ["quần", "áo", "thể"];
        let keywordsSoftLearning = ["học mềm"];
        let keywordsHardLearning = ["học cứng"];

        dataCate.forEach(item => {
            let words = item.split(" ").map(word => word.toLowerCase());
            let foundClothes = false;
            let foundSoft = false;
            let foundHard = false;

            // Kiểm tra từ khóa quần áo
            for (let word of words) {
                for (let keyword of keywordsClothes) {
                    if (word === keyword) {
                        clothesMap.set(item, true);
                        foundClothes = true;
                        break;
                    }
                }
                if (foundClothes) break;
            }

            // Kiểm tra từ khóa học mềm
            for (let keyword of keywordsSoftLearning) {
                if (item.toLowerCase().includes(keyword)) {
                    softLearningMap.set(item, true);
                    foundSoft = true;
                    break;
                }
            }

            // Kiểm tra từ khóa học cứng
            for (let keyword of keywordsHardLearning) {
                if (item.toLowerCase().includes(keyword)) {
                    hardLearningMap.set(item, true);
                    foundHard = true;
                    break;
                }
            }

            // Thêm vào Others nếu không thuộc học mềm, học cứng, hoặc quần áo
            if (!foundClothes && !foundSoft && !foundHard) {
                otherMap.set(item, true);
            }
        });

        setMainClothes([...clothesMap.keys()]);
        setMainOthers([...otherMap.keys()]);
        setSoftLearning([...softLearningMap.keys()]);
        setHardLearning([...hardLearningMap.keys()]);
    };

    useEffect(() => {
        classify()
    }, [dataCate])

    const getUserId = async () => {
        userId = await AsyncStorage.getItem('USERID', userId);

    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Header */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
            }}>
                <Text style={{ fontSize: 20, color: '#FE7E00', fontWeight: 'bold' }}>Danh mục</Text>
                <TouchableOpacity>
                    <Ionicons name="notifications" size={24} color="#FE7E00" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                margin: 15,
                paddingHorizontal: 15,
                borderRadius: 10,
            }}>
                <Ionicons name="search" size={20} color="#666" style={{ marginRight: 10 }} />
                <TextInput
                    value={SearchBox}
                    onChangeText={item => setSearchBox(item)}
                    autoComplete='false'
                    keyboardType='default'
                    placeholder='Tìm kiếm danh mục sản phẩm...'
                    placeholderTextColor="#aaa"
                    style={{ flex: 1, height: 40, fontSize: 16, color: '#222' }}
                />
            </View>

            {/* Tabs */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 15, marginBottom: 10 }}>
                <TouchableOpacity
                    onPress={() => { setTabStudy(1); setTabClothes(0); setTabHouseware(0) }}
                    style={{
                        flex: 1,
                        marginHorizontal: 5,
                        borderRadius: 10,
                        backgroundColor: TabStudy === 1 ? '#FE7E00' : '#f5f5f5',
                        paddingVertical: 12,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 2,
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TabStudy === 1 ? '#fff' : '#222' }}>HỌC TẬP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setTabStudy(0); setTabClothes(1); setTabHouseware(0) }}
                    style={{
                        flex: 1,
                        marginHorizontal: 5,
                        borderRadius: 10,
                        backgroundColor: TabClothes === 1 ? '#FE7E00' : '#f5f5f5',
                        paddingVertical: 12,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 2,
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TabClothes === 1 ? '#fff' : '#222' }}>QUẦN ÁO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setTabStudy(0); setTabClothes(0); setTabHouseware(1) }}
                    style={{
                        flex: 1,
                        marginHorizontal: 5,
                        borderRadius: 10,
                        backgroundColor: TabHouseware === 1 ? '#FE7E00' : '#f5f5f5',
                        paddingVertical: 12,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 2,
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TabHouseware === 1 ? '#fff' : '#222' }}>GIA DỤNG</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FE7E00', marginHorizontal: 15, marginBottom: 5 }}>Danh mục</Text>
            {
                dataPro == null ?
                    <Text style={{ margin: 15, color: '#888' }}>Đang tải...</Text>
                    :
                    <>
                        {TabStudy === 1 ? (
                            <ScrollView style={{ marginHorizontal: 15 }}>
                                {/* Học cứng */}
                                <TouchableOpacity style={{
                                    marginVertical: 6,
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderColor: '#eee',
                                    borderRadius: 10,
                                    padding: 15,
                                    backgroundColor: '#fff',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 2,
                                    elevation: 1,
                                }}>
                                    <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                                        <Text style={{ fontSize: 18, color: '#FE7E00', fontWeight: 'bold' }}>Học Cứng</Text>
                                        <Text style={{ fontSize: 15, color: '#888' }}>3 sản phẩm</Text>
                                    </View>
                                </TouchableOpacity>
                                <ListCateSoft data={softLearning} product={dataPro} navigation={navigation} />
                            </ScrollView>
                        ) : null}
                        {TabClothes === 1 ? (
                            <ScrollView style={{ marginHorizontal: 15 }}>
                                {
                                    mainClothes && <FlatList
                                        data={mainClothes}
                                        renderItem={({ item }) => (
                                            <View style={{
                                                marginVertical: 6,
                                                borderWidth: 1,
                                                borderColor: '#eee',
                                                borderRadius: 10,
                                                backgroundColor: '#fff',
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.05,
                                                shadowRadius: 2,
                                                elevation: 1,
                                            }}>
                                                <ListCate data={item} product={dataPro} navigation={navigation} />
                                            </View>
                                        )}
                                    />
                                }
                            </ScrollView>
                        ) : null}
                        {TabHouseware === 1 ? (
                            <FlatList
                                data={mainOthers}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={{
                                        marginVertical: 6,
                                        borderWidth: 1,
                                        borderColor: '#eee',
                                        borderRadius: 10,
                                        backgroundColor: '#fff',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.05,
                                        shadowRadius: 2,
                                        elevation: 1,
                                    }}>
                                        <ListCate data={item} product={dataPro} navigation={navigation} />
                                    </View>
                                )}
                                contentContainerStyle={{ marginHorizontal: 15 }}
                            />
                        ) : null}
                    </>
            }
        </SafeAreaView>
    )
};

export default CategoryMain;