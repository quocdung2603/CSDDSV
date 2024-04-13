import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../Screens/Login/Splash";
import Login from "../Screens/Login/Login";
import ForgotPass from "../Screens/Login/ForgotPass";
import Register from "../Screens/Login/Register";
import SettingMain from "../Screens/SettingScreen/SettingMain";
import Tabbar from "./Tabbar/Tabbar";
import CartMain from "../Screens/CartScreen/CartMain";
import Checkout from "../Screens/CartScreen/Checkout";
import Home from "../Screens/HomeScreen/Home";
import StoreMain from "../Screens/StoreManagementScreen/StoreMain";
import ProductManage from "../Screens/StoreManagementScreen/ProductManage";
import TransactionManage from "../Screens/StoreManagementScreen/TransactionManage";
import StatisticalManage from "../Screens/StoreManagementScreen/StatisticalManage";
import SettingStore from "../Screens/StoreManagementScreen/SettingStore";
import SettingAccount from "../Screens/SettingScreen/SettingAccount";
import SettingInformation from "../Screens/SettingScreen/SettingInformation";
import SettingScurity from "../Screens/SettingScreen/SettingScurity";
import ProductList from "../Screens/ProductScreen/ProductList";
import AddProduct from "../Screens/ProductScreen/AddProduct";
import EditProduct from "../Screens/ProductScreen/EditProduct";
import DetailProduct from "../Screens/ProductScreen/DetailProduct";
import CategoryItem from "../Screens/CategoriesScreen/CategoryItem";
import OrderList from "../Screens/OrderScreen/OrderList";
import OrderDetail from "../Screens/OrderScreen/OrderDetail";
import OrderSuccess from "../Screens/OrderScreen/OrderSuccess";
import PostArticle from "../Screens/ForumScreen/PostArticle";
import EditArticle from "../Screens/ForumScreen/EditArticle";
import AddCategory from "../Screens/CategoriesScreen/AddCategory";
import HomeAd from "../Screens/Admin/HomeAd";
import ManagerRegis from "../Screens/Admin/ManagerRegis";
import AddPost from "../Screens/ForumScreen/AddPost";
import Forum from "../Screens/ForumScreen/Forum";
import ManagerPro from "../Screens/Admin/ManagerPro";
import DetailPro from "../Screens/Admin/Component/DetailPro";
import ShowCate from "../Screens/CategoriesScreen/Component/ShowCate";
import IndexChat from "../Screens/Chat/IndexChat";
import Chat from "../Screens/Chat/Chat";

const Stack = createStackNavigator();


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                {/* Admin */}
                <Stack.Screen name="HomeAd" component={HomeAd} options={{ headerShown: false }} />
                <Stack.Screen name="ManagerRegis" component={ManagerRegis} options={{ headerShown: false }} />
                <Stack.Screen name="ManagerPro" component={ManagerPro} options={{ headerShown: false }} />
                <Stack.Screen name="DetailPro" component={DetailPro} options={{ headerShown: false }} />
                {/* tabbar */}
                <Stack.Screen name="Tabbar" component={Tabbar} options={{ headerShown: false }} />
                {/* Account */}
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPass" component={ForgotPass} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                {/* Chat */}
                <Stack.Screen name="IndexChat" component={IndexChat} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                {/* HomeScreen */}
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                {/* Category */}
                <Stack.Screen name="CategoryItem" component={CategoryItem} options={{ headerShown: false }} />
                <Stack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
                <Stack.Screen name="ShowCate" component={ShowCate} options={{ headerShown: false }} />
                {/* Wishlist */}
                {/* Forum */}
                <Stack.Screen name="PostArticle" component={PostArticle} options={{ headerShown: false }} />
                <Stack.Screen name="EditArticle" component={EditArticle} options={{ headerShown: false }} />
                <Stack.Screen name="Forum" component={Forum} options={{ headerShown: false }} />
                <Stack.Screen name="AddPost" component={AddPost} options={{ headerShown: false }} />
                {/* Product */}
                <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
                <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
                <Stack.Screen name="EditProduct" component={EditProduct} options={{ headerShown: false }} />
                <Stack.Screen name="DetailProduct" component={DetailProduct} options={{ headerShown: false }} />
                {/* Cart */}
                <Stack.Screen name="CartMain" component={CartMain} options={{ headerShown: false }} />
                <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
                {/* Order */}
                <Stack.Screen name="OrderList" component={OrderList} options={{ headerShown: false }} />
                <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }} />
                <Stack.Screen name="OrderSuccess" component={OrderSuccess} options={{ headerShown: false }} />
                {/* Personal */}
                {/* Store Manage */}
                <Stack.Screen name="StoreMain" component={StoreMain} options={{ headerShown: false }} />
                <Stack.Screen name="ProductManage" component={ProductManage} options={{ headerShown: false }} />
                <Stack.Screen name="TransactionManage" component={TransactionManage} options={{ headerShown: false }} />
                <Stack.Screen name="StatisticalManage" component={StatisticalManage} options={{ headerShown: false }} />
                <Stack.Screen name="SettingStore" component={SettingStore} options={{ headerShown: false }} />
                {/* Setting */}
                <Stack.Screen name="SettingMain" component={SettingMain} options={{ headerShown: false }} />
                <Stack.Screen name="SettingInformation" component={SettingInformation} options={{ headerShown: false }} />
                <Stack.Screen name="SettingAccount" component={SettingAccount} options={{ headerShown: false }} />
                <Stack.Screen name="SettingScurity" component={SettingScurity} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator;