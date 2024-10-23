import React from 'react';
import { Appbar } from 'react-native-paper';
import { DrawerHeaderProps } from '@react-navigation/drawer';

const CustomDrawerAppBar: React.FC<DrawerHeaderProps> = ({ layout, options, route, navigation }) => {
  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title={options.title} />
    </Appbar.Header>
  );
};

export default CustomDrawerAppBar;
