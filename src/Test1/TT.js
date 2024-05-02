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
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

const TT = () => {

    const [students, setStudents] = useState([
        { id: 1, name: 'Nguyễn Văn A', dob: '01/01/2008' },
        { id: 2, name: 'Trần Thị B', dob: '05/12/2007' },
        { id: 3, name: 'Lê Văn C', dob: '10/08/2008' },
        // Add more students as needed
    ]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleRadioChange = (studentId) => {
        setSelectedStudent(studentId);
    };

    return (
        <View style={{
            flex: 1
        }}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'skyblue',
                    height: 40
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        color: 'black'
                    }}
                >
                    Điểm danh học sinh Lớp 2A
                </Text>
            </View>

            <View>
                {students.map((student) => (
                    <View key={student.id}>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 30
                        }}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 20
                                }}
                            >{student.name}</Text>
                            <View
                                style={{
                                    marginHorizontal: 10
                                }}
                            />
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 20
                                }}
                            >{student.dob}</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Image
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                    resizeMode='stretch'
                                    source={require('./on.png')} />
                                <Image source={require('./off.png')} />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default TT;