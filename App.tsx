import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';

import Main from './src/screens/Main';
import Search from './src/screens/Search';
import Detail from './src/screens/Detail';
import Profile from './src/screens/Profile';
import { StyleSheet } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import Cart from './src/screens/Cart';
import { ToastProvider } from 'react-native-toast-notifications';
import Toast from "react-native-toast-message";
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={Detail}
        options={{
          headerShown: true,
          title: 'Product Details',
          headerStyle: {
            backgroundColor: '#1a1a2e',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

// Search Stack Navigator
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={Detail}
        options={{
          headerShown: true,
          title: 'Product Details',
          headerStyle: {
            backgroundColor: '#1a1a2e',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

// Cart Stack Navigator
function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartScreen"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={Detail}
        options={{
          headerShown: true,
          title: 'Product Details',
          headerStyle: {
            backgroundColor: '#1a1a2e',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function AppNavigator() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: '#666',
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarActiveTintColor: 'purple',
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={25} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{
            tabBarActiveTintColor: 'purple',
            tabBarIcon: ({ color }) => (
              <Icon name="search1" size={25} color={color} />

            )
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartStack}
          options={{
            tabBarActiveTintColor: 'purple',
            tabBarIcon: ({ color }) => (
              <Icon name="shoppingcart" size={25} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          children={(props) => <Profile {...props} setIsAuthenticated={setIsAuthenticated} />}
          options={{
            tabBarActiveTintColor: 'purple',
            tabBarIcon: ({ color }) => (
              <Icon name="user" size={25} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    );
  }

  function AuthNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* If we will write in below way then we cant pass the props SO USING CHILDREN */}
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="Signup" component={Signup} /> */}
        <Stack.Screen name="Login" children={(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} />} />
        <Stack.Screen name="Signup" children={(props) => <Signup {...props} setIsAuthenticated={setIsAuthenticated} />} />
      </Stack.Navigator>
    );
  }
  // Check authentication status on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token =await AsyncStorage.getItem('userToken');
        console.log("USER TOKEN IN app.jsx",token)
        if (token) setIsAuthenticated(true);
      }
      catch (error) {
        console.error('Error checking auth status:', error);
      }
      setIsLoading(false);
    };
    checkAuthStatus();
  }, []);

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      <Toast />
    </NavigationContainer>
  );

  // return (
  //   <NavigationContainer>
  //     <AppNavigator />
  //     <Toast />
  //   </NavigationContainer>
  // );
}
export default App;