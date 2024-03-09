import React from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {COLORS} from '../constants';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>CAREVIGIL TRACKER</Text>
      <ActivityIndicator
        size="large"
        color={COLORS.black}
        style={styles.loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcfc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  loading: {
    marginTop: 25,
  },
});
