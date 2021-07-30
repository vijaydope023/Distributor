import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const CompanyList = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default CompanyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
  },
});
