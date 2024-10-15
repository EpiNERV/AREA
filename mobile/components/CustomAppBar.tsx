import React, { useState, useEffect } from 'react';
import { Appbar, Dialog, Portal, Button, TextInput } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ADDRESS_KEY = 'backend_address';
const PORT_KEY = 'backend_port';

const CustomAppBar: React.FC<NativeStackHeaderProps> = ({ navigation, back, options, route }) => {
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState('localhost');
  const [port, setPort] = useState('8080');

  useEffect(() => {
    // Load saved address and port on component mount
    const loadSettings = async () => {
      try {
        const savedAddress = await AsyncStorage.getItem(ADDRESS_KEY);
        const savedPort = await AsyncStorage.getItem(PORT_KEY);
        if (savedAddress !== null) {
          setAddress(savedAddress);
        }
        if (savedPort !== null) {
          setPort(savedPort);
        }
      } catch (error) {
        console.error('Failed to load backend settings', error);
      }
    };
    loadSettings();
  }, []);

  const showDialog = async () => {
    setAddress(await AsyncStorage.getItem(ADDRESS_KEY) || 'localhost');
    setPort(await AsyncStorage.getItem(PORT_KEY) || '8080');
    setVisible(true);
  }
  const hideDialog = () => setVisible(false);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(ADDRESS_KEY, address);
      await AsyncStorage.setItem(PORT_KEY, port);
      // You can add additional logic here, such as updating API endpoints
    } catch (error) {
      console.error('Failed to save backend settings', error);
    }
    hideDialog();
  };

  return (
    <>
      <Appbar.Header>
        {back ? (
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : route.name !== 'index' ? (
          <Appbar.Action icon="menu" onPress={() => {}} />
        ) : null}
        <Appbar.Content title={options.title} />
        <Appbar.Action icon="dots-vertical" onPress={showDialog} />
      </Appbar.Header>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Enter Backend Address</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Address"
              value={address}
              onChangeText={text => setAddress(text)}
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Port"
              value={port}
              onChangeText={text => setPort(text)}
              keyboardType="numeric"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleSave}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default CustomAppBar;
