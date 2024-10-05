import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';
// import { SearchBar } from 'react-native-screens';

export default function Dashboard() {
  const navigation = useNavigation();
  const openDrawer = ()=>{
    navigation.dispatch(DrawerActions.openDrawer())
  }
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputContainer}></SearchBar>
      <Text>Dashboard</Text>
      {/* <Button title="open drawer" onPress={openDrawer}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#e0e0e0',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
