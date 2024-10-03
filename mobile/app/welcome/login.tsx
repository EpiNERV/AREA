import { View, Text, TextInput, } from 'react-native'
import React from 'react'
import { HelloWave } from '@/components/HelloWave';
import Spacer from '@/components/Spacer';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';

const s = require('../style');

export default function Login() {
  const router = useRouter();
  return (
    <View>
      <Text style={s.titleText}>Welcome Back <HelloWave /> </Text>
      <Text>Sign in to start managing your projects.</Text>
      <Spacer size={20} />
      <TextInput style={s.input} placeholder='Enter your Email' autoCapitalize='none' keyboardType="email-address" />
      <TextInput style={s.input} placeholder='Enter your Password' autoCapitalize='none' secureTextEntry/>
      <Spacer size={80} />
      <Button title={"Login"} onPress={() => router.navigate("/main/home/notifications")} />
    </View>
  )
}