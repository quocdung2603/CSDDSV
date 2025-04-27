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
    FlatList
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
let userId = ""
import uuid from 'react-native-uuid'

const ManagerCategory = ({ navigation }) => {
    const [listCate, setListCate] = useState()
    const [nameCate, setNameCate] = useState("")

    useEffect(() => {
        firestore()
            .collection('Manager')
            .get()
            .then(data => {
                setListCate(data._docs[0]._data.Cate)
                // console.log(data._docs[0]._data.Cate)
            })
    }, [listCate])

    const addCate = async () => {
        let found = false;

        for (let i = 0; i < listCate.length; i++) {
            if (listCate[i] == nameCate) {
                found = true;
                break;
            }
        }

        if (found == false) {
            listCate.push(nameCate)
            firestore()
                .collection('Manager')
                .doc('Cate')
                .set({
                    Cate: listCate,
                })
                .then(() => {
                    console.log('Add cate Sussces');
                });
        }
    }

    function removeStringFromArray(array, stringToRemove) {
        return array.filter(item => item !== stringToRemove);
    }

    const delCate = async (temp) => {
        let tt = removeStringFromArray(listCate, temp)

        await firestore()
            .collection('Manager')
            .doc('Cate')
            .set({
                Cate: tt,
            })
            .then(() => {
            });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8F0' }}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    Quản lý danh mục sản phẩm
                </Text>
            </View>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder='Thêm danh mục'
                    placeholderTextColor="#BDBDBD"
                    onChangeText={setNameCate}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={addCate}
                    activeOpacity={0.7}
                >
                    <Icon name="plus" size={22} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={listCate}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <View style={styles.cateItem}>
                            <Text style={styles.cateText}>{item}</Text>
                            <TouchableOpacity
                                style={styles.delButton}
                                onPress={() => delCate(item)}
                                activeOpacity={0.7}
                            >
                                <Icon name="minus" size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Chưa có danh mục nào</Text>
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default ManagerCategory;

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
    headerContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FCAC12',
        letterSpacing: 1,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        width: '90%',
    },
    input: {
        flex: 1,
        borderColor: '#FCAC12',
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#FFF',
        marginRight: 10,
        shadowColor: '#FCAC12',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    addButton: {
        backgroundColor: '#FCAC12',
        borderRadius: 12,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FCAC12',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    listContainer: {
        flex: 1,
        marginHorizontal: '5%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#FCAC12',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    cateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: '#FFF7E6',
        borderRadius: 10,
    },
    cateText: {
        color: '#333',
        fontSize: 18,
        fontWeight: '500',
        flex: 1,
    },
    delButton: {
        backgroundColor: '#FF6B6B',
        borderRadius: 8,
        padding: 8,
        marginLeft: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 10,
    },
    emptyText: {
        textAlign: 'center',
        color: '#BDBDBD',
        fontSize: 16,
        marginTop: 30,
    },
});