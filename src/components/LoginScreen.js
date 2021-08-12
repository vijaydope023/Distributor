import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, changeEmailText] = React.useState('');
  const [password, changePassword] = React.useState('');
  return (
    <View>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Email"
        onChangeText={changeEmailText}
        value={email}
      />
      <TextInput
        placeholder="Password"
        onChangeText={changePassword}
        value={password}
      />
      <Button
        title="Login"
        onPress={() =>
          auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              console.log('user signed in');
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }

              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }

              console.error(error);
            })
        }
      />
    </View>
  );
};

export default LoginScreen;
