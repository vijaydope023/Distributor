import React from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const LogoutScreen = () => {
  return (
    <View>
      <Text>Log out</Text>
      <Button
        title="Log out"
        onPress={() =>
          auth()
            .signOut()
            .then(() => console.log('user logged out'))
        }
      />
    </View>
  );
};

export default LogoutScreen;
