import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Icon
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const test = () => {
    return (
        <View>
            <Text>ABCD</Text>
            <AntDesign name='rocket1' size={30} color='40' />
        </View>
    )
}
export default test;
