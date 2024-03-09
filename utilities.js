import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Fix toast getting cut off: validPassword

export const allValid = data => {
  return (
    validFullName(data.fullName) &&
    validDisplayName(data.displayName) &&
    validPhoneNo(data.phoneNo) &&
    validEmail(data.email) &&
    validPassword(data.password) &&
    passwordsMatch(data.password, data.confirmPassword)
  );
};

export const validFullName = fullName => {
  if (fullName.trim().length > 0) {
    return true;
  } else {
    ToastAndroid.show('Invalid Full Name', ToastAndroid.SHORT);
    return false;
  }
};

export const validDisplayName = displayName => {
  if (displayName.trim().length > 0) {
    return true;
  } else {
    ToastAndroid.show('Invalid Display Name', ToastAndroid.SHORT);
    return false;
  }
};

export const validPhoneNo = phoneNo => {
  const phoneRegex = /^\d{10}$/;
  if (phoneRegex.test(phoneNo)) {
    return true;
  } else {
    ToastAndroid.show('Invalid Phone Number', ToastAndroid.SHORT);
    return false;
  }
};

export const validEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    return true;
  } else {
    ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
    return false;
  }
};

export const validPassword = password => {
  const minLength = 8;
  const containsUpperCase = /[A-Z]/.test(password);
  const containsLowerCase = /[a-z]/.test(password);
  const containsNumber = /[0-9]/.test(password);
  const containsSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    password,
  );

  if (
    password.length >= minLength &&
    containsUpperCase &&
    containsLowerCase &&
    containsNumber &&
    containsSpecialChar
  ) {
    return true;
  } else {
    ToastAndroid.show(
      'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character',
      ToastAndroid.SHORT,
    );
    return false;
  }
};

export const passwordsMatch = (password, confirmPassword) => {
  if (password === confirmPassword && password.length > 0) {
    return true;
  } else {
    ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
    return false;
  }
};

export const isEmail = emailPhone => emailPhone.includes('@');

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const storeObjectData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getObjectData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export const listAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys);
  } catch (error) {
    console.log(error);
  }
};
