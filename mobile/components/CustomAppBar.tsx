import React, { useState, useEffect } from 'react';
import { Appbar, Portal, Text } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname } from 'expo-router';
import BackendAddressDialog from '@/components/BackendAddressDialog';

const ADDRESS_KEY = 'backend_address';
const PORT_KEY = 'backend_port';

const CustomAppBar: React.FC<NativeStackHeaderProps> = ({ navigation, back, options, route }) => {
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState('localhost');
  const [port, setPort] = useState('8080');
  const path_name = usePathname();

  useEffect(() => {
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
    setAddress(await AsyncStorage.getItem(ADDRESS_KEY) ?? 'localhost');
    setPort(await AsyncStorage.getItem(PORT_KEY) ?? '8080');
    setVisible(true);
  }
  const hideDialog = () => setVisible(false);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(ADDRESS_KEY, address);
      await AsyncStorage.setItem(PORT_KEY, port);
    } catch (error) {
      console.error('Failed to save backend settings', error);
    }
    hideDialog();
  };

  const getHeaderAction = () => {
    if (back) {
      return <Appbar.BackAction onPress={navigation.goBack} />;
    } else if (route.name !== 'index' || path_name.startsWith("/main")) {
        return <Appbar.Action icon="menu" onPress={() => {}} />;
    } else {
      return null;
    }
  }

  return (
    <>
      <Appbar.Header>
        <>
          {getHeaderAction()}
        </>
        <Appbar.Content title={options.title} />
        {path_name.startsWith("/welcome") ? 
          <Appbar.Action icon="dots-vertical" onPress={showDialog} /> : null
        }
      </Appbar.Header>

      <Portal>
        <BackendAddressDialog
          visible={visible}
          onDismiss={hideDialog}
          address={address}
          setAddress={setAddress}
          port={port}
          setPort={setPort}
          onSave={handleSave}
        />
      </Portal>
    </>
  );
};

export default CustomAppBar;
