import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../Screens/Login/Splash";
import Login from "../Screens/Login/Login";
import ForgotPass from "../Screens/Login/ForgotPass";
import Register from "../Screens/Login/Register";
import CategoryMain from "../Screens/CategoriesScreen/CategoryMain";
import WishList from "../Screens/WishListScreen/WishList";
import Personal from "../Screens/PersonalScreen/Personal";
const Stack = createStackNavigator();


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Splash"
                    component={props => <Splash {...props} />}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={props => <Login {...props} />}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgotPass"
                    component={props => <ForgotPass {...props} />}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={props => <Register {...props} />}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator;