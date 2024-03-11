import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Fa6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {clearAll, getData} from '../utilities';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {baseUrl} from '../constants';

export default function UserProfile() {
  const navigation = useNavigation();

  const [windowDimensions, setWindowDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const onChange = ({window: {width: newWidth, height: newHeight}}) => {
      setWindowDimensions({width: newWidth, height: newHeight});
    };

    Dimensions.addEventListener('change', onChange);
  }, []);

  const {width, height} = windowDimensions;
  const name = 'Sarvesh';

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '266362311161-nsmmsnh70bpsfqn82e7b2utrb55h05v3.apps.googleusercontent.com',
    });
  }, []);

  const onLogout = async () => {
    try {
      const signedIn = await GoogleSignin.isSignedIn();
      if (signedIn) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await auth().signOut();
        console.log('Google successfully logged out!');
        ToastAndroid.show('Logged out successfully!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error.message);
    }

    try {
      const token = await getData('token');
      if (token) {
        const response = await axios.post(
          baseUrl + '/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data.message);
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }

    clearAll();
    navigation.navigate('Login');
  };

  const changePwd = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={{...styles.profileBar, justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            color="grey"
            size={20}
            style={{marginLeft: width / 20}}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              textAlignVertical: 'center',
              color: 'grey',
              fontWeight: 'bold',
              fontSize: Math.max(height, width) / 40,
            }}>
            Profile
          </Text>
        </View>
        <TouchableOpacity>
          <Icon
            name="arrow-left"
            color="transparent"
            size={20}
            style={{marginLeft: width / 20}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/rashford.jpg')}
            style={styles.profilePicture}
          />
          <Text style={styles.name}>
            Sarvesh{''}
            <Text style={{fontSize: width / 35, color: 'grey'}}>
              {'\n\n\n'}
              {`{ ${name} }`}
            </Text>
            <Text style={{fontSize: width / 35, color: '#D19641'}}>
              {'\n'}ID: u1234567891
            </Text>
          </Text>
          <View style={styles.editIcons}>
            <TouchableOpacity>
              <Feather
                name="edit"
                size={width / 20}
                color="grey"
                style={{marginRight: width / 35}}></Feather>
            </TouchableOpacity>

            <TouchableOpacity>
              <Feather name="settings" size={width / 20} color="grey"></Feather>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            ...styles.profileInfoAttribute,
            width: 0.9 * width,
            marginTop: height / 30,
            minHeight: height / 8,
          }}>
          <Feather
            name="book-open"
            size={width / 20}
            color="grey"
            style={styles.bioIcons}
          />
          <Text
            style={{
              fontSize: width / 30,
              color: 'grey',
              marginRight: width / 10,
            }}>
            Hi I'm Sarvesh.Hi I'm Sarvesh.Hi I'm Sarvesh.Hi I'm Sarvesh.Hi I'm
          </Text>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.profileInfoAttribute}>
            <Feather
              name="globe"
              size={width / 20}
              color="grey"
              style={styles.bioIcons}
            />
            <Text style={styles.bioFields}>Sarvesh.com</Text>
          </View>

          <View style={styles.profileInfoAttribute}>
            <Icon
              name="envelope-o"
              size={width / 20}
              color="grey"
              style={styles.bioIcons}
            />
            <Text style={styles.bioFields}>ashwin.madavan123@gmail.com</Text>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.profileInfoAttribute}>
            <Icon
              name="map-marker"
              size={width / 20}
              color="grey"
              style={styles.bioIcons}
            />
            <Text style={styles.bioFields}>Chennai</Text>
          </View>

          <View style={styles.profileInfoAttribute}>
            <Icon
              name="phone"
              size={width / 20}
              color="grey"
              style={styles.bioIcons}
            />
            <Text style={styles.bioFields}>9150032951</Text>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.profileInfoAttribute}>
            <Icon
              name="transgender"
              size={width / 20}
              color="grey"
              style={styles.bioIcons}
            />
            <Text style={styles.bioFields}>Male</Text>
          </View>

          <View style={styles.profileInfoAttribute}>
            <Icon
              name="birthday-cake"
              size={width / 20}
              color="grey"
              style={styles.bioIcons}
            />
            <Text style={styles.bioFields}>2003</Text>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.profileInfoAttribute}>
            <Icon
              name="balance-scale"
              size={width / 20}
              color="grey"
              style={styles.bioIcons}
            />
            <Text style={styles.bioFields}>Metric</Text>
          </View>

          <View style={styles.profileInfoAttribute}>
            <IonIcon
              name="footsteps-sharp"
              size={width / 20}
              color="grey"
              style={styles.bioIcons}
            />
            <Text style={styles.bioFields}>66 cm</Text>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.profileInfoAttribute}>
            <Fa6
              name="weight-scale"
              size={width / 20}
              color="grey"
              style={styles.bioIcons}
            />
            <Text style={styles.bioFields}>85 kg</Text>
          </View>

          <View style={styles.profileInfoAttribute}>
            <MaterialIcon
              name="human-male-height-variant"
              size={width / 20}
              color="grey"
              style={styles.bioIcons}
            />
            <Text style={styles.bioFields}>172 cm</Text>
          </View>
        </View>
        <View style={styles.horizontalLine}></View>

        <View
          style={{
            marginTop: width / 20,
            marginLeft: width / 20,
            marginRight: width / 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <View>
            <TouchableOpacity style={styles.followOptions}>
              <Text style={{color: 'black', fontSize: width / 25}}>
                Following
              </Text>
              <Text
                style={{
                  color: '#D19641',
                  fontWeight: 'bold',
                  fontSize: width / 15,
                }}>
                10{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.followOptions}>
              <Text style={{color: 'black', fontSize: width / 25}}>
                Followers
              </Text>
              <Text
                style={{
                  color: '#D19641',
                  fontWeight: 'bold',
                  fontSize: width / 15,
                }}>
                20{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: width / 30,
            marginLeft: width / 20,
            marginRight: width / 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity style={styles.findFriends}>
              <Feather
                name="user-plus"
                size={width / 30}
                color="#D19641"
                style={{
                  marginLeft: width / 50,
                  marginRight: width / 70,
                }}></Feather>
              <Text
                style={{
                  color: '#D19641',
                  marginRight: width / 30,
                  fontSize: width / 40,
                }}>
                Find Friends
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.referButton}>
              <Text
                style={{
                  color: 'white',
                  marginRight: width / 30,
                  marginLeft: width / 30,
                  fontSize: width / 40,
                }}>
                Refer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.subscriptionButton}>
          <Text style={{color: 'grey', fontSize: 12}}>Subscription </Text>
          <Text style={{fontWeight: 'bold', color: '#D16941'}}>FREE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.changePwdButton} onPress={changePwd}>
          <Text style={{color: 'grey', fontSize: 12}}>Change Password </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={{color: 'grey', fontSize: 12}}>Logout </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FAECD4',
  },
  profileBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: 'grey',
    height: Dimensions.get('window').height / 20,
    backgroundColor: '#FAECD4',
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
  },

  profilePicture: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
    borderRadius: 9999999,
    marginRight: Dimensions.get('window').width / 10,
  },

  name: {
    fontSize: Dimensions.get('window').width / 18,
    fontWeight: 'bold',
    color: '#D19641',
  },

  container: {
    padding: Dimensions.get('window').width / 16,
    backgroundColor: 'white',
  },

  profileInfo: {
    marginTop: '2%',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    width: '90%',
    // borderWidth: 1,
    alignItems: 'center',
  },

  profileInfoAttribute: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    //marginRight: Dimensions.get('window').width/60,
    flex: 1,
    padding: Dimensions.get('window').width / 70,
    //borderWidth: 1,
  },

  bioIcons: {
    marginRight: Dimensions.get('window').width / 50,
    minWidth: Dimensions.get('window').width / 15,
    // borderWidth: 1,
  },

  bioFields: {
    color: 'grey',
    fontSize: Dimensions.get('window').width / 35,
  },

  horizontalLine: {
    width: '100%',
    borderWidth: 1,
    marginTop: Dimensions.get('window').height / 60,
    backgroundColor: 'grey',
  },

  findFriends: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0.01 * Dimensions.get('window').height,
    width: 0.35 * Dimensions.get('window').width,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#D19641',
  },

  subscriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 0.02 * Dimensions.get('window').height,
    width: 0.3 * Dimensions.get('window').width,
    borderRadius: 40,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#D19641',
    marginRight: Dimensions.get('window').width / 50,
  },

  changePwdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 0.02 * Dimensions.get('window').height,
    width: 0.3 * Dimensions.get('window').width,
    borderRadius: 40,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: 'grey',
    marginRight: Dimensions.get('window').width / 50,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0.005 * Dimensions.get('window').height,
    width: 0.3 * Dimensions.get('window').width,
    borderRadius: 40,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: 'grey',
  },

  referButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0.01 * Dimensions.get('window').height,
    width: 0.35 * Dimensions.get('window').width,
    borderRadius: 25,
    backgroundColor: '#D19641',
    borderWidth: 1,
    borderColor: '#D19641',
  },
  bottomButtons: {
    padding: Dimensions.get('window').width / 40,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  followOptions: {
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 0.02 * Dimensions.get('window').height,
    width: 0.35 * Dimensions.get('window').width,
    backgroundColor: 'white',
  },

  editIcons: {
    flexDirection: 'row',
    marginTop: -Dimensions.get('window').height / 17,
    marginLeft: Dimensions.get('window').width / 10,
  },
});
