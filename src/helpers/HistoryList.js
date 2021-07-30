import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const HistoryList = ({onPress, date, total}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <Text>{date}</Text>
      <Text>{total}</Text>
    </TouchableOpacity>
  );
};

export default HistoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
  },
});
