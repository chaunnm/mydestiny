import {
  Text,
  View,
  ImageBackground,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";

const EmailScreen = () => {
  const { onGoogleButtonPress, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const tailwind = useTailwind();

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
  return (
    <View style={tailwind("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tailwind("w-full h-full flex-1")}
        source={{ uri: "https://i.imgur.com/1IA4GJW.png" }}
      >
        <Image
          resizeMode="contain"
          style={tailwind("w-full h-72 mt-5 mb-1")}
          source={{ uri: "https://i.imgur.com/fgW8E8D.png" }}
        />
        <ScrollView style={tailwind("px-5")}>
          <TextInput
            style={[
              tailwind(
                "w-full h-12 bg-white mt-2 mb-2 rounded-lg border border-gray-300"
              ),
              { fontFamily: "Nunito" },
            ]}
            placeholder="Your email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            left={<TextInput.Icon icon="email" size={20} />}
            autoFocus={true}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[
              tailwind(
                "w-full h-12 bg-white mt-2 mb-2 rounded-lg border border-gray-300"
              ),
              { fontFamily: "NunitoBold" },
            ]}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            left={<TextInput.Icon icon="eye" size={20} />}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={tailwind("my-3")}>
            <Text
              style={[
                tailwind("text-primary text-center underline text-lg"),
                { fontFamily: "NunitoBold" },
              ]}
            >
              Forgot the password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tailwind("w-full p-3 mx-auto rounded-xl bg-red-400 mt-3")]}
            onPress={onHandleLogin}
          >
            <Text
              style={[
                tailwind("text-center text-white text-xl"),
                { fontFamily: "NunitoBold" },
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          <View style={tailwind("flex-row justify-center my-3 items-center")}>
            <Text
              style={[tailwind("text-gray-500"), { fontFamily: "NunitoBold" }]}
            >
              Dont't have an account yet?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
              <Text
                style={[
                  tailwind("text-primary text-xl underline"),
                  { fontFamily: "NunitoBold" },
                ]}
              >
                {" "}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default EmailScreen;

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
