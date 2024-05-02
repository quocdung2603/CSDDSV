import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const TT1 = () => {
    const [students, setStudents] = useState([
        { id: 1, name: 'Nguyễn Văn A', class: '10A' },
        { id: 2, name: 'Trần Thị B', class: '10B' },
        { id: 3, name: 'Lê Văn C', class: '10C' },
        // Add more students as needed
    ]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    const handleStudentChange = (value) => {
        setSelectedStudent(value);
    };

    const handleClassChange = (value) => {
        setSelectedClass(value);
    };

    const transferStudent = () => {
        if (!selectedStudent || !selectedClass) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên học sinh và lớp mới');
            return;
        }

        // Perform transfer logic here
        const updatedStudents = students.map((student) =>
            student.name === selectedStudent ? { ...student, class: selectedClass } : student
        );
        setStudents(updatedStudents);
        setSelectedStudent('');
        setSelectedClass('');
        Alert.alert('Thành công', 'Học sinh đã được chuyển lớp thành công');
    };

    return (
        <View style={{ padding: 20 }}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color: 'black',
                        fontSize: 20
                    }}
                >
                    Chuyển lớp cho học sinh
                </Text>
            </View>
            <TextInput
                placeholder="Nhập tên học sinh"
                value={selectedStudent}
                onChangeText={handleStudentChange}
                style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
            />
            <Text
                style={{
                    color: 'black',
                    fontSize: 15
                }}
            >
                Nhập tên lớp cũ
            </Text>
            <TextInput
                placeholder="Nhập tên lớp cũ"
                value={selectedClass}
                onChangeText={handleClassChange}
                style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
            />
            <Text
                style={{
                    color: 'black',
                    fontSize: 15
                }}
            >
                Nhập tên lớp mới
            </Text>
            <TextInput
                placeholder="Nhập tên lớp mới"
                style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
            />
            <TouchableOpacity
                onPress={transferStudent}
                style={{
                    backgroundColor: '#007bff',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Chuyển lớp</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TT1;
