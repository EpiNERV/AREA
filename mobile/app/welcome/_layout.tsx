import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router';


export default function _layout() {
    return (
        <View style={styles.container}>
            <Slot />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    header: {
        backgroundColor: 'green',
        justifyContent: "center",
        alignItems: 'center',
    }
});
