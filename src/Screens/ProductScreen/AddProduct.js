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

import DocumentPicker from 'react-native-document-picker';

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
        await requestDocumentPermission();
        try {
            const response = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf],
                copyTo: 'cachesDirectory'
            });
            setfileData(response);
            // uploadFile(); cái này khi bấm nút okey mới được chạy
        } catch (err) {
            console.log(err);
        }
    };

    const requestDocumentPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Document Permission",
                    message: "App needs access to your documents",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the document");
            } else {
                console.log("Document permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const uploadFile = async () => {
        try {
            const response = storage().ref(`${fileData.name}`);
            const put = await response.putFile(fileData.fileCopyUri); // Sử dụng fileCopyUri thay vì uri
            setfileRef(put.metadata.fullPath);
            const url = await response.getDownloadURL();
            await upload(url)
            // console.log(url);
            setfileUrl(url);
            alert('Tải file mềm thành công');
        } catch (err) {
            console.log(err);
        }
    };

    const upload = async (url) => {

        let userId = await AsyncStorage.getItem('USERID', userId);
        let productId = uuid.v4();

        let PS = ({
            userId: userId,
            idPro: productId,
            title: Title,
            link: url,
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
            // console.log(temp)
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
        }
    }

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
    const [typeCate, setTypeCate] = useState(0)
    // 0 la các cate bình thường
    // 1 là các cate liên quan học tập
    useEffect(() => {
        checkCate()
    }, [category])

    const checkCate = () => {
        const selectedCategory = dataCategory[category - 1]?.label;
        const isStudyCategory = selectedCategory === "Học mềm";

        setTypeCate(isStudyCategory ? 1 : 0);
        // console.log(isStudyCategory ? 1 : 0);
    };
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
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FE7E00" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thêm Sản Phẩm</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tên sản phẩm</Text>
                    <TextInput
                        value={Title}
                        onChangeText={item => { setTitle(item) }}
                        autoComplete='false'
                        keyboardType='default'
                        style={styles.textInput}
                        placeholder="Nhập tên sản phẩm"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Danh mục</Text>
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
                        placeholder="Chọn danh mục"
                        searchPlaceholder="Tìm kiếm..."
                        value={category}
                        onChange={item => {
                            setCategory(item.value);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign style={styles.icon} color="#FE7E00" name="Safety" size={20} />
                        )}
                        renderItem={renderItem}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mô tả</Text>
                    <View style={styles.descriptionContainer}>
                        <TextInput
                            value={Description}
                            onChangeText={item => { setDescription(item) }}
                            autoComplete='false'
                            keyboardType='default'
                            multiline
                            style={styles.descriptionInput}
                            placeholder="Nhập mô tả sản phẩm"
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>

                <View style={styles.mediaContainer}>
                    {typeCate == 1 ? (
                        <>
                            <Text style={styles.label}>File mềm</Text>
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={() => { chooseFile() }}
                            >
                                <AntDesign name='pluscircleo' size={24} color='#FE7E00' />
                                <Text style={styles.uploadText}>Chọn file</Text>
                            </TouchableOpacity>
                            {fileData && (
                                <View style={styles.filePreview}>
                                    <Text style={styles.fileName}>{fileData.name}</Text>
                                </View>
                            )}
                        </>
                    ) : (
                        <>
                            <Text style={styles.label}>Hình ảnh minh họa</Text>
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={() => { openGallery(); }}
                            >
                                <AntDesign name='pluscircleo' size={24} color='#FE7E00' />
                                <Text style={styles.uploadText}>Chọn ảnh</Text>
                            </TouchableOpacity>
                            {imageData && imageData.assets && (
                                <View style={styles.imagePreviewContainer}>
                                    {imageData.assets.map((image, index) => (
                                        <View key={index} style={styles.imagePreview}>
                                            <Image
                                                source={{ uri: image.uri }}
                                                style={styles.previewImage}
                                            />
                                            <TouchableOpacity
                                                style={styles.removeImage}
                                                onPress={() => {
                                                    const newAssets = imageData.assets.filter((_, i) => i !== index);
                                                    setImageData({ ...imageData, assets: newAssets });
                                                }}
                                            >
                                                <AntDesign name="closecircle" size={20} color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => { cancelIma(); }}
                    >
                        <Text style={styles.buttonText}>Hủy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.uploadButton]}
                        onPress={() => {
                            typeCate == 1 ? uploadFile() : UpLoadImgProDuct();
                        }}
                    >
                        <Text style={[styles.buttonText, styles.uploadButtonText]}>
                            {typeCate == 1 ? 'Tải lên file' : 'Tải lên ảnh'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

export default AddProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        flex: 1,
        padding: 15,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    descriptionContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        minHeight: 120,
    },
    descriptionInput: {
        padding: 12,
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'top',
    },
    dropdown: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#999',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#333',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    mediaContainer: {
        marginBottom: 20,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#FE7E00',
        borderRadius: 8,
    },
    uploadText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#FE7E00',
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    imagePreview: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 8,
        overflow: 'hidden',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    removeImage: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    filePreview: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    fileName: {
        fontSize: 14,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 30,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#FE7E00',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    uploadButtonText: {
        color: '#FE7E00',
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
    icon: {
        marginRight: 10,
    },
});