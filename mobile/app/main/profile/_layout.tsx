import React from 'react'

import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function _layout() {
  return (
    <Tabs screenOptions={{
        headerShown: false
    }}>
        <Tabs.Screen
            name="user"
            options={{
                tabBarLabel: 'User Info',
                tabBarIcon: ({size, color})=>(
                    <Ionicons name='person' size={size} color={color} />
                )
            }}
        />
        <Tabs.Screen
            name="integration"
            options={{
                tabBarLabel: 'Integrations',
                tabBarIcon: ({size, color})=>(
                    <Ionicons name='person-add' size={size} color={color} />
                )
            }}
        />

    </Tabs>
  )
}