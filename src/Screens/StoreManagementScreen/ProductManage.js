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

const ProductManage = ({navigation}) => {
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', category: 'Category 1', image: require('../../../Img/tdmu_logo.png'), checked: false },
        { id: 2, name: 'Product 2', category: 'Category 2', image: require('../../../Img/tdmu_logo.png'), checked: false },
        // Add more products as needed
    ]);

    const handleSearch = (text) => {
        setSearchText(text);
        // Logic to filter products based on search text
    };

    const handleEditProduct = (productId) => {
        // Logic to navigate to edit product screen
    };

    const handleDeleteProduct = (productId) => {
        // Logic to delete product
    };

    const handleCheckBoxToggle = (productId) => {
        const updatedProducts = products.map((product) => {
            if (product.id === productId) {
                return { ...product, checked: !product.checked };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    return (
        <View style={{ flex: 1, backgroundColor:'#fff', flexDirection:'column'}}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {navigation.goBack()}}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto'}}>
                    <AntDesign name="arrowleft" size={30} color="#FE7E00" />
                </TouchableOpacity>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Quản Lý Sản Phẩm</Text>
                <View style={{ marginStart:'auto'}}></View>
            </View>
            <View style ={{margin:10}}>
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
                    placeholder="Search products"
                />
            </View>
            {products.map((product) => (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc',
                        paddingBottom: 10,
                        marginHorizontal:10
                    }}
                    key={product.id}
                >
                    <CheckBox 
                        style={{marginEnd:'auto'}}
                        checked={product.checked} 
                        onPress={() => handleCheckBoxToggle(product.id)} 
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <Image source={product.image} style={{ width: 50, height: 50, marginRight: 10 }} />
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.name}</Text>
                            <Text style={{ fontSize: 16, color: '#666' }}>{product.category}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <TouchableOpacity 
                            style={{marginEnd:5}}
                            onPress={() => {}}>
                            <FontAwesome5 name='edit' size={25} color='#000' />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{marginStart:5}}
                            onPress={() => {}}>
                            <Ionicons name='trash' size={25} color='#000' />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default ProductManage;
