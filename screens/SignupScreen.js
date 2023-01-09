import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";

const SignupScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const { signUp, updateProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [displayName, setDisplayname] = useState("");
  const [avatar, setAvatar] = useState("");

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
    if (displayName === "") {
      ToastAndroid.showWithGravity(
        "You must have a display name! 😿",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (avatar === "") {
      ToastAndroid.showWithGravity(
        "You must have an avatar! 😿",
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
    if (email !== "" && password !== "") {
      signUp(email, password, displayName, avatar).catch((err) =>
        Alert.alert("Sign up error: ", err.message)
      );
    }
  };

  return (
    <SafeAreaView>
      <Header title="Sign Up" />
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
      <TextInput
        style={styles.input}
        placeholder="Enter password again"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={repassword}
        onChangeText={setRepassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Your display name"
        autoCapitalize="none"
        value={displayName}
        onChangeText={setDisplayname}
      />
      <TextInput
        style={styles.input}
        placeholder="Avatar URL"
        autoCapitalize="none"
        value={avatar}
        onChangeText={setAvatar}
      />
      <TouchableOpacity onPress={onHandleSignup} style={styles.button}>
        <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
          {" "}
          Sign Up
        </Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}>
            {" "}
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
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
