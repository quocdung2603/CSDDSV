/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens'

import AppNavigator from './src/Navigation/AppNavigator';
import DiscoverMain from './src/Discover/DiscoverMain';

LogBox.ignoreAllLogs();
enableScreens(true)
AppRegistry.registerComponent(appName, () => DiscoverMain);
