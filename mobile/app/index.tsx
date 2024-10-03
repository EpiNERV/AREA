import { View, Text, StyleSheet } from 'react-native'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Redirect } from 'expo-router';

const Stack = createNativeStackNavigator();
const s = require('./style');

export default function Index() {
  return (
       <Redirect href={"./welcome/welcomeScreen"} />
  );
}

const styles = StyleSheet.create({
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginBottom  :5
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    borderColor : "red",
    borderWidth : 1,
    borderRadius: 7
  },
})