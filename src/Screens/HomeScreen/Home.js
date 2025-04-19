import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const id = await AsyncStorage.getItem('USERID');
      setUserId(id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch products data
  const fetchProducts = async () => {
    try {
      // Fetch featured products
      const featuredSnapshot = await firestore()
        .collection('Products')
        .where('featured', '==', true)
        .limit(5)
        .get();
      setFeaturedProducts(featuredSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch new products
      const newSnapshot = await firestore()
        .collection('Products')
        .orderBy('createdAt', 'desc')
        .limit(5)
        .get();
      setNewProducts(newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch popular products
      const popularSnapshot = await firestore()
        .collection('Products')
        .orderBy('views', 'desc')
        .limit(5)
        .get();
      setPopularProducts(popularSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Refresh data
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchUserData(), fetchProducts()]);
    setRefreshing(false);
  }, []);

  // Load data when screen is focused
  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  // Banner images
  const bannerImages = [
    'https://stbook.vn/static/covers/CP111BK120211115134605/cover.clsbi',
    'https://pos.nvncdn.com/fb7988-79234/ps/20221206_tZi8bGaVYHjxHqoLw9xHb0o2.jpeg',
    'https://homeoffice.com.vn/images/detailed/23/ban-ket-hop-ke-01.jpg',
  ];

  // Render product item
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image
        source={{ uri: item.images[0] }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} đ</Text>
        <View style={styles.productMeta}>
          <Text style={styles.productViews}>{item.views} lượt xem</Text>
          <Text style={styles.productDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TDMU Exchange</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
            style={styles.headerButton}
          >
            <Ionicons name="notifications" size={24} color="#FE7E00" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CartMain')}
            style={styles.headerButton}
          >
            <Ionicons name="cart" size={24} color="#FE7E00" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <AntDesign name="wallet" size={24} color="#FE7E00" />
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Ví</Text>
              <Text style={styles.statValue}>1</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <AntDesign name="star" size={24} color="#FE7E00" />
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Điểm</Text>
              <Text style={styles.statValue}>1</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <AntDesign name="gift" size={24} color="#FE7E00" />
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Voucher</Text>
              <Text style={styles.statValue}>1</Text>
            </View>
          </View>
        </View>

        {/* Banner Slider */}
        <View style={styles.bannerContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
              if (slide !== bannerIndex) {
                setBannerIndex(slide);
              }
            }}
          >
            {bannerImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View style={styles.bannerDots}>
            {bannerImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.bannerDot,
                  bannerIndex === index && styles.bannerDotActive
                ]}
              />
            ))}
          </View>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FeaturedProducts')}>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* New Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
            <TouchableOpacity onPress={() => navigation.navigate('NewProducts')}>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={newProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Popular Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Xem nhiều nhất</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PopularProducts')}>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={popularProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FE7E00',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1d2a44',
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statInfo: {
    marginLeft: 10,
  },
  statLabel: {
    color: 'grey',
    fontSize: 13,
  },
  statValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bannerContainer: {
    height: HEIGHT * 0.25,
    margin: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bannerImage: {
    width: WIDTH - 30,
    height: HEIGHT * 0.25,
  },
  bannerDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  bannerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    margin: 5,
  },
  bannerDotActive: {
    backgroundColor: '#FE7E00',
  },
  section: {
    margin: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#FE7E00',
  },
  productItem: {
    width: 150,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    color: '#FE7E00',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productViews: {
    fontSize: 12,
    color: '#666',
  },
  productDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default Home;
