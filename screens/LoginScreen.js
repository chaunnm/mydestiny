import {
  Text,
  TextInput,
  View,
  ImageBackground,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import "expo-dev-client";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import React, { useState, useEffect, useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const { onGoogleButtonPress, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const onHandleLogin = () => {
    if (email === "") {
      ToastAndroid.showWithGravity(
        "Please type your email! 😿",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (password === "") {
      ToastAndroid.showWithGravity(
        "Please type your password! 😿",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (email !== "" && password !== "") {
      signIn(email, password);
    }
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
        <View style={tailwind("flex-1")}>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
              {" "}
              Log In
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "black", fontWeight: "600", fontSize: 14 }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                color: "black",
                fontWeight: "800",
                fontSize: 18,
                textDecorationLine: "underline",
              }}
            >
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <GoogleSigninButton
          style={tailwind("w-80 h-16 absolute bottom-40 rounded-2xl ml-9")}
          size={GoogleSigninButton.Size.Wide}
          onPress={logIn}
        />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  button: {
    backgroundColor: "#f57c00",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
