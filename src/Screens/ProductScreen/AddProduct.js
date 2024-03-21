import React, { useContext, useEffect, useState, useRef } from 'react';
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
    Button
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
//  
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const dataCategory = [
    { label: 'Học Tập', value: '1' },
    { label: 'Gia Dụng', value: '2' },
];
const dataTypeStudy = [
    { label: 'Phần Mềm', value: '1' },
    { label: 'Phần Cứng', value: '2' },
];
const dataTypeHouseware = [
    { label: 'Bàn', value: '1' },
    { label: 'Ghế', value: '1' },
    { label: 'Chảo', value: '1' },
    { label: 'Nồi', value: '1' },
];
const AddProduct = ({navigation}) => {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [TypeProduct, setTypeProduct] = useState("");
    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === category && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };
    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {navigation.goBack()}}
                    style={{ borderWidth: 1, borderRadius: 10, padding: 5, marginEnd: 'auto' }}>
                    <AntDesign name="arrowleft" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={{ marginEnd: 'auto', fontSize: 20, color: '#000', fontWeight: 'bold' }}>Thêm Sản Phẩm</Text>
                <View style={{ marginStart: 'auto' }}>
                </View>
            </View>
            <View style={{ flexDirection: 'column', margin: 10 }}>
                <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Tên:</Text>
                    <TextInput
                        value={Title}
                        onChangeText={item => { setTitle(item) }}
                        autoComplete='false'
                        keyboardType='default'
                        style={{ borderBottomWidth: 1, marginStart: 'auto', width: 250, maxHeight: 35 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Danh Mục:</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={dataCategory}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Danh Mục"
                        searchPlaceholder="Search..."
                        value={category}
                        onChange={item => {
                            setCategory(item.value);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                        )}
                        renderItem={renderItem}
                    />
                </View>
                <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Phân Loại:</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={category === "1" ? dataTypeStudy : dataTypeHouseware}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Phân Loại"
                        searchPlaceholder="Search..."
                        value={TypeProduct}
                        onChange={item => {
                            setCategory(item.value);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                        )}
                        renderItem={renderItem}
                    />
                </View>
                <View style={{ flexDirection: 'column', margin: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginEnd: 'auto' }}>Mô Tả:</Text>
                    <View style={{ borderWidth: 1, borderRadius: 10, height: 200, flexDirection:'row', marginVertical:10}}>
                        <TextInput
                            value={Description}
                            onChangeText={item => { setDescription(item) }}
                            autoComplete='false'
                            keyboardType='default'
                            multiline
                            style={{ borderBottomWidth: 1, marginStart: 'auto', flex:1}}
                        />
                    </View>
                </View>
                <View style={{flexDirection:'column', marginHorizontal:10}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginEnd: 'auto'}}>Hình ảnh, video minh họa:</Text>
                    <View style={{flexDirection:'row', marginHorizontal:5}}>
                        <View style={{borderWidth:1, borderRadius:10, width:100, height:100, marginHorizontal:5}}>
                            <View style={{margin:5, marginStart:'auto'}}>
                                <AntDesign name="closecircle" size={20} color="red" />
                            </View>
                        </View>
                        <TouchableOpacity 
                            onPress={() => {Alert.alert("bấm dô đây để mở thư viện chọn ảnh nè, ảnh được chọn sẽ chèn lên đầu hàng")}}
                            style={{borderWidth:1, borderRadius:10, alignItems:'center', justifyContent:'center', height:100, width:100, marginHorizontal:5}}>
                            <AntDesign name='plus' size={60} color='#000' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AddProduct;

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
});