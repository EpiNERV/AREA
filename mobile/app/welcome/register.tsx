import { View, Text, TextInput } from 'react-native'
import React,  { useState } from 'react'
import { HelloWave } from '@/components/HelloWave';
import Spacer from '@/components/Spacer';
import Button from '@/components/Button';
import { Link, useRouter } from 'expo-router';
import AxiosInstance from '@/lib/AxiosInstance';
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

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const register = async () => {
    try {
      const response = await AxiosInstance.post<TokenType>('/user/auth/register', {
        username,
        email,
        password,
      });
      if (response.data.status == "success") {
        const { access_token, refresh_token } = response.data.tokens;
        login(access_token, refresh_token);
        router.replace('/main/home/dashboard');
      } else {
        setErrorMessage(`${response.data.message ?? "Error"}`);
      }
    } catch (error: any) {
      setErrorMessage(`${error.response.data.message ?? "Error"}`);
    }
  };

  const isParamsValid = () => {
    return username.length > 0
      && email.length > 0
      && password.length >= 6
      && confirmPassword.length > 0
      && password === confirmPassword;
  }

  const getParamErrorMessage = () => {
    if (username.length === 0) {
      return "Username is required";
    } else if (email.length === 0) {
      return "Email is required";
    } else if (password.length === 0) {
      return "Password is required";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters";
    } else if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  }

  return (
    <View>
    <Text style={s.titleText}>Welcome<HelloWave /> </Text>
    <Text>Register to start creating and managing your projects.</Text>
    <Spacer size={20} />
    <TextInput
      style={s.input}
      placeholder='Username'
      autoCapitalize='none'
      keyboardType="default"
      value={username}
      onChangeText={setUsername}
    />
    <TextInput
      style={s.input}
      placeholder='Email'
      autoCapitalize='none' 
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      style={s.input}
      placeholder='Password' 
      autoCapitalize='none'
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <TextInput
      style={s.input}
      placeholder='Confirm Password'
      autoCapitalize='none'
      secureTextEntry
      value={confirmPassword}
      onChangeText={setConfirmPassword}
    />
    <Spacer size={50} />
    <Text style={[s.text, { color: 'red', display: isParamsValid() ? 'flex' : "none" }]}>{errorMessage}</Text>
    <Text style={[s.text, { color: 'red' }]}>{getParamErrorMessage()}</Text>
    <Button
      title={"Agree and Register"}
      onPress={register}
      enabled={isParamsValid()}
    />
      <Text>Already have an account? <Link href={"/welcome/login"}>Login now</Link></Text>
  </View>
  )
}
