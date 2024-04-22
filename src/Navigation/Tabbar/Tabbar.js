import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
// Screens
import Home from '../../Screens/HomeScreen/Home';
import CategoryMain from '../../Screens/CategoriesScreen/CategoryMain';
import Forum from '../../Screens/ForumScreen/Forum';
import WishList from '../../Screens/WishListScreen/WishList';
import Personal from '../../Screens/PersonalScreen/Personal';
import IndexChat from '../../Screens/Chat/IndexChat';
//Screen name
const homeName = "Home";
const categoryName = "CategoryMain";
const forumName = "Budget";
const chatName = "Chat";
const personalName = "Setting";

const Tab = createBottomTabNavigator();
function Tabar({ route }) {
    // const {hTransaction,budget}=useData();
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn === categoryName) {
                        iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
                    } else if (rn === forumName) {
                        iconName = focused ? 'newspaper' : 'newspaper-outline';
                    } else if (rn === chatName) {
                        iconName = focused ? 'chatbox' : 'chatbox-outline';
                    } else if (rn === personalName) {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#FE7E00',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70 }
            }}
        >
            <Tab.Screen name={homeName} component={Home} options={{ headerShown: false }} />
            <Tab.Screen name={categoryName} component={CategoryMain} options={{ headerShown: false }} />
            <Tab.Screen name={forumName} component={Forum} options={{ headerShown: false }} />
            <Tab.Screen name={chatName} component={IndexChat} options={{ headerShown: false }} />
            <Tab.Screen name={personalName} component={Personal} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
export default Tabar;