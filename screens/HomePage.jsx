import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function HomePage({route}) {
  const {user} = route.params || {};
  const navigation = useNavigation();

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
      <Button
        title="ViewProfile"
        onPress={() => navigation.navigate('UserProfile')}
      />
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
