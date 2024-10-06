import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/lib/AuthContext';
import { Redirect } from 'expo-router';

const Stack = createNativeStackNavigator();
const s = require('./style');

export default function Index() {

  const { loading, accessToken } = useAuth();

  if (!loading) {
    return (
      <Redirect href={accessToken ? "/main/home/dashboard" : "./welcome/welcomeScreen"} />
    );
  }
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