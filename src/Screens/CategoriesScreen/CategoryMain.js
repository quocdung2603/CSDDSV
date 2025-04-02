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
        <View style={{ flexDirection: 'column', backgroundColor: '#fff', flex: 1 }}>

            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: 'red', fontWeight: 'bold' }}>ABC</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('IndexChat')
                    }}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginRight: 5 }}>
                    <AntDesign name='pluscircleo' size={30} color='#000' />
                </TouchableOpacity>
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

            <Text style={{ fontSize: 19, fontWeight: 'bold', marginEnd: 'auto', marginHorizontal: 10 }}>Category</Text>

            {
                dataPro == null ?
                    <>
                        <Text>Loading...</Text>
                    </>
                    :
                    <>
                        {TabStudy === 1 ? (
                            <ScrollView style={{ flexDirection: 'column', margin: 10 }}>

                                <TouchableOpacity style={{ marginVertical: 3, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 10 }}
                                    onPress={() => {

                                    }}
                                >
                                    <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                                        <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Học Cứng</Text>
                                        <Text style={{ fontSize: 17 }}>3 products</Text>
                                    </View>
                                    <View style={{ marginStart: 'auto', backgroundColor: 'yellow' }}>
                                        <Text>Hình ảnh</Text>
                                    </View>
                                </TouchableOpacity>

                                <ListCateSoft data={softLearning} product={dataPro} navigation={navigation} />

                            </ScrollView>
                        ) : ""}
                        {TabClothes === 1 ? (
                            <ScrollView style={{ flexDirection: 'column', margin: 10 }}>
                                {
                                    mainClothes && <FlatList
                                        data={mainClothes}
                                        renderItem={({ item }) => {
                                            return <>
                                                <ListCate data={item} product={dataPro} navigation={navigation} />
                                            </>
                                        }}

                                    />
                                }
                            </ScrollView>
                        ) : ""}
                        {TabHouseware === 1 ? (
                            <FlatList
                                data={mainOthers}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <ListCate data={item} product={dataPro} navigation={navigation} />
                                )}
                                contentContainerStyle={{ margin: 10 }}
                            />

                        ) : ""}
                    </>
            }
        </View>
    )
};

export default CategoryMain;