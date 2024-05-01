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
    FlatList,
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
import RNFetchBlob from 'rn-fetch-blob';
const FakeFile = ({ navigation }) => {

    const [downloading, setDownloading] = useState(false);
    const [namefile, setnamefile] = useState('triethoc.pdf')
    const downloadFile = async () => {
        setDownloading(true);
        try {
            // console.log(namefile, 132)
            const url = await storage()
                .refFromURL('https://firebasestorage.googleapis.com/v0/b/csddsv-815bd.appspot.com/o/TKPM_BTTH03_2.pdf?alt=media&token=df410297-70fb-4a5e-80a5-334f48102468')
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

    return (
        <View style={{
            flex: 1
        }}>
            <View
                style={{
                    backgroundColor: 'skyblue',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 35
                }}
            >
                <Text style={{
                    color: 'black',
                    fontSize: 20,
                    textAlign: 'center',
                    // marginTop: 10
                }}>
                    Danh sách tài liệu
                </Text>
            </View>
            <View
                style={{
                    marginTop: 10,
                    borderWidth: 1,
                }}
            >
                <TouchableOpacity
                    style={{
                        height: 40
                    }}
                    onPress={() => {
                        setnamefile('triethoc.pdf')
                        downloadFile()
                    }}
                >
                    <Text style={{
                        color: 'black',
                        fontSize: 20,
                        textAlign: 'center',
                        // marginTop: 10
                    }}>
                        triết học
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    borderWidth: 1,
                    marginTop: 5
                }}
            >
                <TouchableOpacity
                    style={{
                        height: 40
                    }}
                    onPress={() => {
                        setnamefile('cnpm.pdf')
                        downloadFile()
                    }}
                >
                    <Text style={{
                        color: 'black',
                        fontSize: 20,
                        textAlign: 'center',
                        // marginTop: 10
                    }}>
                        Công nghệ phần mềm
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    borderWidth: 1,
                    marginTop: 5
                }}
            >
                <TouchableOpacity
                    style={{
                        height: 40
                    }}
                    onPress={() => {
                        setnamefile('ktlt.pdf')
                        downloadFile()
                    }}
                >
                    <Text style={{
                        color: 'black',
                        fontSize: 20,
                        textAlign: 'center',
                        // marginTop: 10
                    }}>
                        KTLT
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default FakeFile;