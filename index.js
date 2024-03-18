/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens'

import AppNavigator from './src/Navigation/AppNavigator';
import CartMain from './src/Screens/CartScreen/CartMain';
import Home from './src/Screens/HomeScreen/Home'
import Tabbar from './src/Navigation/Tabbar/Tabbar';
import ProductList from './src/Screens/ProductScreen/ProductList';
import CategoryMain from './src/Screens/CategoriesScreen/CategoryMain';
import Profile from './src/Screens/PersonalScreen/Profile'
LogBox.ignoreAllLogs();
enableScreens(true)
AppRegistry.registerComponent(appName, () => Profile);

