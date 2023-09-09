import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import Submit from './src/screens/Submit';
import CheckIn from './src/screens/CheckIn';
import {View, Text, TouchableOpacity} from 'react-native';

export default function App() {
  const client = new ApolloClient({
    uri: 'https://profound-marmot-29.hasura.app/v1/graphql',
    cache: new InMemoryCache(),
  });
  const Stack = createNativeStackNavigator();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Status">
          <Stack.Screen
            name="Status"
            component={StatusScreen}
            options={{
              header: () => <CustomHeader title="Checkins" />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

function CustomHeader({title}) {
  return (
    <View
      style={{backgroundColor: 'white', alignItems: 'center', marginTop: 10}}>
      <Text style={{color: 'black', fontSize: 20}}>{title}</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function StatusScreen() {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Submit" component={Submit} />
      <Tab.Screen name="Check-ins" component={CheckIn} />
    </Tab.Navigator>
  );
}

function CustomTabBar({state, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 0,
        height: 60,
      }}>
      {state.routes.map((route, index) => {
        const label = route.name.charAt(0).toUpperCase() + route.name.slice(1);
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: isFocused ? 2 : 0,
              borderColor: 'black',
            }}>
            <Text style={{color: 'black', fontSize: 16}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
