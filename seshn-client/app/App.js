// app.js

import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import Auth0 from 'react-native-auth0';

var credentials = require('./auth0-config');

const auth0 = new Auth0(credentials);

const App = () => {
  let [accessToken, setAccessToken] = useState(null);

  const onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
        audience: 'https://dev-xf5mji86.us.auth0.com/api/v2/',
      })
      .then(credentials => {
        Alert.alert('AccessToken: ' + credentials.accessToken);
        setAccessToken(credentials.accessToken);
        console.log('AccessToke: ' + credentials.accessToken);
      })
      .catch(error => console.log(error));
  };

  const onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert('Logged out!');
        setAccessToken(null);
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  };

  let loggedIn = accessToken !== null;
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Auth0Sample - Login </Text>
      <Text>You are{loggedIn ? ' ' : ' not '}logged in. </Text>
      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;
