import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
  ToastAndroid,
} from "react-native";
import { Divider } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarAccount from "../components/AvatarAccount";
import {
  FontAwesome,
  Entypo,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import useAuth from "../hooks/useAuth";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const { signOut } = useAuth();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const confirmLogout = () => {
    Alert.alert("Sign Out", "Are you sure want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          signOut().then(() => {
            ToastAndroid.showWithGravity(
              "You've been logged out successfully! 🎉",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          });
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <AvatarAccount />
      </View>
      <View style={styles.settingContainer}>
        <Divider style={styles.divider} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Notification")}
        >
          <LinearGradient
            colors={["rgba(255,184,201,0.45)", "#FF85A2"]}
            style={styles.buttonFill}
          >
            <FontAwesome
              style={styles.buttonIcon}
              name="bell-o"
              size={30}
              color="#fff"
            />
          </LinearGradient>
          <Text style={styles.buttonText}>Notification</Text>
          <Entypo name="chevron-right" size={30} color="#FF9EB5" />
        </TouchableOpacity>
        <Divider />
        <View style={styles.button}>
          <LinearGradient
            colors={["rgba(255,184,201,0.45)", "#FF85A2"]}
            style={styles.buttonFill}
          >
            <Ionicons
              name="eye"
              style={styles.buttonIcon}
              size={30}
              color="#fff"
            />
          </LinearGradient>
          <Text style={styles.buttonText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#C4C4C4", true: "#FF85A2" }}
            thumbColor={isEnabled ? "#FFF" : "#FFF"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Divider />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Invite Friends")}
        >
          <LinearGradient
            colors={["rgba(255,184,201,0.45)", "#FF85A2"]}
            style={styles.buttonFill}
          >
            <FontAwesome5
              name="user-friends"
              style={styles.buttonIcon}
              size={24}
              color="#fff"
            />
          </LinearGradient>
          <Text style={styles.buttonText}>Invite Friends</Text>
          <Entypo name="chevron-right" size={30} color="#FF9EB5" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.button} onPress={confirmLogout}>
          <LinearGradient
            colors={["rgba(255,184,201,0.45)", "#FF85A2"]}
            style={styles.buttonFill}
          >
            <FontAwesome
              name="sign-out"
              style={styles.buttonIcon}
              size={30}
              color="#fff"
            />
          </LinearGradient>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        <Divider />
      </View>
      <View style={styles.version}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://drive.google.com/uc?export=view&id=1ivegcsxSkRS5V9tmJ246nTd6Q7s0k0WG",
          }}
        />
        <Text style={styles.textLogo}>Version 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBFC",
    flex: 1,
    padding: 10,
  },
  settingContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  buttonFill: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  buttonIcon: {
    textAlign: "center",
    paddingTop: 10,
  },
  buttonText: {
    fontFamily: "NunitoBold",
    marginLeft: 20,
    fontSize: 18,
    width: "70%",
  },
  version: {
    marginTop: 2,
  },
  tinyLogo: {
    width: 71,
    height: 56,
    marginTop: 20,
    alignSelf: "center",
  },
  textLogo: {
    alignSelf: "center",
    paddingTop: 5,
    color: "#616161",
  },
});

export default SettingsScreen;
