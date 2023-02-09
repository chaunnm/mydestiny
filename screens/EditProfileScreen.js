import { View, Text, Button } from "react-native";
import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";

const EditProfileScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateDisplayName = async (newDisplayName) => {
    if (!currentUser) return;

    try {
      await currentUser.updateProfile({ displayName: newDisplayName });

      auth()
        .currentUser.reload()
        .then(() => {
          setCurrentUser(auth().currentUser);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {currentUser ? (
        <Text>Welcome, {currentUser.displayName}</Text>
      ) : (
        <Text>Please log in</Text>
      )}
      <Button
        title="Update Display Name"
        onPress={() => updateDisplayName("Test")}
      />
    </View>
  );
};

export default EditProfileScreen;
