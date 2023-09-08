import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Submit from './src/screens/Submit';
import CheckIn from './src/screens/CheckIn';

export default function App() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Submit" component={Submit} />
        <Tab.Screen name="CheckIn" component={CheckIn} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
