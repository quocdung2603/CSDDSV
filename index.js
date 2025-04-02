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
import Index from './src/Screens/Map/Index.js';
import TT1 from './src/Test1/TT1.js';
import FakeFile from './src/Screens/CategoriesScreen/Component/FakeFile.js';
LogBox.ignoreAllLogs();
enableScreens(true)
AppRegistry.registerComponent(appName, () => AppNavigator);