import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const ProductCategoryList = ({
  subProductName,
  itemNo,
  counterRate,
  itemCount,
  setInputCount,
  enteredItemCount,
}) => {
  const [inputCount, onChangeInputCount] = React.useState(enteredItemCount);
  return (
    <View style={styles.container}>
      <Text>{itemNo}</Text>
      <Text>{subProductName}</Text>
      <Text>{counterRate}</Text>
      <Text>{itemCount}</Text>
      <TextInput
        onChangeText={text => {
          let no = text.replace(/[^0-9]/g, '');
          if (parseInt(no) > parseInt(itemCount)) {
            no = itemCount;
          }
          no = String(no);
          onChangeInputCount(no);
          setInputCount(no);
        }}
        value={inputCount}
        keyboardType="numeric"
      />
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
