import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Avatar } from "react-native-paper";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

const AccountScreen = () => {
  const imageBackground = {
    uri: "https://drive.google.com/uc?export=view&id=1e-j17rDi3XQm0n3xc4-Byeaq1VkoARSW",
  };
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const likesData = [
    {
      id: 1,
      firstName: "Sonny",
      lastName: "Sangha",
      job: "Software Developer",
      photoURL: "http://avatars.githubusercontent.com/u/24712956?v=4",
      age: 40,
    },
    {
      id: 2,
      firstName: "Barack",
      lastName: "Obama",
      job: "Software Developer",
      photoURL:
        "https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/masterrepository/performer%20images/496675/barackobama-1.jpg",
      age: 45,
    },
    {
      id: 3,
      firstName: "Elon",
      lastName: "Musk",
      job: "Software Developer",
      photoURL:
        "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg",
      age: 40,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={imageBackground}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.accountContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Avatar.Image
                style={styles.avatarImg}
                size={130}
                source={{ uri: currentUser.photoURL }}
              />
            </View>
            <Text style={styles.avatarText}>
              {currentUser.displayName}, {currentUser.age}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Settings")}
            >
              <View style={styles.buttonFill}>
                <Ionicons
                  style={styles.buttonIcon}
                  name="settings-sharp"
                  size={37}
                  color="#ff9eb5"
                />
              </View>
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginTop: 40 }]}
              onPress={() => navigation.navigate("Edit Profile")}
            >
              <View style={styles.buttonFill}>
                <MaterialCommunityIcons
                  style={styles.buttonIcon}
                  name="lead-pencil"
                  size={37}
                  color="#ff9eb5"
                />
              </View>
              <Text style={styles.buttonText}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Safety")}
            >
              <View style={styles.buttonFill}>
                <AntDesign
                  style={styles.buttonIcon}
                  name="Safety"
                  size={37}
                  color="#ff9eb5"
                />
              </View>
              <Text style={styles.buttonText}>Safety</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.likesContainer}>
          <View style={styles.likesTitle}>
            <View style={styles.likesAvatarContainer}>
              <Avatar.Image
                style={styles.likesAvatar}
                size={40}
                source={{ uri: likesData[0].photoURL }}
              />
            </View>
            <Text style={styles.likesText}>
              {likesData.length} people like you
            </Text>
          </View>
          <Text style={styles.likesContent}>
            See them now with MyDestiny Gold. Upgrade your love life to unlock
            the best features MyDestiny has to offer
          </Text>
          <TouchableOpacity style={styles.buttonLikes}>
            <Button
              mode="contained"
              textColor="#f59124"
              buttonColor="#ffebef"
              onPress={() => navigation.navigate("Like")}
            >
              <Text style={styles.buttonLikesContent}>See who likes you</Text>
            </Button>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountContainer: {
    flexDirection: "column",
    marginTop: 10,
    flex: 2 / 3,
  },
  image: {
    flex: 1,
  },
  // Account information
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    borderColor: "#ffb8c9",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  avatarImg: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#3d3b73",
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonFill: {
    backgroundColor: "white",
    borderColor: "black",
    height: 70,
    width: 70,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonIcon: {
    paddingTop: 14.5,
    textAlign: "center",
  },
  buttonText: {
    color: "#616161",
    fontSize: 16,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  // Likes
  likesContainer: {
    flex: 1 / 3,
    margin: 10,
  },
  likesTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  likesAvatarContainer: {
    borderColor: "#fbbc05",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 46,
    width: 46,
    borderRadius: 100,
  },
  likesAvatar: {
    opacity: 0.2,
  },
  likesText: {
    textTransform: "capitalize",
    fontSize: 28,
    lineHeight: 30,
    color: "#3d3b73",
    fontWeight: "600",
    textAlign: "center",
    paddingLeft: 10,
  },
  likesContent: {
    fontSize: 18,
    lineHeight: 20,
    color: "#09101d",
    textAlign: "center",
    paddingTop: 8,
  },
  buttonLikes: {
    width: 260,
    alignSelf: "center",
    marginTop: 10,
  },
  buttonLikesContent: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});

export default AccountScreen;
