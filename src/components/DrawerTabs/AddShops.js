import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const AddShops = () => {
  const [shopName, changeShopName] = React.useState('');
  const [shopAddress, changeShopAddress] = React.useState('');
  const [shopPhoneNumber, changeShopPhoneNumber] = React.useState('');
  return (
    <View>
      <Text>Add shop</Text>
      <TextInput
        placeholder={'Shop name'}
        value={shopName}
        onChangeText={changeShopName}
      />
      <TextInput
        placeholder={'Shop Address'}
        value={shopAddress}
        onChangeText={changeShopAddress}
      />
      <TextInput
        placeholder={'Shop phone number'}
        value={shopPhoneNumber}
        onChangeText={changeShopPhoneNumber}
      />
      <Button
        title="Add Shop"
        onPress={() =>
          database()
            .ref(`/Distributors/${auth().currentUser.uid}/Shops`)
            .push()
            .set({shopName, shopAddress, shopPhoneNumber})
            .then(() => console.log('data updated successfully!!'))
        }
      />
    </View>
  );
};

export default AddShops;
