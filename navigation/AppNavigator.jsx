import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import {getData, listAllKeys} from '../utilities';
import {baseUrl} from '../constants';

import LoginScreen from '../screens/LoginScreen';
import HomePage from '../screens/HomePage';
import SignUpScreen from '../screens/SignUpScreen';
import EmailPhone from '../screens/EmailPhone';
import ForgotPassword from '../screens/ForgotPassword';
import NewPassword from '../screens/NewPassword';
import UserProfile from '../screens/UserProfile';
import SplashScreen from '../screens/SplashScreen';
import VerifyForgotPasswordOTP from '../screens/VerifyForgotPasswordOTP';
import ChangePassword from '../screens/ChangePassword';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initialRouteName, setInitialRouteName] = useState('');
  const [loading, setLoading] = useState(true);

  listAllKeys();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getData('token');
        if (token) {
          try {
            const response = await axios.get(baseUrl + '/homepage', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setInitialRouteName('HomePage');
            console.log(response.data.message);
          } catch (error) {
            setInitialRouteName('Login');
            console.error(error);
          }
        } else {
          setInitialRouteName('Login');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000); // 2 seconds
      }
    };

    checkToken();
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="EmailPhone" component={EmailPhone} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="ForgotPwdOTP" component={VerifyForgotPasswordOTP} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
