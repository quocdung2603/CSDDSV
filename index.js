/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens'

import AppNavigator from './src/Navigation/AppNavigator';
import WishList from './src/Screens/Discover/WishList';

LogBox.ignoreAllLogs();
enableScreens(true)
AppRegistry.registerComponent(appName, () => WishList);
