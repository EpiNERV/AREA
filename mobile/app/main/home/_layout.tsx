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
                tabBarShowLabel: false,
                headerShown: false,
                tabBarLabel: "Dashboard",
            }}
        />
        <Tabs.Screen
            name="action"
            options={{
                tabBarShowLabel: false,
                headerShown: false,
            }}
        />

    </Tabs>
  )
}