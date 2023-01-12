import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
// import Header from "../components/Header";
import OTPTextView from "react-native-otp-textinput";
import useAuth from "../hooks/useAuth";

const PhoneScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);

  const { onGoogleButtonPress } = useAuth();

  //Login with Google
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
      {/* <Header title="Login using Phone Number" /> */}
      <ScrollView style={tailwind("px-5")}>
        <TouchableOpacity
          style={[
            tailwind(
              "flex-row justify-center items-center bg-white border-2 border-gray-300 h-12 rounded-xl my-5"
            ),
            phoneNumber ? tailwind("border-primary") : tailwind(""),
          ]}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png",
            }}
            style={tailwind("p-3 m-1 ml-2 h-0.5 w-8 rounded")}
          />
          <Text style={tailwind("text-lg")}>+84</Text>
          <Entypo
            name="chevron-small-down"
            size={20}
            color="black"
            style={tailwind("border-r font-bold")}
          />
          <TextInput
            style={tailwind("flex-1 ml-1.5 text-lg")}
            keyboardType="phone-pad"
            maxLength={9}
            textContentType="telephoneNumber"
            placeholder="Enter Your Number"
            underlineColorAndroid="transparent"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
          />
        </TouchableOpacity>
        <Text style={tailwind("leading-5 pb-3 text-justify")}>
          We will send a SMS with a verification code. Message and data rates
          may apply.{" "}
          <Text style={tailwind("underline")}>
            Learn what happens when your number changes.
          </Text>
        </Text>
      </ScrollView>
      <TouchableOpacity
        style={[tailwind("w-11/12 p-3 mx-auto rounded-xl bg-primary my-0.5")]}
        onPress={() => signInWithPhoneNumber("+84" + phoneNumber)}
      >
        <Text style={tailwind("text-center font-bold text-white text-xl")}>
          Send OTP
        </Text>
      </TouchableOpacity>
      <Text style={tailwind("text-center text-lg my-1")}>Or</Text>
      <TouchableOpacity
        style={[
          tailwind(
            "w-11/12 flex-row justify-between items-center p-3 px-12 mx-auto rounded-xl border-2 border-primary my-1"
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
        <Text style={tailwind("text-center font-bold text-gray-600 text-lg")}>
          SIGN IN WITH GOOGLE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          tailwind(
            "w-11/12 flex-row justify-between items-center p-3 px-14 mx-auto rounded-xl border-2 border-primary my-1"
          ),
        ]}
      >
        <MaterialIcons name="email" size={22} color="black" />
        <Text style={tailwind("text-center font-bold text-gray-600 text-lg")}>
          SIGN IN WITH EMAIL
        </Text>
      </TouchableOpacity>
      <View style={tailwind("flex-row justify-center my-3 items-center")}>
        <Text style={tailwind("text-gray-500 font-bold")}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={tailwind("text-primary font-bold text-xl underline")}>
            {" "}
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      {/* <Header title="Login using Phone Number" /> */}
      {/* <TextInput
        placeholder="6-digit verification"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Confirm Code" onPress={() => confirmCode()} /> */}

      <ScrollView style={tailwind("px-4 mt-20")}>
        <OTPTextView
          tintColor="#FF85A2"
          inputCount={6}
          handleTextChange={(text) => setCode(text)}
          defautValue={code}
          textInputStyle={tailwind("rounded-xl border-4")}
        />
        <Text style={tailwind("my-2 text-center")}>6-digit verification</Text>
        <View>
          <Text style={tailwind("text-center text-base")}>
            Enter OTP code we sent to{" "}
            <Text style={tailwind("font-bold")}>
              {"0" + phoneNumber.slice(3, -2) + "xx"}
            </Text>
          </Text>
          <View style={tailwind("justify-center items-center flex")}>
            <Text style={tailwind("text-base")}>
              This code will expire in{" "}
              {/* <CountDown
                // until={60 + 30}
                until={10}
                size={10}
                digitStyle={tailwind("bg-transparent pt-1")}
                digitTxtStyle={tailwind("text-lg text-something")}
                timeToShow={["M", "S"]}
                timeLabels={{ m: null, s: null }}
                showSeparator
                separatorStyle={tailwind("pt-1 mt-1 text-primary")}
              /> */}
            </Text>
          </View>
        </View>
        <Text style={tailwind("text-center mt-5")}>
          Haven't received the code yet?
        </Text>
        <TouchableOpacity
          style={[
            tailwind(
              "w-full p-3 mx-auto bg-transparent rounded-xl border-something border-2 mt-3"
            ),
          ]}
          onPress={() => setConfirm(null)}
        >
          <Text
            style={tailwind("text-center font-bold text-something text-xl")}
          >
            Resend Code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tailwind("w-full p-3 mx-auto rounded-xl bg-primary my-4")]}
          onPress={() => confirmCode()}
        >
          <Text style={tailwind("text-center font-bold text-white text-xl")}>
            Confirm Code
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneScreen;
