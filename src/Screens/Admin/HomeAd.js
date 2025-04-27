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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

const HomeAd = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>QUẢN LÝ HỆ THỐNG</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quản lý người dùng</Text>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('ManagerUser')}>
                            <View style={styles.cardContent}>
                                <Ionicons name="people-outline" size={30} color="#FCBB3C" />
                                <Text style={styles.cardTitle}>Quản lý người dùng</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('ManagerRegis')}>
                            <View style={styles.cardContent}>
                                <MaterialCommunityIcons name="store-outline" size={30} color="#FCBB3C" />
                                <Text style={styles.cardTitle}>Quản lý đăng ký cửa hàng</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quản lý sản phẩm</Text>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('ManagerPro')}>
                            <View style={styles.cardContent}>
                                <Ionicons name="cube-outline" size={30} color="#FCBB3C" />
                                <Text style={styles.cardTitle}>Quản lý sản phẩm</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('ManagerCategory')}>
                            <View style={styles.cardContent}>
                                <MaterialCommunityIcons name="shape-outline" size={30} color="#FCBB3C" />
                                <Text style={styles.cardTitle}>Quản lý danh mục</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quản lý đơn hàng</Text>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('ManagerOrder')}>
                            <View style={styles.cardContent}>
                                <Ionicons name="cart-outline" size={30} color="#FCBB3C" />
                                <Text style={styles.cardTitle}>Quản lý đơn hàng</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FCBB3C',
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: {
        alignItems: 'center',
    },
    cardTitle: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
});

export default HomeAd;