import React from 'react';
import { Appbar } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const CustomAppBar: React.FC<NativeStackHeaderProps> = ({ navigation, back, options }) => {
  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <Appbar.Action icon="menu" onPress={() => {}} />
      )}
      <Appbar.Content title={options.title} />
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
};

export default CustomAppBar;
