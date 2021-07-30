import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ShopList = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default ShopList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
  },
});
