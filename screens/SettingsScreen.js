import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarAccount from "../components/AvatarAccount";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <AvatarAccount />
      </View>
      <View>
        <Text>SettingsScreen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBFC",
    flex: 1,
  },
  avatarContainer: {
    marginTop: 10,
  },
});

export default SettingsScreen;
