//@ts-nocheck

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import {Text, View} from 'react-native'
import { getPopularMovies } from './services/service'
import Home from './screens/Home'
import Details from './screens/Details';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavBar from './components/NavBar';
import MainNavigation from './components/MainNavigation';



const App = () =>{

 
  return(

    <NavigationContainer>
      <MainNavigation></MainNavigation> 
    </NavigationContainer>

  )
}

export default App