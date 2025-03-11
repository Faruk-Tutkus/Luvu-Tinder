import React from 'react';
import { NavigationContainer, NavigationIndependentTree  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import the custom tab bar
import WaterDropTabBar from '../../component/waterDropTabBar';
// Import your screens

import Luvu from './luvu'
import Comment from './comment'
import Profile from './profile'

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
        <Tab.Screen name="luvu" component={Luvu}/>
        <Tab.Screen name="comment" component={Comment}/>
        <Tab.Screen name="profile" component={Profile}/>
      </Tab.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
    
  );
}