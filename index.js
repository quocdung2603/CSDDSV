/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens'
import AppNavigator from './src/Navigation/AppNavigator';
import SettingMain from './src/Screens/SettingScreen/SettingMain';
LogBox.ignoreAllLogs();
enableScreens(true)
AppRegistry.registerComponent(appName, () => SettingMain);

