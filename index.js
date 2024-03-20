/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens'
import AppNavigator from './src/Navigation/AppNavigator';
import TransactionManage from './src/Screens/StoreManagementScreen/TransactionManage';
import ProductManage from './src/Screens/StoreManagementScreen/ProductManage';
LogBox.ignoreAllLogs();
enableScreens(true)
AppRegistry.registerComponent(appName, () => ProductManage);

