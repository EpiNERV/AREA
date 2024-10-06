import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import Button from '@/components/Button'
import { useAuth } from '@/lib/AuthContext';

export default function CustomDrawerContent(props:any) {

    const {bottom} = useSafeAreaInsets();
    const navigation = useNavigation();
    const { logout } = useAuth();

    const closeDrawer = ()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
    }

    const handleLogout = ()=>{
      closeDrawer()
      logout()
    }

  return (
    <View
        style={{flex: 1}}
    >
      <DrawerContentScrollView {...props} scrollEnabled={false}>
            <Text style={{fontSize: 35, textAlign: 'center'}}> AREA </Text>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Pressable onPress={closeDrawer} style={{padding: 20, paddingBottom: bottom+10}}>
        <Button title={"Logout"} onPress={handleLogout} color='red' textcolor='white' />
      </Pressable>
    </View>
  )
}
