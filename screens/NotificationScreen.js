import { View, Text, StyleSheet, Switch } from "react-native";
import { Divider } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const NotificationScreen = () => {
  const [isEnabled1, setIsEnabled1] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  const toggleSwitch3 = () => setIsEnabled3((previousState) => !previousState);
  const toggleSwitch4 = () => setIsEnabled4((previousState) => !previousState);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notificationContainer}>
        <Divider style={styles.divider} />
        <View style={styles.button}>
          <LinearGradient
            colors={["rgba(255,184,201,0.45)", "#FF85A2"]}
            style={styles.buttonFill}
          >
            <Entypo
              name="sound"
              style={styles.buttonIcon}
              size={30}
              color="#fff"
            />
          </LinearGradient>
          <Text style={styles.buttonText}>Sound</Text>
          <Switch
            trackColor={{ false: "#C4C4C4", true: "#FF85A2" }}
            thumbColor={isEnabled1 ? "#FFF" : "#FFF"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.button}>
          <LinearGradient
            colors={["rgba(255,184,201,0.45)", "#FF85A2"]}
            style={styles.buttonFill}
          >
            <MaterialCommunityIcons
              name="volume-vibrate"
              style={styles.buttonIcon}
              size={30}
              color="#fff"
            />
          </LinearGradient>
          <Text style={styles.buttonText}>Vibrate</Text>
          <Switch
            trackColor={{ false: "#C4C4C4", true: "#FF85A2" }}
            thumbColor={isEnabled2 ? "#FFF" : "#FFF"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.button}>
          <LinearGradient
            colors={["rgba(255,184,201,0.45)", "#FF85A2"]}
            style={styles.buttonFill}
          >
            <MaterialCommunityIcons
              name="lightbulb-on"
              style={styles.buttonIcon}
              size={30}
              color="#fff"
            />
          </LinearGradient>
          <Text style={styles.buttonText}>New tips available</Text>
          <Switch
            trackColor={{ false: "#C4C4C4", true: "#FF85A2" }}
            thumbColor={isEnabled3 ? "#FFF" : "#FFF"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch3}
            value={isEnabled3}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.button}>
          <LinearGradient
            colors={["rgba(255,184,201,0.45)", "#FF85A2"]}
            style={styles.buttonFill}
          >
            <MaterialCommunityIcons
              name="heart-cog"
              style={styles.buttonIcon}
              size={30}
              color="#fff"
            />
          </LinearGradient>
          <Text style={styles.buttonText}>New service available</Text>
          <Switch
            trackColor={{ false: "#C4C4C4", true: "#FF85A2" }}
            thumbColor={isEnabled4 ? "#FFF" : "#FFF"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch4}
            value={isEnabled4}
          />
        </View>
        <Divider style={styles.divider} />
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
  divider: {
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
    width: "70%",
  },
});

export default NotificationScreen;
