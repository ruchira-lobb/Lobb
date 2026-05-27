// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') {
            iconName = 'food';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Cart') {
            iconName = 'cart';
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#00695c',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: { backgroundColor: '#f5f5f5' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
