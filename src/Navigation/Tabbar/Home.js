import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Home = () => {
  return (
    <View>
      <View style={{
        flexDirection: 'row',
        borderWidth: 1,
        height: 80,
      }}>
        <Text
          style={{
            alignSelf: 'center'
          }}>
          ABCD
        </Text>

        <View

          style={{
            marginStart: 'auto',
            alignSelf: 'center',
            marginRight: 25,
            borderWidth: 0.8,
            borderColor: 'grey',
            borderRadius: 10,
            height: 45,
            width: 45,

          }}>

          <AntDesign
            style={{
              alignSelf: 'center',
              marginTop: 7,
            }}
            name='shoppingcart'
            size={30}
            color='40'
          />
        </View>

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
          marginHorizontal: 10,
          borderWidth: 1,
          marginTop: 30,
          height: 100,
          borderRadius: 15,
        }}
      >
        <Text>
          amination
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 10,
          width: 125,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <View
          style={{
            borderColor: 'orange',
            width: 40,
            borderWidth: 2,
            borderRadius: 5,
          }}
        >

        </View>
        <View
          style={{
            borderColor: 'orange',
            width: 40,
            borderWidth: 2,
            borderRadius: 5,
          }}
        >

        </View>
        <View
          style={{
            borderColor: 'orange',
            width: 40,
            borderWidth: 2,
            borderRadius: 5,
          }}
        >

        </View>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 20,
          borderWidth: 1,
          height: 150,
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
            Categories
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
        <View
          style={{
            borderWidth: 1,
            marginTop: 3,
            height: 'auto',
          }}
        >
          <ScrollView
            horizontal={true}
            style={{
              height: 'auto',
            }}
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
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
