import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const HistoryDetailList = ({onPress, shopName, total}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <Text>{shopName}</Text>
      <Text>{total}</Text>
    </TouchableOpacity>
  );
};

export default HistoryDetailList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
  },
});
