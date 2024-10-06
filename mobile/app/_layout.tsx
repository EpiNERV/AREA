import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router';
import { AuthProvider } from '@/lib/AuthContext';

export default function _layout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ animation: 'slide_from_right'}} >
                <Stack.Screen options={{headerShown: false}} name="welcome"/>
                <Stack.Screen options={{headerShown: false}} name="main"/>
            </Stack>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: 'green',
        justifyContent: "center",
        alignItems: 'center',
    }
});
