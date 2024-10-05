import { View, Text } from 'react-native'
import React from 'react'

import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function _layout() {
  return (
    <Tabs screenOptions={{
        headerShown: false
    }}>
        <Tabs.Screen
            name="dashboard"
            options={{
                tabBarLabel: "Dashboard",
                tabBarIcon: ({size, color})=>(
                    <Ionicons name='settings' size={size} color={color} />
                )
            }}
        />
        {/* <Tabs.Screen
            name="notifications"
            options={{
                tabBarIcon: ({size, color})=>(
                    <Ionicons name='notifications' size={size} color={color} />
                )
            }}
        /> */}

    </Tabs>
  )
}