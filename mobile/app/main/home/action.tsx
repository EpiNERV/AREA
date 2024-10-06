import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import Spacer from '@/components/Spacer';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';


export default function Action() {
  const [search, setSearch] = useState('');

  const [actionTitle, setActionTitle] = useState('');
  const [actionBody, setActionBody] = useState('');

  const s = require('@/app/style');

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const router = useRouter();

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[isFocus && { color: 'blue'}]}>
          Choose Action
        </Text>
      );
    }
    return null;
  };

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  return (
    <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[isFocus && { borderColor: 'blue' }]}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />

      <View style={[styles.box, , {display: value ? 'flex' : "none"}]}>
        <TextInput
          style={[s.input, {display: value ? 'normal' : "none"} ]}
          placeholder='Title'
          autoCapitalize='none'
          value={actionTitle}
          onChangeText={setActionTitle} // Update email state
        />
        <Spacer size={20} />
        <TextInput
          style={s.input}
          placeholder='Comment'
          autoCapitalize='none'
          keyboardType="email-address"
          value={actionBody}
          onChangeText={setActionBody}
        />
        <Button title="Save Changes" onPress={() => router.navigate("/main/home/dashboard")}/>

      </View>
    <Spacer size={30} showLine={true} />

    <View style={[styles.box, , {display: value ? 'flex' : "none"}]}>
        
    </View>

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
    paddingVertical: 20,
    marginVertical: 20,
    borderColor: "black",
    shadowOpacity: 20,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});
