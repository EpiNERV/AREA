import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacer = ({ size = 10, showLine = false  }) => {
  return     <View style={styles.container}>
  <View style={{ height: size }} />
  {showLine && <View style={styles.line} />}
</View>
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center line if needed
  },
  line: {
    height: 1,           // Thickness of the line
    width: '100%',       // Full width
    backgroundColor: 'gray', // Line color
    marginVertical: 5,   // Space around the line (optional)
  },
});


export default Spacer;