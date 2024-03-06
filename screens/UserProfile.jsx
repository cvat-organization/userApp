import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Fa6 from 'react-native-vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const navigation = useNavigation();
  const [windowDimensions, setWindowDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });
  
  useEffect(() => {
    const onChange = ({ window: { width: newWidth, height: newHeight } }) => {
      setWindowDimensions({ width: newWidth, height: newHeight });
      // console.log("rotated");
    };
  
    Dimensions.addEventListener('change', onChange);
  }, []);

  const { width, height } = windowDimensions;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.profileBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Icon name="arrow-left" color="black" size={20} style={{ marginLeft: width/10 }} />
        </TouchableOpacity>
        <View>
          <Text style={{ textAlignVertical: 'center', color: "black", fontWeight: "bold", fontSize: 20, marginLeft: width/2 - width/10 - 60 }}>PROFILE</Text>
        </View>
      </View>
      <View style={styles.container}>

        <View style={styles.profileContainer}>

          <Image
            source={require("../assets/images/rashford.jpg")}
            style={styles.profilePicture}
          />
          <Text style={styles.name}>
            Sarvesh{"\n"}
            <Text style={{ fontSize: 10 }}>
              ID: {width}
            </Text>
          </Text>

        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 12, color: "black" }}>Hi! My name is Sarvesh. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis itaque architecto eos quia, nesciunt reprehenderit laboriosam. Nulla provident dicta in voluptate voluptates natus libero recusandae praesentium facilis sequi magni quasi sit voluptatum adipisci, placeat, at iure. Voluptatum minus quam fugit placeat eaque corporis, suscipit dolor sunt repellat dolorem sapiente perspiciatis.</Text>
        </View>

        <View style={styles.profileInfo}>

          <View style={styles.profileInfoAttribute}>
            <Icon name="globe" size={width/20} color="black" style = {{marginRight: width/50}} />
            <Text style={{ color: "black", textAlign: 'center' }}>Sarvesh.com</Text>
          </View>

          <View style={styles.profileInfoAttribute}>
            <Icon name="envelope-o" size={width/20} color="black" style = {{marginRight: width/50}} />
            <Text style={{ color: "black", textAlign: 'center' }}>sarvesh@gmail.com</Text>
          </View>

        </View>

        <View style={styles.profileInfo}>

          <View style={styles.profileInfoAttribute}>
            <Icon name="map-marker" size={width/20} color="black" style = {{marginRight: width/50}} />
            <Text style={{ color: "black" }}>Chennai</Text>
          </View>

          <View style={styles.profileInfoAttribute}>
            <Icon name="phone" size={width/20} color="black" style = {{marginRight: width/50}} />
            <Text style={{ color: "black" }}>9150032951</Text>
          </View>

        </View>

        <View style={styles.profileInfo}>

          <View style={styles.profileInfoAttribute}>
            <Icon name="transgender" size={width/20} color="black" style = {{marginRight: width/50}} />
            <Text style={{ color: "black" }}>Male</Text>
          </View>

          <View style={styles.profileInfoAttribute}>
            <Icon name="birthday-cake" size={width/20} color="black" style = {{marginRight: width/50}} />
            <Text style={{ color: "black" }}>2003</Text>
          </View>

        </View>

        <View style={styles.profileInfo}>

          <View style={styles.profileInfoAttribute}>
            <Icon name="balance-scale" size={width/20} color="black" style = {{marginRight: width/50}} />
            <Text style={{ color: "black" }}>Metric</Text>
          </View>

          <View style={styles.profileInfoAttribute}>
            <Icon name="globe" size={width/20} color="black" style = {{marginRight: width/50}} />
            <Text style={{ color: "black" }}>66 cm</Text>
          </View>

        </View>

        <View style={styles.profileInfo}>

          <View style={styles.profileInfoAttribute}>
            <Fa6 name="weight-scale" size={width/20} color="black" style = {{marginRight: width/50}} />
            <Text style={{ color: "black" }}>85 kg</Text>
          </View>

          <View style={styles.profileInfoAttribute}>
            <MaterialIcon name="human-male-height-variant" size={width/20} color="black" style = {{marginRight: width/50}} />
            <Text style={{ color: "black" }}>172 cm</Text>
          </View>

        </View>
        <View style = {styles.horizontalLine}></View>
        <View style = {{marginTop: width/20, marginLeft: width/10, marginRight: width/10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <View style = {{flexDirection: 'row', flex: 1}}>
            <Text style = {{color: "#D19641", fontWeight: 'bold'}}>10 </Text>
            <Text style = {{color: 'black'}}>Following</Text>
          </View>
          <View style = {{flexDirection: 'row'}}>
            <Text style = {{color: "#D19641", fontWeight: 'bold'}}>20 </Text>
            <Text style = {{color: 'black'}}>Followers</Text>
          </View>
          
        </View>

        <View style = {{marginTop: width/20, marginLeft: width/20, marginRight: width/20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <View style = {{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity style = {styles.findFriends}>
              <Icon name = "user-plus" size = {15} color = "black" style = {{marginLeft: width/50}}></Icon>
              <Text style = {{color: "#D19641", marginRight: width/50}}>
                Find Friends
              </Text>
            </TouchableOpacity>
          </View>
          <View style = {{flexDirection: 'row'}}>
            <TouchableOpacity style = {styles.findFriends}>
              <Text style = {{color: "#D19641", marginRight: width/30, marginLeft: width/30}}>
                Refer
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>

      </View>

      <View style = {{padding: 10, justifyContent: 'space-between', flexDirection: 'row'}}>
        <TouchableOpacity style = {styles.subscriptionButton}>
          <Text style = {{color: 'grey'}}>
            Subscription </Text>
          <Text style = {{fontWeight: 'bold', color: "#D16941"}}>
            FREE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.subscriptionButton}>
          <Text style = {{color: 'grey'}}>
            Change Password </Text>
          
        </TouchableOpacity>

        <TouchableOpacity style = {styles.subscriptionButton}>
          <Text style = {{color: 'grey'}}>
            LOGOUT </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

const styles =  StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FAECD4',
  },
  profileBar: {
    flexDirection: 'row',
    alignItems: "center",
    borderWidth: 1,
    height: 40,
    backgroundColor: "#FAECD4",
    
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },

  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    

  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',

  },

  container: {
    padding: 20,
    backgroundColor: "white"
  },

  profileInfo: {
    marginTop: "2%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "90%",
    alignItems: "flex-start"

  },

  profileInfoAttribute: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  horizontalLine: {
    width: "100%",
    borderWidth: 0.5,
    marginTop: 10,
    backgroundColor: 'grey'
  },

  findFriends: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center'
    

  },

  subscriptionButton: {
    flexDirection: 'row', 
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#D19641"
  }
  


});