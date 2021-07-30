import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ProductCategoryList = ({productName, onPress, img}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <Text>{img}</Text>
      <Text>{productName}</Text>
    </TouchableOpacity>
  );
};

export default ProductCategoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
  },
});
