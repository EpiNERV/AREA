import { View, Image } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Spacer from '@/components/Spacer'
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();
  return (
    <View>
      <Image style={{height: 300}} resizeMode='contain' source={require('../../assets/images/welcome.png')} />
      <Spacer size={20} />
      <Button title={"Login"} onPress={() => router.navigate("/welcome/login")} />
      <Button title={"Register"} onPress={() => router.navigate("/welcome/register")} color='white' textcolor='black' />
    </View>
  )
}