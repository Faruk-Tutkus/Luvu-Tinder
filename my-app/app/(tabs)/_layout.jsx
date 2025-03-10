import React from 'react';
import { NavigationContainer, NavigationIndependentTree  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import the custom tab bar
import WaterDropTabBar from '../../component/waterDropTabBar';
// Import your screens

import index from './index'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationIndependentTree>
        <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <WaterDropTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="(tabs)/index" component={index}/>
        <Tab.Screen name="index" component={index}/>
        <Tab.Screen name="index2" component={index}/>
      </Tab.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
    
  );
}