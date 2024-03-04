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

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// update fonts
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const regular = 'Montserrat_400Regular';
const bold = 'Montserrat_700Bold';

export default function LoginScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '266362311161-nsmmsnh70bpsfqn82e7b2utrb55h05v3.apps.googleusercontent.com',
    });
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);
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
        <View style={styles.logo}>
          <View style={styles.logoContainer} />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            console.log('Continue with phone number');
            navigation.navigate('HomePage');
          }}>
          <Text style={{fontFamily: bold, color: 'white'}}>
            CONTINUE WITH PHONE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleSignIn}
          onPress={onGoogleButtonPress}>
          <Image
            source={require('../assets/images/google.png')}
            style={styles.googleLogo}
          />
          <Text style={{fontFamily: bold, color: 'white'}}>
            SIGN IN WITH GOOGLE
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  googleSignIn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1954170',
    width: 0.8 * w,
    borderRadius: 25,
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#d1954170',
    width: 0.8 * w,
    borderRadius: 25,
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#D19641',
    borderRadius: 25,
    marginBottom: 100,
  },
});
