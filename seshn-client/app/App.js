// app.js

/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import Auth0 from 'react-native-auth0';
import axios from 'axios';
import UserPostList from './UserPostList';
import {Text} from '@rneui/themed';

let credentials = require('./auth0-config');

const auth0 = new Auth0(credentials);

const App = () => {
  let [accessToken, setAccessToken] = useState(null);
  let [inputText, setInputText] = useState(null);
  let [bodyText, setBodyText] = useState(null);
  let [userPosts, setUserPosts] = useState([]);

  let loggedIn = accessToken !== null;

  const fetchUserPosts = () => {
    if (!loggedIn) {
      return;
    }
    axios
      .get('http://localhost:5004/posts/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        console.log(response.data);
        setUserPosts(response.data.reverse());
      });
  };

  useEffect(() => {
    fetchUserPosts();
  }, [accessToken]);

  const onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
        audience: 'https://dev-xf5mji86.us.auth0.com/api/v2/',
      })
      .then(credentials => {
        setAccessToken(credentials.accessToken);
          console.log(credentials.accessToken);
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

  const createPost = () => {
    axios
      .post(
        'http://localhost:5004/posts/',
        {
          title: inputText,
          body: bodyText,
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        fetchUserPosts();
        console.log(res);
      });
  };


  if (loggedIn) {
    return (
      <ScrollView>
        <View style={{padding: 20}}>
          <Text h4 style={{marginTop: 50}}>
            Create post:
          </Text>
          <TextInput
            editable={true}
            placeholder="Title"
            onChangeText={text => setInputText(text)}
            value={inputText}
            style={styles.input}
          />
          <TextInput
            editable={true}
            placeholder="Body"
            onChangeText={text => setBodyText(text)}
            value={bodyText}
            style={styles.input}
          />
          <Button onPress={createPost} title={'Create'} />

          <Text h4 style={{marginTop: 20}}>
            Your posts:
          </Text>
          <UserPostList posts={userPosts} />
          <View style={{marginTop: 30}} />
          <Button onPress={onLogout} title={'Log out'} />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Please log in</Text>
        <Button onPress={onLogin} title={'Log in'} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 60,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;
