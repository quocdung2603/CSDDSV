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
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const TransactionManage = () => {
    const [searchText, setSearchText] = useState('');
    const [transactions, setTransactions] = useState([
        { id: 1, code: 'TRX001', date: '2024-03-17', status: 'Completed', checked: false },
        { id: 2, code: 'TRX002', date: '2024-03-16', status: 'Pending', checked: false },
        // Add more transactions as needed
    ]);

    const handleSearch = (text) => {
        setSearchText(text);
        // Logic to filter transactions based on search text
    };

    const handleViewDetails = (transactionId) => {
        // Logic to navigate to transaction details screen
    };

    const handleCheckBoxToggle = (transactionId) => {
        const updatedTransactions = transactions.map((transaction) => {
            if (transaction.id === transactionId) {
                return { ...transaction, checked: !transaction.checked };
            }
            return transaction;
        });
        setTransactions(updatedTransactions);
    };

    return (
        <View style={{ flex: 1, flexDirection:'column', backgroundColor:'#fff'}}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto'}}>
                    <AntDesign name="arrowleft" size={30} color="#000" />
                </View>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Quản Lý Giao Dịch</Text>
                <View style={{ marginStart:'auto'}}></View>
            </View>
            <View style={{margin:10}}>
                <TextInput
                    style={{
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        marginBottom: 20,
                    }}
                    value={searchText}
                    onChangeText={handleSearch}
                    placeholder="Search transactions"
                />
            </View>
            {transactions.map((transaction) => (
                <View
                    key={transaction.id}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc',
                        paddingBottom: 10,
                        marginHorizontal:10
                    }}
                >
                    <CheckBox
                        checked={transaction.checked}
                        onPress={() => handleCheckBoxToggle(transaction.id)}
                    />
                    <View style={{ flex: 1, flexDirection:'row'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginEnd:'auto'}}>{transaction.code}</Text>
                        <Text style={{ fontSize: 16, color: '#666'}}>{transaction.date}</Text>
                        <Text style={{ fontSize: 16, color: 'green', marginStart:'auto', marginEnd:20}}>{transaction.status}</Text>
                    </View>
                    <TouchableOpacity 
                        style={{marginStart:'auto'}}
                        onPress={() => {}}>
                        <AntDesign name='eye' size={25} color='#000' />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

export default TransactionManage;