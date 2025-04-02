import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const ListItemCate = ({ route, navigation }) => {
    const { productClassifed, titleCate } = route.params;

    console.log(route, 123)

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{titleCate}</Text>
            <FlatList
                data={productClassifed}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}
                        onPress={() => {
                            navigation.navigate('DetailProduct', { item })
                        }}
                    >
                        <Image
                            source={{ uri: item.img.length > 0 ? item.img[0] : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEXw8fP6+/2Ai5Hz9PZ+h4/u8fLu7u96hIzn6evv8PZ5hYrl6e2Bh4x9iYx5iYvr7u/29fp3gofP1dXt8Ovv7fDc4+ff5eWGj5K7wseCi5OgrK+Yo6Wfo6l4h47b3uPZ2tyxubzJztKQm5+ssLJ6hITM1duiq7N4f4hc1vOXAAADqklEQVR4nO3ba3eiMBSF4UwSEkVR6HgBq71f/v8/nCDVKgSmKOOck7Xfr9NVeWQPqG3Fr9AT//sA/nkQ8g9C/kHIPwj5ByH/IOQfhPyDkH8Q8g9C/kHIPwj51yFUnLpMKPgEIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD0II6QchhPSDEEL6QQjhz4sGP/afdTNhujDXJ1L1m6TQCDO/T2J7bdpuR72f3Fudw622+toKbXfblKQwEpPYPkxGV/dopxOawmgyk32PzHu0mq4wkeNx32NrZggLZ8m876E1MxD6gvD2Qndfb/+nQIStxlCESqxGyvsIYQij6ElaK599DxGA0H1f9ZJJ12fueYwAhGah8my3k9K9BPVQAhBGZvwiq+InJepXnDCEyUH4qlSIQnF6Dhs3jQCE7nheZ7oohdld80FCEBoxX8d74H2Y19Ky1Uvs2kSeT64CERrxmD8vA35NU15eVMuHMRyFvimKeeQm6nv1zUy4WCgV9fv0k5nQqLtN85bXGTOhunubbVSvT/s5Cd1E37XW9kOZjqGa2v9GTkI30f3H2HbT9a2MOJ8xJ6GbqJZaFnLXNdT0IU/Fya2fjbCaaPUCuxxq2xVVLQv3Rpij0E00+QLKrqGu1lJn+cndn4nQlBM9vAt0S5Xxh3uvWx/qQqTLJHEvwrNcHVfMQ1hO1B7O4L7CM9RFOdHqq+L8eLnhIXRnUOozoX+oq3X1PlFKe/xQioPQje/9TTaqDbU8g+vvZ8CWV1QmwnKin7opPL+inkxUHobKReiuolMPsDHU74kehpqyELqr6Hvi8Z0PdT/R+pdVQ6UubF5FfUNtTPRkqNSFbqKxbhceh1qfaFV56yctTKbuDMZtvO+h+ia6b1cSI8LCWHdNdF/hhirUxDPRryfA3fopC6W7inYL3VCz16X0TfTrNOYpYWEiW6+iZ+ep80nI8oKycIhi0udwkCCEEMJLhUKMghfOp6ELo/tsEKHdkv0t6Ml2Gg8Q4d/zFioaD1DPH+XcUhgZ4y6pVzaP6j/JICQUQ/xJie9n+38NfxUEIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD0II6QchhPSDEEL6QQgh/SCEkH4QsheaC4WcukgYSBDyD0L+Qcg/CPkHIf8g5B+E/IOQfxDyD0L+Qcg/CPkXvvAP0S+Ye31pd4gAAAAASUVORK5CYII=' }}
                            style={styles.image}
                        />
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.price}>₫58.000</Text>
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

export default ListItemCate;