import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONT_SIZES, baseUrl} from '../constants';
import axios from 'axios';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function VerifyForgotPasswordOTP() {
  const navigation = useNavigation();

  const [otp, setOtp] = useState('');
  const route = useRoute();
  const email = route.params?.email;

  ToastAndroid.show('OTP sent to ' + email, ToastAndroid.LONG);

  const handleCancel = () => navigation.navigate('Login');

  const handleSubmit = () => {
    const userData = {
      otp: otp,
      email: email,
      userType: 'Customer',
    };

    axios
      .post(baseUrl + '/verify-otp', userData)
      .then(res => {
        console.log(res.data.token);
        if (res.status === 200) {
          navigation.navigate('NewPassword', {pwdToken: res.data.token});
          ToastAndroid.show('OTP verified successfully', ToastAndroid.SHORT);
        }
      })
      .catch(e => {
        console.log(e.message);
        ToastAndroid.show('Invalid OTP', ToastAndroid.SHORT);
      });

    console.log(userData);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: COLORS.light_peach}}>
      <StatusBar />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{width: 0.9 * w}}>
          <Icon
            name="arrow-left"
            size={25}
            color={COLORS.black}
            style={{marginTop: 20}}
          />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text
            style={{
              fontSize: FONT_SIZES.extraLarge,
              fontWeight: 'bold',
              color: COLORS.black,
            }}>
            Verify OTP
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZES.regular,
              fontWeight: 'normal',
              color: COLORS.black,
            }}>
            Enter the verification OTP sent to the requested email.
          </Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>Enter OTP</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter OTP"
            placeholderTextColor={COLORS.light_gray}
            value={otp}
            autoCapitalize="none"
            onChangeText={text => setOtp(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
            <Text style={{color: COLORS.dark_peach}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
            <Text style={{color: COLORS.white}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 0.9 * w,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonCancel: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0.01 * h,
    width: 0.35 * w,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.dark_peach,
  },
  buttonSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0.01 * h,
    width: 0.35 * w,
    borderRadius: 25,
    backgroundColor: COLORS.dark_peach,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: 0.9 * w,
    marginTop: 0.02 * h,
    marginBottom: 0.04 * h,
  },
  input: {
    padding: 0.01 * h,
  },
  inputField: {
    color: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    width: 0.9 * w,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  inputHeading: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: FONT_SIZES.regular,
    marginLeft: 5,
  },
  passwordField: {
    color: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    width: 0.9 * w,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    alignItems: 'center',
  },
});
