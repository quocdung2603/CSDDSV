/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens'

import indexApp from './src/indexApp'
import AppNavigator from './src/Navigator/AppNavigator';

LogBox.ignoreAllLogs();
enableScreens(true)
AppRegistry.registerComponent(appName, () => AppNavigator);
