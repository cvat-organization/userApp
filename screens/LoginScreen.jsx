import React, {useEffect} from 'react';
import {
  View,
  Dimensions,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONT_SIZES, baseUrl} from '../constants';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {listAllKeys, storeData, storeObjectData} from '../utilities';
import axios from 'axios';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function LoginScreen() {
  const navigation = useNavigation();
  const userType = 'Customer';

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

      try {
        const response = await axios.post(
          baseUrl + '/oauth-google',
          {
            userType: userType,
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        console.log(response.data.token);
        const token = response.data.token;

        storeData('token', token);
        storeObjectData('googleUser', user);
      } catch (error) {
        console.error(error);
      }

      console.log('Signed in with Google');
      ToastAndroid.show('Signed in with Google', ToastAndroid.SHORT);
      navigation.navigate('BottomTab', {screen: 'HomePage'});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign-In cancelled');
        ToastAndroid.show('Sign-In cancelled', ToastAndroid.SHORT);
      } else {
        console.error(error.message);
      }
    }

    listAllKeys();
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
          <Text style={styles.signInText}>Login with Email / Mobile No.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={onGoogleButtonPress}>
          <Image
            source={require('../assets/images/google.png')}
            style={styles.googleLogo}
          />
          <Text style={styles.signInText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => console.log('CONTINUE WITH FACEBOOK')}>
          <Image
            source={require('../assets/images/facebook.png')}
            style={styles.googleLogo}
          />
          <Text style={styles.signInText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
