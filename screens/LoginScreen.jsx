import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONT_SIZES} from '../constants';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {baseUrl} from '../constants';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function LoginScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '266362311161-nsmmsnh70bpsfqn82e7b2utrb55h05v3.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken, user} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      console.log('User signed in successfully');
      console.log(user);

      navigation.navigate('HomePage', {user});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User canceled sign-in');
      } else {
        console.error('Error signing in with Google:', error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.backgroundImage}>
      <StatusBar />

      <View style={styles.container}>
        <View style={styles.logo} />

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => {
            navigation.navigate('EmailPhone');
          }}>
          <Text style={styles.signInText}>LOGIN WITH EMAIL / PHONE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={onGoogleButtonPress}>
          <Image
            source={require('../assets/images/google.png')}
            style={styles.googleLogo}
          />
          <Text style={styles.signInText}>CONTINUE WITH GOOGLE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => console.log('CONTINUE WITH FACEBOOK')}>
          <Image
            source={require('../assets/images/facebook.png')}
            style={styles.googleLogo}
          />
          <Text style={styles.signInText}>CONTINUE WITH FACEBOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0.05 * h,
    width: w,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.dark_peach,
    borderRadius: 25,
    marginBottom: 100,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    width: 0.8 * w,
    borderRadius: 25,
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  signInText: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: FONT_SIZES.regular,
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.transparent,
    width: 0.8 * w,
    borderRadius: 25,
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderColor: COLORS.white,
    borderWidth: 1,
  },
  signUpText: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: FONT_SIZES.regular,
  },
});
