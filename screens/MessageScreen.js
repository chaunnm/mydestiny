import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
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

const MessageScreen = () => {
  const { currentUser } = useAuth();
  const { params } = useRoute();
  const tailwind = useTailwind();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

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
      />

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
          style={tailwind(
            "flex-row justify-between items-center border-t border-gray-200 px-5 px-2"
          )}
        >
          <TextInput
            style={tailwind("h-10 text-lg")}
            placeholder="Send message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Send" color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
