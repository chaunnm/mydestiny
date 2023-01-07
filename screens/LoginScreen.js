import { Text, View, ImageBackground, ToastAndroid } from "react-native";
import "expo-dev-client";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import React, { useState, useEffect, useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const { onGoogleButtonPress, loading } = useAuth();
  const navigation = useNavigation();
  const tailwind = useTailwind();

  const logIn = () => {
    onGoogleButtonPress()
      .then(() =>
        ToastAndroid.showWithGravity(
          "Welcome to Tinder, have a great day! 🎉",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      )
      .catch((error) => {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // console.log("User ben Login: ", user);

  return (
    <View style={tailwind("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tailwind(" flex-1")}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <Text style={tailwind("text-3xl font-semibold mx-auto mt-10")}>
          Welcome to Tinder
        </Text>
        <GoogleSigninButton
          style={tailwind("w-80 h-16 absolute bottom-40 rounded-2xl ml-9")}
          size={GoogleSigninButton.Size.Wide}
          onPress={logIn}
        />
      </ImageBackground>
    </View>
  );
}
