import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SearchBar } from '@rneui/themed';
import Button from '@/components/Button'
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const [search, setSearch] = useState('');

  const router = useRouter();

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputContainer} />
      <Button title="Add Action"/>

      <ScrollView scrollEnabled={true}>

        <View style={styles.box}>
          <Text style={styles.text}>Action 1</Text>
          <View style={{flexDirection: 'row'}}>
            <Button title="Edit" onPress={() => router.navigate("/main/home/action")}/>
            <Button title="Delete"/>
          </View>
        </View>

      </ScrollView>
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
