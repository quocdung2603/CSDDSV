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
import IndexChat from './src/Screens/Chat/IndexChat';
import Chat from './src/Screens/Chat/Chat.js';
LogBox.ignoreAllLogs();
enableScreens(true)
AppRegistry.registerComponent(appName, () => Chat);