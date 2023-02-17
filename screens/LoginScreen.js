import {
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import "expo-dev-client";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen() {
  const { onGoogleButtonPress, loading, signIn, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const tailwind = useTailwind();

  const logIn = () => {
    onGoogleButtonPress()
      .then(() => {
        ToastAndroid.showWithGravity(
          "Welcome to My Destiny! 🎉",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      })
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
    <SafeAreaView style={tailwind("flex-1 relative")}>
      <StatusBar hidden={true} translucent={true} />
      <ImageBackground
        resizeMode="cover"
        style={tailwind("flex-1")}
        source={{ uri: "https://i.imgur.com/OcN0LpS.png" }}
      >
        <Text
          style={tailwind(
            "font-semibold mx-auto mt-10 px-5 text-center text-white top-2/5 leading-5"
          )}
        >
          By clicking <Text style={tailwind("font-bold")}>Sign In</Text>, you
          agree with our <Text style={tailwind("font-bold")}>Terms</Text>. Learn
          how we process your data in our{" "}
          <Text style={tailwind("font-bold underline")}>Privacy Policy</Text>{" "}
          and{" "}
          <Text style={tailwind("font-bold underline")}>Cookies Policy</Text>.
        </Text>

        <View style={tailwind("bottom-0 absolute mx-3 mr-2")}>
          <TouchableOpacity
            style={[
              tailwind(
                "w-11/12 flex-row justify-between items-center p-3 px-12 mx-auto rounded-xl border-2 border-primary my-1 mt-3 bg-white"
              ),
            ]}
            onPress={logIn}
          >
            <Image
              style={tailwind("w-7 h-7 ml-1.5 rounded-full")}
              source={{
                uri: "https://pbs.twimg.com/profile_images/1605297940242669568/q8-vPggS_400x400.jpg",
              }}
            />
            <Text
              style={tailwind("text-center font-bold text-gray-600 text-lg")}
            >
              SIGN IN WITH GOOGLE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              tailwind(
                "w-11/12 flex-row justify-between items-center p-3 px-14 mx-auto rounded-xl border-2 border-primary my-1 mt-3 bg-white"
              ),
            ]}
            onPress={() => navigation.navigate("Email")}
          >
            <MaterialIcons name="email" size={22} color="black" />
            <Text
              style={tailwind("text-center font-bold text-gray-600 text-lg")}
            >
              SIGN IN WITH EMAIL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              tailwind(
                "w-11/12 flex-row justify-between items-center p-3 px-8 mx-auto rounded-xl border-2 border-primary my-1 mt-3 bg-white"
              ),
            ]}
            onPress={() => navigation.navigate("Phone")}
          >
            <MaterialIcons name="phone" size={22} color="black" />
            <Text
              style={tailwind("text-center font-bold text-gray-600 text-lg")}
            >
              SIGN IN WITH PHONE NUMBER
            </Text>
          </TouchableOpacity>

          <View style={tailwind("flex-row justify-center my-3 items-center")}>
            <Text style={tailwind("text-gray-500 font-bold")}>
              Don't have an account yet?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text
                style={tailwind("text-primary font-bold text-xl underline")}
              >
                {" "}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
