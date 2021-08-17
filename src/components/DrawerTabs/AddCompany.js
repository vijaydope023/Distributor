import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Addcompanys = () => {
  const [companyName, changeCompanyName] = React.useState('');
  const [companyAddress, changeCompanyAddress] = React.useState('');
  const [companyPhoneNumber, changeCompanyPhoneNumber] = React.useState('');
  return (
    <View>
      <Text>Add company</Text>
      <TextInput
        placeholder={'company name'}
        value={companyName}
        onChangeText={changeCompanyName}
      />
      <TextInput
        placeholder={'company Address'}
        value={companyAddress}
        onChangeText={changeCompanyAddress}
      />
      <TextInput
        placeholder={'company phone number'}
        value={companyPhoneNumber}
        onChangeText={changeCompanyPhoneNumber}
      />
      <Button
        title="Add company"
        onPress={() =>
          database()
            .ref(`/Distributors/${auth().currentUser.uid}/Companies`)
            .push()
            .set({companyName, companyAddress, companyPhoneNumber})
            .then(() => console.log('data updated successfully!!'))
        }
      />
    </View>
  );
};

export default Addcompanys;
