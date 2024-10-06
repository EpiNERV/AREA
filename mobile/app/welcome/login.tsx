import { View, Text, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import Spacer from '@/components/Spacer';
import Button from '@/components/Button';
import {Link, useRouter } from 'expo-router';
import axios from 'axios';
import { useAuth } from '@/lib/AuthContext';


const s = require('../style');

interface TokenType {
  tokens: {
    access_token: string;
    refresh_token: string;
  }
  status: string;
  message: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const Login = async () => {
    try {
      const response = await axios.post<TokenType>('http://192.168.209.228:5000/api/v1/user/auth/login', {
        email,
        password,
      }); 
      if (response.data.status == "success") {
        const { access_token, refresh_token } = response.data.tokens;
        login(access_token, refresh_token);
        router.replace('/main/home/dashboard');
      } else {
        Alert.alert('Login Failed', `${response.data.message ?? "Error"}`);
      }
    } catch (error: any) {
      console.log(error)
      Alert.alert('Login Failed', `${error.response.data.message ?? "Error"}`);
    }
  };

  return (
    <View>
      <Text style={s.titleText}>Welcome Back <HelloWave /> </Text>
      <Text>Sign in to start managing your projects.</Text>
      <Spacer size={20} />
      <TextInput
        style={s.input}
        placeholder='Enter your Email'
        autoCapitalize='none'
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail} // Update email state
      />
      <TextInput
        style={s.input}
        placeholder='Enter your Password'
        autoCapitalize='none'
        secureTextEntry
        value={password}
        onChangeText={setPassword} // Update password state
      />
      <Spacer size={80} />
      <Button title={"Login"}  onPress={Login} />
        <Text>Don't have an account? <Link href={"/welcome/register"}>Register now</Link></Text>
    </View>
  )
}