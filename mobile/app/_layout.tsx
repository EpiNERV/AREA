import React from 'react'
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function _layout() {
    return (
        <PaperProvider>
            <Stack screenOptions={{ animation: 'none', headerShown: false}} >
                <Stack.Screen options={{headerShown: false}} name="welcome"/>
            </Stack>
        </PaperProvider>
    );
}
