import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons'; // New icon library

import HomeScreen from './src/screens/HomeScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import RestaurantDetailScreen from './src/screens/RestaurantDetailScreen';
import ReservationScreen from './src/screens/ReservationScreen';

import WelcomeScreen from './src/screens/Welcome';
import LoginScreen from './src/screens/Login';
import SignupScreen from './src/screens/Register';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Define color scheme
const colors = {
  primary: '#2D5A56',
  secondary: '#a1afa8',
  background: '#F5F5DC',
};

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Dashboard') {
          iconName = 'view-dashboard-outline';
        } else if (route.name === 'RestaurantDetail') {
          iconName = 'silverware-fork-knife';
        } else if (route.name === 'Reservation') {
          iconName = 'calendar-check-outline';
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.secondary,
      tabBarStyle: { backgroundColor: colors.background },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
    <Tab.Screen name="RestaurantDetail" component={RestaurantDetailScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Reservation" component={ReservationScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="HomeTabs" component={BottomTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
