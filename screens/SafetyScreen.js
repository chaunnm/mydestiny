import { View, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Text, Card, Button } from "react-native-paper";
import useAuth from "../hooks/useAuth";


const SafetyScreen = () => {
  const { currentUser } = useAuth();
  const LeftContent = (props) => (
    <Avatar.Image
      {...props}
      source={{
        uri: "https://drive.google.com/uc?export=view&id=1FoEa3NZo9BTDJ6dnY8iAo83Phwf6RyXF",
      }}
      size={60}
    />
  );

  return (
    <View style={{ padding: 10, backgroundColor: "#FFFBFC", flex: 1 }}>
      <View style={styles.introContainer}>
        <View style={{ width: "70%" }}>
          <Text variant="displayMedium" style={{ fontFamily: "NunitoBold" }}>
            Hi {currentUser.displayName}
          </Text>
          <Text
            variant="bodyLarge"
            style={{ fontFamily: "Nunito", textAlign: "justify" }}
          >
            Here's what you need to know about MyDestiny's safety
          </Text>
        </View>
        <View style={styles.avatar}>
          <Avatar.Image
            style={styles.avatarImg}
            size={60}
            source={{ uri: currentUser.photoURL }}
          />
        </View>
      </View>
      <View>
        <Text variant="headlineMedium" style={{ fontFamily: "NunitoBold" }}>
          Safety
        </Text>
        <Card style={{ backgroundColor: "#fff" }}>
          <Card.Title
            title="The Basics"
            subtitle="What you need to know to be safer on MyDestiny -- all in one place"
            // subtitleNumberOfLines="4"
            left={LeftContent}
          />
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  introContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  avatar: {
    borderColor: "#ffb8c9",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    width: 75,
    borderRadius: 100,
  },
  avatarImg: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SafetyScreen;
