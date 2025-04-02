import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const ListItemCateSoft = ({ route, navigation }) => {
    const { productClassifed, titleCate } = route.params;

    // console.log(navigation, 321)

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{titleCate}</Text>
            <FlatList
                data={productClassifed}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}
                        onPress={() => {
                            navigation.navigate('DetailProduct', { item, navigation })
                        }}
                    >
                        <Text style={styles.productTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E53935',
        marginTop: 5,
    }
});

export default ListItemCateSoft;