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
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONT_SIZES} from '../constants';
import {
  isEmail,
  storeData,
  validEmail,
  validPhoneNo,
  validPassword,
  listAllKeys,
} from '../utilities';
import axios from 'axios';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function EmailPhone() {
  const navigation = useNavigation();

  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const userType = 'Customer';

  const [showPassword, setShowPassword] = useState(false);

  const handleCancel = () => navigation.navigate('Login');

  const handleSubmit = async () => {
    let proceed = false;
    let data = {};
    let token = '';
    if (isEmail(emailPhone)) {
      if (validEmail(emailPhone) && validPassword(password)) {
        data = {
          email: emailPhone,
          password: password,
          userType: userType,
        };
        proceed = true;
      }
    } else {
      if (validPhoneNo(emailPhone) && validPassword(password)) {
        data = {
          phoneNo: emailPhone,
          password: password,
          userType: userType,
        };
        proceed = true;
      }
    }

    if (proceed) {
      try {
        const response = await axios.post(
          'http://192.168.0.108:4000/login',
          data,
        );
        token = response.data.token;
        storeData('token', token);
        try {
          const response = await axios.get(
            'http://192.168.0.108:4000/homepage',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          console.log(response.data.message);
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          navigation.navigate('HomePage', {token});
        } catch (error) {
          console.log(error.response.data.message);
        }
      } catch (error) {
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        console.log(error.response.data.message);
      }
    }
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
            Login
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZES.regular,
              fontWeight: 'normal',
              color: COLORS.black,
            }}>
            Login to your account
          </Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>Enter email / mobile no.</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your email / mobile no."
            placeholderTextColor={COLORS.light_gray}
            value={emailPhone}
            autoCapitalize="none"
            onChangeText={text => setEmailPhone(text)}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>Enter password</Text>
          <View style={styles.passwordField}>
            <TextInput
              style={{flex: 1, color: COLORS.black}}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.light_gray}
              secureTextEntry={!showPassword}
              value={password}
              autoCapitalize="none"
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={!showPassword ? 'eye' : 'eye-slash'}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.forgotPasswordButtonContainer}>
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{color: COLORS.dark_peach}}>Forgot Password?</Text>
          </TouchableOpacity>
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
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordButtonContainer: {
    alignItems: 'flex-end',
    width: 0.9 * w,
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
