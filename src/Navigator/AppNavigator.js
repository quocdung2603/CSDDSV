import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../Splash";
import Login from "../Login";
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator;