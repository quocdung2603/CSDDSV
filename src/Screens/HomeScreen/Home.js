import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
let tempUserId = ""
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Home = ({ navigation }) => {

  useEffect(() => {
    temp()
  }, [])
  const [ii, setII] = useState(0)
  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if (slide != ii) {
        setII(slide)
      }
    }
  }
  const temp = async (userId) => {
    tempUserId = await AsyncStorage.getItem('USERID', userId);
    console.log(tempUserId);

  };
  const images = [
    'https://stbook.vn/static/covers/CP111BK120211115134605/cover.clsbi',
    'https://pos.nvncdn.com/fb7988-79234/ps/20221206_tZi8bGaVYHjxHqoLw9xHb0o2.jpeg',
    'https://homeoffice.com.vn/images/detailed/23/ban-ket-hop-ke-01.jpg',
  ]

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
        <Text style={{ marginEnd: 'auto', fontSize: 20, color: 'red', fontWeight: 'bold' }}>ABC</Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate('CartMain') }}
          style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
          <Ionicons name='cart' size={30} color='#FE7E00' />
        </TouchableOpacity>
      </View>
      <View

        style={{
          backgroundColor: "#1d2a44",
          marginTop: 30,
          borderWidth: 1,
          height: 65,
          marginHorizontal: 15,
          borderRadius: 12,
          flexDirection: 'row',
          // padding: 5,
          justifyContent: 'space-around',
        }}
      >
        <View

          style={{
            // borderWidth: 1,
            width: 100,
            flexDirection: 'row',
          }}
        >
          <AntDesign
            name='wallet'
            color='orange'
            size={30}
            style={{
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'column',
              alignSelf: 'center',
            }}
          >
            <Text
              style={{
                color: 'grey',
                fontSize: 13,
              }}
            >
              Wallet
            </Text>
            <Text
              style={{
                color: 'white',
              }}
            >
              1
            </Text>
          </View>
        </View>
        <View

          style={{
            // borderWidth: 1,
            width: 100,
            flexDirection: 'row',
          }}
        >
          <AntDesign
            name='wallet'
            color='orange'
            size={30}
            style={{
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'column',
              alignSelf: 'center',
            }}
          >
            <Text
              style={{
                color: 'grey',
                fontSize: 13,

              }}
            >
              Points
            </Text>
            <Text
              style={{
                color: 'white',
              }}
            >
              1
            </Text>
          </View>
        </View>
        <View

          style={{
            // borderWidth: 1,
            width: 100,
            flexDirection: 'row',
          }}
        >
          <AntDesign
            name='wallet'
            color='orange'
            size={30}
            style={{
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'column',
              alignSelf: 'center',
            }}
          >
            <Text
              style={{
                color: 'grey',
                fontSize: 13,
              }}
            >
              Vouchers
            </Text>
            <Text
              style={{
                color: 'white',
              }}
            >
              1
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 30,
          borderRadius: 20,
          borderWidth: 1,
          width: WIDTH,
          height: HEIGHT * 0.25,
        }}
      >
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={{
            width: WIDTH,
            height: HEIGHT * 0.25,
          }}
        >
          {
            images.map((e, index) =>
              <Image
                key={e}
                resizeMode='stretch'
                source={{ uri: e }}
                style={{
                  borderRadius: 20,
                  width: WIDTH,
                  height: HEIGHT * 0.25,
                }}
              />
            )
          }
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            alignSelf: 'center'
          }}
        >
          {
            images.map((e, index) =>
              <Text
                key={e}
                style={ii == index ? { fontSize: 20 } : {}}
              >
                😣
              </Text>
            )
          }

        </View>
      </View>

      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          borderWidth: 1,
          height: 200,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            Products
          </Text>
          <Text
            style={{
              textDecorationLine: 'underline',
              marginStart: 'auto',
            }}
          >
            View all
          </Text>
        </View>
      </View>
      <View>

      </View>
    </View >
  )
}
export default Home;
