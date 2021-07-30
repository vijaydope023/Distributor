import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProductCategoryList = ({subProductName, itemNo, variant}) => {
  return (
    <View style={styles.container}>
      <Text>{itemNo}</Text>
      <Text>{subProductName}</Text>
      <Text>{variant}</Text>
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
