import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Dimensions,
  StatusBar,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import { useTailwind } from "tailwind-rn";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { useRoute } from "@react-navigation/native";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const dimensionsForScreen = Dimensions.get("screen");

const MessageScreen = () => {
  const { currentUser } = useAuth();
  const { params } = useRoute();
  const tailwind = useTailwind();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [media, setMedia] = useState();

  const { matchDetails } = params;

  useEffect(
    () =>
      firestore()
        .collection("matches")
        .doc(matchDetails.id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot({
          next: (snapshot) => {
            setMessages(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
          },
        }),
    [matchDetails, firestore]
  );

  const sendImage = () => {
    firestore()
      .collection("matches")
      .doc(matchDetails.id)
      .collection("messages")
      .add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        userId: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: matchDetails.users[currentUser.uid].photoURL,
        message: "",
        image: media,
      });
    setMedia("");
  };

  const handleUploadImage = async (img) => {
    const cloudName = "dtu8kyhxq";
    const cloudURL = "https://api.cloudinary.com/v1_1/dtu8kyhxq/auto/upload";
    const uploadPreset = "uw_test";

    let image = {
      uri: img,
      type: `test/${img.split(".")[1]}`,
      name: `test.${img.split(".")[1]}`,
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
          firestore()
            .collection("matches")
            .doc(matchDetails.id)
            .collection("messages")
            .add({
              timestamp: firestore.FieldValue.serverTimestamp(),
              userId: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: matchDetails.users[currentUser.uid].photoURL,
              message: "",
              image: data.url,
            });
        });
    }
  };

  const uploadMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleUploadImage(result.assets[0].uri);
    }
  };

  const sendMessage = () => {
    firestore()
      .collection("matches")
      .doc(matchDetails.id)
      .collection("messages")
      .add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        userId: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: matchDetails.users[currentUser.uid].photoURL,
        message: input,
        image: "",
      });
    setInput("");
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <Header
        title={
          getMatchedUserInfo(matchDetails.users, currentUser.uid).displayName
        }
        callEnabled
        videoEnabled
        moreEnabled
      />

      {/* <ImageBackground
        source={{
          uri: "https://i.pinimg.com/564x/3d/8c/2f/3d8c2f2c82c1c9ef1e27be645cd1aa17.jpg",
        }}
        style={tailwind("flex-1")}
      > */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tailwind("flex-1")}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            style={tailwind("pl-4")}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === currentUser.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View
          style={tailwind("relative flex-row items-center px-5 px-2 pb-3 pt-2")}
        >
          {/* <ImageBackground
            source={{
              uri: "https://i.pinimg.com/564x/3d/8c/2f/3d8c2f2c82c1c9ef1e27be645cd1aa17.jpg",
            }}
            style={tailwind(
              "relative flex-row items-center px-5 px-2 pb-3 pt-2"
            )}
            blurRadius={20}
          > */}
          <TextInput
            style={[
              tailwind(
                "h-10 text-lg rounded-md border border-gray-400 px-2 pr-14"
              ),
              { flex: 1 },
            ]}
            multiline
            rows={4}
            placeholder="Type your message"
            placeholderTextColor="#999"
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <TouchableOpacity
            style={[tailwind("absolute right-11 bottom-4")]}
            onPress={sendMessage}
          >
            <Image
              style={[tailwind("w-10 h-8")]}
              source={{ uri: "https://i.imgur.com/I7YNY31.png" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind("ml-2 mr-0.5")}
            onPress={uploadMedia}
          >
            <FontAwesome5 name="camera" size={24} color={"#3D3B73"} />
          </TouchableOpacity>
          {/* </ImageBackground> */}
        </View>
      </KeyboardAvoidingView>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export default MessageScreen;
