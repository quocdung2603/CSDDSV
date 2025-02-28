import React, { useContext, useEffect, useState, useRef } from 'react';
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
    Button,
    FlatList,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
//  
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

import DocumentPicker, { DocumentPickerOptions, DocumentPickerResponse } from 'react-native-document-picker'

const AddProduct = ({ navigation }) => {
    
    const [dataCategory, setDataCategory] = useState([]);
    useEffect(() => {
        const unsubscribe = firestore()
            .collection("Manager")
            .doc("Cate")
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot.exists) {
                    const rawData = documentSnapshot.data().Cate;
                    const formattedData = rawData.map((item, index) => ({
                        label: item,
                        value: (index + 1).toString()
                    }));
                    setDataCategory(formattedData);
                }
            });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    const [fileData, setfileData] = useState(null);
    const [fileRef, setfileRef] = useState('');
    const [fileUrl, setfileUrl] = useState('');

    const chooseFile = async () => {
        try {
            const response = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf],
            });
            console.log(response);
            setfileData(response);
            uploadImage()
        } catch (err) {
            console.log(err);
        }
    };

    const uploadImage = async () => {
        try {
            const response = storage().ref(`/profile/${fileData.name}`);

            const put = await response.putFile(fileData.uri);

            setfileRef(put.metadata.fullPath);
            const url = await response.getDownloadURL();

            setfileUrl(url);

            alert('Image Uploaded Successfully');
        } catch (err) {
            console.log(err);
        }
    };

    const openGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });


        if (result.assets != null || result.didCancel == false) {
            setImagePicked(true);
            if (imageData == null) {
                setImageData(result);
            }
            else if (imageData.assets.length >= 1) {
                imageData.assets.push(result.assets[0]);
            }
        }
    };
    const UpLoadImgProDuct = async () => {

        let temp = []
        imageData.assets.forEach(item => {

            const reference = storage().ref(item.fileName);
            const pathToFile = item.uri;
            reference.putFile(pathToFile);
            const url = storage()
                .ref(item.fileName)
                .getDownloadURL()
                .then(dt => {
                    temp.push(dt);
                    setListIma(temp)
                })

        });
        uppp(listIma);
    };
    const cancelIma = async () => {
        if (imagePicked == true) {
            setImageData([])
            setImagePicked(false)
            setListIma([])
        }
    }

    const uppp = async Img => {
        let userId = await AsyncStorage.getItem('USERID', userId);
        let productId = uuid.v4();
        let PS = ({
            userId: userId,
            idPro: productId,
            title: Title,
            img: Img,
            description: Description,
            time: new Date(),
            rule: false,
            category: dataCategory[category - 1].label
        })

        let t = firestore()
            .collection('Products')
            .doc(userId)
        let check = await t.get()
        if (check.exists) {
            let temp = []
            temp = check._data.post;
            temp.push(PS)
            console.log(temp)
            firestore()
                .collection('Products')
                .doc(userId)
                .set({
                    post: temp
                })
        }
        else {
            let temp = []
            temp.push(PS)
            firestore()
                .collection('Products')
                .doc(userId)
                .set({
                    post: temp,
                })
            // console.log(temp)
        }

        setImagePicked(true);
    }

    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    // camera


    const [imageData, setImageData] = useState(null);
    const [imagePicked, setImagePicked] = useState(false);
    // const [UploadedPicUrl, setUploadedPicUrl] = useState('');
    const [listIma, setListIma] = useState([]);



    const upp = async Img => {
        PS = []
        let userId = await AsyncStorage.getItem('USERID', userId);
        let productId = uuid.v4();
        PS.push({
            idPro: productId,
            title: Title,
            img: Img,
            description: Description,
            time: new Date()
        })
        firestore()
            .collection('Products')
            .doc(userId)
            .set({
                posts: PS,
            })
            .then(() => {
            })
            .catch(error => {
                console.log(error);
            });
        setImagePicked(true);
    };

    // console.log(dataCategory);
    // console.log(dataCategory[category - 1].label)

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === category && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto' }}>
                    <AntDesign name="arrowleft" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Thêm Sản Phẩm</Text>
                <View style={{ marginStart: 'auto' }}>
                </View>
            </View>
            <View style={{ flexDirection: 'column', margin: 10 }}>
                <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Tên:</Text>
                    <TextInput
                        value={Title}
                        onChangeText={item => { setTitle(item) }}
                        autoComplete='false'
                        keyboardType='default'
                        style={{ borderBottomWidth: 1, marginStart: 'auto', width: 250, maxHeight: 35 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Danh Mục:</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={dataCategory}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Danh Mục"
                        searchPlaceholder="Search..."
                        value={category}
                        onChange={item => {
                            setCategory(item.value);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                        )}
                        renderItem={renderItem}
                    />
                </View>
                {/* <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Phân Loại:</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={category === "1" ? dataTypeStudy : dataTypeHouseware}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Phân Loại"
                        searchPlaceholder="Search..."
                        value={TypeProduct}
                        onChange={item => {
                            setCategory(item.value);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                        )}
                        renderItem={renderItem}
                    />
                </View> */}
                <View style={{ flexDirection: 'column', margin: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Mô Tả:</Text>
                    <View style={{ borderWidth: 1, borderRadius: 10, height: 200, flexDirection: 'row', marginVertical: 10 }}>
                        <TextInput
                            value={Description}
                            onChangeText={item => { setDescription(item) }}
                            autoComplete='false'
                            keyboardType='default'
                            multiline
                            style={{ borderBottomWidth: 1, marginStart: 'auto', flex: 1 }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Hình ảnh, video minh họa:</Text>
                    <View style={{ flexDirection: 'row', marginHorizontal: 5, borderWidth: 1, width: 'auto' }}>
                        <TouchableOpacity
                            onPress={() => {
                                openGallery();
                            }}
                        >
                            <AntDesign name='pluscircleo' size={25} color={'black'} style={{ backgroundColor: '#ff6666', borderRadius: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>File mềm</Text>
                    <View style={{ flexDirection: 'row', marginHorizontal: 5, borderWidth: 1, width: 'auto' }}>
                        <TouchableOpacity
                            onPress={() => { chooseFile() }}
                        >
                            <AntDesign name='pluscircleo' size={25} color={'black'} style={{ backgroundColor: '#ff6666', borderRadius: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 1, borderRadius: 10, width: 100, height: 100, marginHorizontal: 5 }}>
                        <View style={{ margin: 5, marginStart: 'auto' }}>
                            <AntDesign name="closecircle" size={20} color="red" />
                            <Image />
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop: 30, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{ width: 100, borderWidth: 1, alignItems: 'center', borderRadius: 20 }}
                        onPress={() => {
                            UpLoadImgProDuct();
                            // chooseFile();
                        }}
                    >
                        <Text style={{ color: '#000', fontSize: 20 }}>
                            Upload
                        </Text>
                    </TouchableOpacity>
                    {imagePicked === true ? (
                        <TouchableOpacity

                            style={{ width: 100, alignItems: 'center', borderRadius: 20, backgroundColor: 'red' }}
                            onPress={() => {
                                cancelIma();
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity

                            style={{ width: 100, alignItems: 'center', borderRadius: 20, backgroundColor: 'pink' }}
                            onPress={() => {
                                cancelIma();
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    )
}

export default AddProduct;

const styles = StyleSheet.create({
    contentView: {
        width: 320,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 20
    },
    circle: {
        width: 50,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#7F3DFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    },
    number: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center'
    },
    dropdown: {
        //margin: 10,
        height: 50,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 10,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});