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
import {COLORS, FONT_SIZES, baseUrl} from '../constants';
import {allValid} from '../utilities';
import axios from 'axios';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const userType = 'Customer';

  const handleCancel = () => navigation.navigate('Login');

  const handleSubmit = async () => {
    const data = {
      fullName: fullName,
      displayName: displayName,
      phoneNo: phoneNo,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      userType: userType,
    };

    console.log(data);

    if (allValid(data)) {
      try {
        const response = await axios.post(baseUrl + '/register', {
          fullName: data.fullName,
          displayName: data.displayName,
          phoneNo: data.phoneNo,
          email: data.email,
          password: data.password,
          userType: data.userType,
        });
        console.log(response);
        if (response.status === 201) {
          navigation.navigate('EmailPhone');
        }
        console.log(response.data.message);
        ToastAndroid.show(response.data.message, ToastAndroid.LONG);
      } catch (error) {
        console.log(error.message);
        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
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
            Sign Up
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZES.regular,
              fontWeight: 'normal',
              color: COLORS.black,
            }}>
            Create your new account
          </Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>Full name</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your full name"
            placeholderTextColor={COLORS.light_gray}
            value={fullName}
            onChangeText={text => setFullName(text)}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>Display name</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your display name"
            placeholderTextColor={COLORS.light_gray}
            value={displayName}
            onChangeText={text => setDisplayName(text)}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>Mobile no.</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your mobile number"
            placeholderTextColor={COLORS.light_gray}
            value={phoneNo}
            onChangeText={text => setPhoneNo(text)}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>Email</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.light_gray}
            value={email}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>Password</Text>
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
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>Confirm Password</Text>
          <View style={styles.passwordField}>
            <TextInput
              style={{flex: 1, color: COLORS.black}}
              placeholder="Confirm your password"
              placeholderTextColor={COLORS.light_gray}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              autoCapitalize="none"
              onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon
                name={!showConfirmPassword ? 'eye' : 'eye-slash'}
                size={20}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
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
