import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomePage from '../screens/HomePage';
import SignUpScreen from '../screens/SignUpScreen';
import EmailPhone from '../screens/EmailPhone';
import ForgotPassword from '../screens/ForgotPassword';
import NewPassword from '../screens/NewPassword';
import UserProfile from '../screens/UserProfile';
import VerifyForgotPasswordOTP from '../screens/VerifyForgotPasswordOTP';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="EmailPhone" component={EmailPhone} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ForgotPwdOTP" component={VerifyForgotPasswordOTP} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
