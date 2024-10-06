import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Spacer from '@/components/Spacer';

export default function Notifications() {
  return (
    <ScrollView style={styles.container} scrollEnabled={true}>
      <View style={styles.userboxContainer}>
        <Image src="" style={styles.userImage}></Image>
        <Text style={styles.text}>Name</Text>
        <Spacer size={10} />
        <Text >email here</Text>
      </View>
      <Text>User info</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
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
