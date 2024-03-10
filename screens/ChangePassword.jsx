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
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONT_SIZES} from '../constants';
import {passwordsMatch, validPassword} from '../utilities';
import axios from 'axios';
import {baseUrl} from '../constants';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function ChangePassword() {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const route = useRoute();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVjMTc5ZjM5MWI0YzBhMjNhNGJjYWYiLCJpYXQiOjE3MTAwNTg4Njd9.ioJp2kbs9YATmAVW4qY8FSAMtqrz4x-IFVaSOfL18jo';
  const handleCancel = () => {
    setPassword('');
    setConfirmPassword('');
    navigation.navigate('UserProfile');
  };
  //const pwdToken = route.params?.pwdToken;
  const handleSubmit = () => {
    const userData = {
      password: password,
    };
    axios
      .post(
        baseUrl + '/request-pwd-change',
        {
          password: oldPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, //sending the session token
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          if (
            validPassword(password) &&
            passwordsMatch(password, confirmPassword)
          ) {
            //console.log('called');
            axios
              .post(
                baseUrl + '/new-password',
                {
                  password: password,
                },
                {
                  headers: {
                    Authorization: `Bearer ${res.data.token}`,
                  },
                },
              )
              .then(res => {
                console.log(res);
                if (res.status === 201) {
                  navigation.navigate('Login');
                }
              })
              .catch(e => {
                console.log(e.message);
              });
          }
        }
      })
      .catch(e => {
        console.log(e.message);
      });

    //console.log(userData);
  };

  // encrypt passwords

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
            Change Password
          </Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>Enter old password</Text>
          <View style={styles.passwordField}>
            <TextInput
              style={{flex: 1, color: COLORS.black}}
              placeholder="Enter old password"
              placeholderTextColor={COLORS.light_gray}
              secureTextEntry={!showOldPassword}
              value={oldPassword}
              autoCapitalize="none"
              onChangeText={text => setOldPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setShowOldPassword(!showOldPassword)}>
              <Icon
                name={!showOldPassword ? 'eye' : 'eye-slash'}
                size={20}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputHeading}>Enter new password</Text>
          <View style={styles.passwordField}>
            <TextInput
              style={{flex: 1, color: COLORS.black}}
              placeholder="Enter new password"
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
          <Text style={styles.inputHeading}>Confirm password</Text>
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
