import { View, Text } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomDrawerContent from '../../components/customDrawerContent';
import ProtectedRoute from '../../components/ProtectedRoute';
import {Stack} from 'expo-router'

export default function _layout() {
    return (
        <ProtectedRoute>
            <Drawer
                screenOptions={{
                    drawerLabelStyle: {
                        marginLeft: -20
                    },
                    // drawerActiveBackgroundColor: 'gray',
                    // drawerActiveTintColor: 'white',
                    // drawerInactiveTintColor: 'white'
                }}
                drawerContent={CustomDrawerContent}
            >

                <Drawer.Screen
                    name="home"
                    options={{
                        drawerLabel: 'Home',
                        title: 'Home',
                        drawerIcon: ({size, color})=>(
                            <Ionicons name='home' size={size} color={color} />
                        )

                    }}
                />
                <Drawer.Screen
                    name="profile"
                    options={{
                        drawerLabel: 'Profile',
                        title: 'Profile',
                        drawerIcon: ({size, color})=>(
                            <Ionicons name='person' size={size} color={color} />
                        )

                    }}
                />
            </Drawer>
        </ProtectedRoute>
    )
}