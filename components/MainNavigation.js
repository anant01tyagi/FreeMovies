import React from 'react';

import Details from '../screens/Details';
import {createStackNavigator} from '@react-navigation/stack';
import NavBar from './NavBar';
import Home from '../screens/Home';
import Search from '../screens/Search';

class MainNavigation extends React.PureComponent {
  render() {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator screenOptions={{headerMode: 'screen'}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={true}></NavBar>
            ),
          }}></Stack.Screen>
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false}></NavBar>
            ),
          }}></Stack.Screen>

        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false}></NavBar>
            ),
          }}></Stack.Screen>
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
