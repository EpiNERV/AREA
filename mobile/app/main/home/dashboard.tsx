import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SearchBar } from '@rneui/themed';

export default function Dashboard() {
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
