import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getObjectData} from '../utilities';

export default function HomePage() {
  const navigation = useNavigation();
  let [googleUser, setGoogleUser] = useState(null);

  useEffect(() => {
    console.log('googleUser modified');
    const getGoogleUser = async () => {
      try {
        const data = await getObjectData('googleUser');
        setGoogleUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    getGoogleUser();
  }, []);

  return (
    <View style={styles.container}>
      {googleUser && (
        <Image
          source={{uri: googleUser.photo}}
          style={{width: 100, height: 100, marginBottom: 20, borderRadius: 50}}
        />
      )}
      <Text style={styles.text}>
        Hello {googleUser ? googleUser.name : 'test_user'}!
      </Text>
      <Text style={styles.text}>Welcome to HomePage!</Text>
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
