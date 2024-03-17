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
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Home from '../../Screens/HomeScreen/Home';
import Personal from '../../Screens/PersonalScreen/Personal';
import Forum from '../../Screens/ForumScreen/Forum'
import WishList from '../../Screens/WishListScreen/WishList';
import CategoryMain from '../../Screens/CategoriesScreen/CategoryMain';

const Tabbar = () => {
    const [selectTab, setSelectTab] = useState(1);
    return (
        <View style={{ flex: 1 }}>
            {
                selectTab === 1 ? (<Home />) :
                    selectTab === 2 ? (<CategoryMain />) :
                        selectTab === 3 ? (<Forum />) :
                            selectTab === 4 ? (<WishList />) :
                                (<Personal />)
            }

            <View style={{
                borderWidth: 1,
                position: 'absolute',
                bottom: 0,
                height: 60,
                width: 'auto',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                marginHorizontal: 20,
            }}>
                <TouchableOpacity
                    style={{
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        setSelectTab(1);
                    }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#f2f2f2',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}>
                        <AntDesign
                            name='home'
                            size={30}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        setSelectTab(2);
                    }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#f2f2f2',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}>
                        <AntDesign
                            name='shoppingcart'
                            size={30}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        setSelectTab(3);
                    }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#f2f2f2',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}>
                        <MaterialCommunityIcons
                            name='forum'
                            size={30}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        setSelectTab(4);
                    }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#f2f2f2',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}>
                        <AntDesign
                        name='inbox'
                        size={30}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        setSelectTab(5);
                    }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#f2f2f2',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}>
                        <AntDesign
                            name='user'
                            size={30}
                        />
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Tabbar;