import React, { useEffect, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

const DetailProduct = ({ route, navigation }) => {
    const { item } = route.params;

    // State
    const [getId, setGetId] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            let userId = await AsyncStorage.getItem('USERID');
            setGetId(userId);
            setIsLoading(false);
        };
        fetchUser();
    }, []);

    const goToChat = async () => {
        let userIdd = await AsyncStorage.getItem('USERID');
        if (userIdd) {
            navigation.navigate('Chat', { item, userIdd });
        } else {
            Alert.alert("Error", "User ID not found");
        }
    };

    const [downloading, setDownloading] = useState(false);
    const [namefile, setNamefile] = useState('triethoc.pdf');

    const downloadFile = async (link) => {
        setDownloading(true);
        try {
            console.log("Downloading file from:", item.link);
            console.log(link)
            const url = await storage()
                .refFromURL(link.toString())
                .getDownloadURL()

            // Tạo thư mục để lưu trữ tệp đã tải xuống
            const dirs = RNFetchBlob.fs.dirs;
            const path = `${dirs.DownloadDir}/` + `${namefile}`

            // Tải tệp từ URL và lưu vào thư mục đã tạo
            await RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path,
                    description: 'Downloading file.',
                },
            }).fetch('GET', url);

            console.log('File downloaded successfully!');
        } catch (error) {
            console.error('Error downloading file:', error);
        } finally {
            setDownloading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    let randomIma = "default_image_url";
    if (Array.isArray(item.img) && item.img.length > 0) {
        randomIma = item.img[Math.floor(Math.random() * item.img.length)];
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
            {
                item.category !== "Học mềm" ?
                    <>
                        <View style={{ flexDirection: 'column', borderWidth: 1 }}>
                            <ImageBackground
                                source={{ uri: randomIma }}
                                style={{ height: 300 }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto', margin: 10, marginBottom: 'auto' }}
                                        onPress={() => navigation.goBack()}
                                    >
                                        <AntDesign name="arrowleft" size={30} color="#000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginBottom: 'auto', margin: 10 }}
                                    >
                                        <Ionicons name='cart' size={30} color='#000' />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 180, marginBottom: 10 }}>
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginBottom: 'auto', margin: 10 }}
                                    >
                                        <Ionicons name="bookmark" size={30} color="#0AC9BD" />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </View>
                        <ScrollView>
                            <View style={{ flexDirection: 'row', margin: 10, padding: 10, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>{item.title}</Text>
                                </View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>$100</Text>
                            </View>
                            <View style={{ margin: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                            <View style={{ flexDirection: 'column', margin: 10 }}>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>Description</Text>
                                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                                    <Text style={{ fontSize: 15, color: 'grey' }}>{item.description}</Text>
                                </View>
                            </View>
                            <View style={{ margin: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                        </ScrollView>
                        {
                            getId && getId === item.userId ?
                                <View style={{ marginTop: 'auto', borderWidth: 1, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', padding: 10 }}>Món hàng này là của bạn</Text>
                                </View>
                                :
                                <TouchableOpacity style={{ marginTop: 'auto', borderWidth: 1, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {

                                    }}
                                >
                                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', padding: 10 }}>Liên hệ người bán</Text>
                                </TouchableOpacity>
                        }
                    </>
                    :
                    <>
                        {/* Logic xử lý riêng nếu category là "Học mềm" */}
                        <ScrollView>
                            <View style={{ flexDirection: 'row', margin: 10, padding: 10, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'column', marginEnd: 'auto' }}>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>{item.title}</Text>
                                </View>
                            </View>
                            <View style={{ margin: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                            <View style={{ flexDirection: 'column', margin: 10 }}>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>Description</Text>
                                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                                    <Text style={{ fontSize: 15, color: 'grey' }}>{item.link}</Text>
                                </View>
                            </View>
                            <View style={{ margin: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                        </ScrollView>


                        <TouchableOpacity style={{ marginTop: 'auto', borderWidth: 1, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                setNamefile('triethoc.pdf')
                                downloadFile(item.link)
                            }}
                        >
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', padding: 10 }}>Tải file</Text>
                        </TouchableOpacity>

                    </>
            }
        </View>
    );
};

export default DetailProduct;
