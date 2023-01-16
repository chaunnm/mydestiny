import { View, Text, StyleSheet } from "react-native";
import React from 'react';
import { Avatar } from "react-native-paper";
import useAuth from "../hooks/useAuth";

const AvatarAccount = () => {
    const { currentUser } = useAuth();
  return (
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
  );
}

const styles = StyleSheet.create({
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
});

export default AvatarAccount