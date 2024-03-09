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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONT_SIZES} from '../constants';
import axios from 'axios';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function EmailPhone() {
  const navigation = useNavigation();

  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleCancel = () => {
    setEmailPhone('');
    setPassword('');
    navigation.navigate('Login');
  };

  const handleSubmit = () => {
    const userData = {
      [emailPhone.includes('@') ? 'email' : 'phoneNo']: emailPhone,
      password: password,
      userType: 'Customer',
    };
    console.log(userData);

    axios
      .post('http://192.168.0.155:4000/login', userData)
      .then(function (res) {
        //saveTokenToStorage(res.data.token);
        if (res.status === 200) {
          navigation.navigate('HomePage');
        }
        // console.log(userData);
      })
      .catch(function (e) {
        console.log(e.message);
      });
  };

  //   // check if phone or email is valid
  //   const isEmail = emailPhone.includes('@');
  //   const isPhone = emailPhone.length === 10 && !isNaN(emailPhone);

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
            LOGIN
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
          <Text style={styles.inputHeading}>ENTER EMAIL / PHONE</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.light_gray}
            value={emailPhone}
            autoCapitalize="none"
            onChangeText={text => setEmailPhone(text)}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>PASSWORD</Text>
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

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{color: COLORS.dark_peach}}>Forgot Password?</Text>
        </TouchableOpacity>

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
    padding: 0.02 * h,
    width: 0.35 * w,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.dark_peach,
  },
  buttonSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0.02 * h,
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
