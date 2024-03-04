import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

export default function HomePage({route}) {
  const {user} = route.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '266362311161-nsmmsnh70bpsfqn82e7b2utrb55h05v3.apps.googleusercontent.com',
    });
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);
  const onLogoutButtonPress = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      setLoggedIn(false);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {user && (
        <Image
          source={{uri: user.photo}}
          style={{width: 100, height: 100, marginBottom: 20, borderRadius: 50}}
        />
      )}
      <Text style={styles.text}>Hello {user ? user.name : 'test_user'}!</Text>
      <Text style={styles.text}>Welcome to HomePage!</Text>
      <Button title="Logout" onPress={onLogoutButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
  },
});
