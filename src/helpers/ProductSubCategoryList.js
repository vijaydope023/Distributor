import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProductCategoryList = ({
  subProductName,
  itemNo,
  counterRate,
  itemCount,
}) => {
  return (
    <View style={styles.container}>
      <Text>{itemNo}</Text>
      <Text>{subProductName}</Text>
      <Text>{counterRate}</Text>
      <Text>{itemCount}</Text>
    </View>
  );
};

export default ProductCategoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
  },
});
