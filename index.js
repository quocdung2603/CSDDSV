/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens'
import AppNavigator from './src/Navigation/AppNavigator';
import Login from './src/Screens/Login/Login';
import CategoryItem from './src/Screens/CategoriesScreen/CategoryItem';
import AddCategory from './src/Screens/CategoriesScreen/AddCategory';
LogBox.ignoreAllLogs();
enableScreens(true)
AppRegistry.registerComponent(appName, () => AppNavigator);

