import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import ExpenseListScreen from './screens/ExpenseListScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import { ExpenseProvider } from './context/ExpenseContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Add Expense') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'Expenses') {
                iconName = focused ? 'list' : 'list-outline';
              } else if (route.name === 'Categories') {
                iconName = focused ? 'grid' : 'grid-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Add Expense" component={AddExpenseScreen} />
          <Tab.Screen name="Expenses" component={ExpenseListScreen} />
          <Tab.Screen name="Categories" component={CategoriesScreen} />
        </Tab.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </ExpenseProvider>
  );
}
