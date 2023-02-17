import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import * as ImagePicker from "expo-image-picker";

const SignupScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const { signUp, updateProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loader, setLoader] = useState(false);

  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    const cloudName = "dtu8kyhxq";
    const cloudURL = "https://api.cloudinary.com/v1_1/dtu8kyhxq/auto/upload";
    const uploadPreset = "uw_test";

    let image = {
      uri: avatar,
      type: `test/${avatar.split(".")[1]}`,
      name: `test.${avatar.split(".")[1]}`,
    };
    const formData = new FormData();
    if (image != undefined) {
      formData.append("file", image);
      formData.append("cloud_name", cloudName);
      formData.append("upload_preset", uploadPreset);

      await fetch(cloudURL, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (email !== "" && password !== "" && data.url) {
            signUp(email, password, data.url);
          }
        })
        .catch((err) => Alert.alert("Sign up error: ", err.message));
    }
  };

  const onHandleSignup = () => {
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
    if (repassword === "") {
      ToastAndroid.showWithGravity(
        "You must insert your password again! 😿",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (password !== repassword) {
      ToastAndroid.showWithGravity(
        "Your passwords didn't match! 😿",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (avatar === "") {
      ToastAndroid.showWithGravity(
        "You must choose an avatar! 😿",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    } else {
      setLoader(true);
      handleUploadImage().then(() => setLoader(false));
    }
  };

  return loader ? (
    <View style={tailwind("flex-1 justify-center items-center")}>
      <ActivityIndicator size={55} />
    </View>
  ) : (
    <SafeAreaView style={tailwind("flex-1")}>
      <View>
        <Text style={tailwind("text-4xl my-3 text-center leading-10")}>🥳</Text>
        <Text style={tailwind("leading-5 px-5 justify-center")}>
          You will need to fill in some information fields to create an{" "}
          <Text style={tailwind("font-bold")}>My Destiny</Text> account. Don't
          worry, we will secure your information.
        </Text>
      </View>
      <TouchableOpacity
        style={tailwind(
          "bg-red-100 border-2 border-red-400 rounded-full h-36 w-36 mx-auto my-5 overflow-hidden"
        )}
        onPress={pickAvatar}
      >
        <ImageBackground
          resizeMode="contain"
          style={tailwind("flex-1 w-10 mx-auto ")}
          source={{
            uri: "https://i.imgur.com/Ht1QbaR.png",
          }}
        />
        {avatar && (
          <Image
            style={tailwind("h-36 w-36 rounded-full")}
            resizeMode="cover"
            source={{
              uri: avatar,
            }}
          />
        )}
      </TouchableOpacity>
      <ScrollView style={tailwind("px-5")}>
        <View>
          <TextInput
            style={tailwind(
              "w-full h-12 bg-white mt-2 mb-2 rounded-lg border border-gray-300"
            )}
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
            style={tailwind(
              "w-full h-12 bg-white mt-2 mb-2 rounded-lg border border-gray-300"
            )}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            left={<TextInput.Icon icon="eye" size={20} />}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={tailwind(
              "w-full h-12 bg-white mt-2 mb-2 rounded-lg border border-gray-300"
            )}
            placeholder="Enter password again"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            left={<TextInput.Icon icon="eye" size={20} />}
            value={repassword}
            onChangeText={setRepassword}
          />
          <TouchableOpacity
            style={[tailwind("w-11/12 p-3 mx-auto rounded-xl bg-red-400 mt-5")]}
            onPress={onHandleSignup}
          >
            <Text style={tailwind("text-center font-bold text-white text-xl")}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <View style={tailwind("flex-row justify-center my-3 items-center")}>
            <Text style={tailwind("text-gray-500 font-bold")}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Email")}>
              <Text
                style={tailwind("text-primary font-bold text-xl underline")}
              >
                {" "}
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
