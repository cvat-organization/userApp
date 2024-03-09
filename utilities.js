import {ToastAndroid} from 'react-native';

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
