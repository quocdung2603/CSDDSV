import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

const Index = () => {

    useEffect(() => {
        GetData()
    }, [])

    const GetData = async () => {
        await firestore()
            .collection('Stu')
            .get()
            .then(dt => {
                console.log(dt);
            })
    }


    const [listStu, setlistStu] = useState()

    const [studentName, setStudentName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState(false);
    const [address, setAddress] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [score, setScore] = useState('');

    const handleSubmit = () => {
        // if (!studentName || !dateOfBirth || !address || !selectedClass || !score) {
        //     alert('Nhập tên dưới dạng chữ.');
        //     return;
        // }
        // console.log('Student Name:', studentName);
        // console.log('Date of Birth:', dateOfBirth);
        // console.log('Gender:', gender ? 'Female' : 'Male');
        // console.log('Address:', address);
        // console.log('Selected Class:', selectedClass);
        // console.log('Score:', score);
        SetStu()
    };
    const SetStu = async () => {
        let code = uuid.v1()
        let doitt = await firestore()
            .collection('Stu')
            .doc(selectedClass)
            .get()
        console.log(doitt)
        tempp = doitt._data.stu
        temp = ({
            ms: code,
            name: studentName,
            date: dateOfBirth,
            sex: gender,
            address: address,
            class: selectedClass,
            score: score,
        })
        tempp.push(temp)
        let doit = await firestore()
            .collection('Stu')
            .doc(selectedClass)
            .set({
                stu: tempp
            });
    }
    return (
        <View style={styles.container}>
            <View
                style={{
                    marginBottom: 30,
                }}
            >
                <Text
                    style={{
                        color: 'black',
                        fontSize: 16,
                        textAlign: 'center',
                        fontWeight: 600,
                    }}
                >
                    Các BÀ MẸ vui lòng nhập thông tin cho học sinh
                </Text>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={setStudentName}
                value={studentName}
                placeholder="Tên học sinh"
            />
            <TextInput
                style={styles.input}
                onChangeText={setDateOfBirth}
                value={dateOfBirth}
                placeholder="Ngày sinh"
            />
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={gender}
                    onValueChange={setGender}
                />
                <Text style={styles.label}>Nữ</Text>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={setAddress}
                value={address}
                placeholder="Địa chỉ"
            />
            <Picker
                selectedValue={selectedClass}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedClass(itemValue)
                }>
                <Picker.Item label="Chọn lớp" value="" />
                <Picker.Item label="Lớp 1" value="Lớp 1" />
                <Picker.Item label="Lớp 2" value="Lớp 2" />
            </Picker>
            <TextInput
                style={styles.input}
                onChangeText={setScore}
                value={score}
                placeholder="Điểm"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <FontAwesome5 name="paper-plane" size={20} color="white" />
                <Text style={styles.buttonText}> Gửi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}> Danh sách sinh viên</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        marginLeft: 8,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Index;
