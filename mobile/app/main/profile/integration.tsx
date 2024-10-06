import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MateriaIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from '@/components/Button'


export default function Settings() {
  const iconSize = 150;
  return (
    <ScrollView style={styles.container} scrollEnabled={true}>

      <View style={styles.box}>
        <Ionicons name='logo-github' size={iconSize} />
            <Text style={styles.text}>GitHub</Text>
        <Button title="Add"/>
      </View>

      <View style={styles.box}>
        <MateriaIcons name='gmail' size={iconSize} />
            <Text style={styles.text}>GMail</Text>
        <Button title="Add"/>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      // alignItems: 'center',
      paddingHorizontal: 30,
  },
  box: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    marginVertical: 20,
    borderColor: "black",
    shadowOpacity: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});