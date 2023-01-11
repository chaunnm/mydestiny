import { SafeAreaView, View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import Header from "../components/Header";

const PhoneScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }
  return !confirm ? (
    <SafeAreaView>
      <Header title="Login using Phone Number" />
      <TextInput
        placeholder="+84"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />
      <Button
        title="Send OTP"
        onPress={() => signInWithPhoneNumber(phoneNumber)}
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <Header title="Login using Phone Number" />
      <TextInput
        placeholder="6-digit verification"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </SafeAreaView>
  );
};

export default PhoneScreen;
