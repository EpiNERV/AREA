import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native';

export default function Notifications() {
    const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} scrollEnabled={true}>
      <View style={styles.userboxContainer}>
        <Image src="" style={styles.userImage}></Image>
        <Text style={styles.text}>Name</Text>
      </View>
      <Text>User info</Text>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      // alignItems: 'center',
      paddingHorizontal: 30,
  },
  userboxContainer: {
    backgroundColor: '#fff',
    padding: 40,
    marginVertical: 20,
    borderColor: "black",
    shadowOpacity: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  userImage: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    marginVertical: 20,
    borderColor: "black",
    shadowOpacity: 20,
    borderRadius: 90,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});
