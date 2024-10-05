import { View, Text, TextInput, } from 'react-native'
import React from 'react'
import { HelloWave } from '@/components/HelloWave';
import Spacer from '@/components/Spacer';
import Button from '@/components/Button';
import { Link, useRouter } from 'expo-router';

const s = require('../style');

export default function Register() {
  const router = useRouter();
  return (
    <View>
    <Text style={s.titleText}>Welcome<HelloWave /> </Text>
    <Text>Register to start creating and managing your projects.</Text>
    <Spacer size={20} />
    <TextInput style={s.input} placeholder='Username' autoCapitalize='none' keyboardType="email-address" />
    <TextInput style={s.input} placeholder='Email' autoCapitalize='none' keyboardType="email-address" />
    <TextInput style={s.input} placeholder='Password' autoCapitalize='none' secureTextEntry/>
    <TextInput style={s.input} placeholder='Confirm Password' autoCapitalize='none' secureTextEntry/>
    <Spacer size={80} />
    <Button title={"Agree and Register"} onPress={() => router.navigate("/main/home/notifications")} />
      <Text>Already have an account? <Link href={"/welcome/login"}>Login now</Link></Text>
  </View>
  )
}