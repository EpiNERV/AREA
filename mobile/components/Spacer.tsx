import React from 'react';
import { View } from 'react-native';

const Spacer = ({ size = 10 }) => {
  return <View style={{ height: size }} />;
};

export default Spacer;