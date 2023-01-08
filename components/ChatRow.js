import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const ChatRow = ({ matchDetails }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("");

  // console.log("Match detail: ", matchDetails);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, currentUser.uid));
  }, [matchDetails, currentUser]);

  useEffect(
    () =>
      firestore()
        .collection("matches")
        .doc(matchDetails.id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot({
          next: (snapshot) => {
            setLastMessage(snapshot.docs[0]?.data()?.message);
          },
        }),
    [matchDetails, firestore]
  );

  return (
    <TouchableOpacity
      style={[
        tailwind(
          "flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
        ),
        style.cardShadow,
      ]}
      onPress={() =>
        navigation.navigate("Message", {
          matchDetails,
        })
      }
    >
      <Image
        style={tailwind("rounded-full h-16 w-16 mr-4")}
        source={{ uri: matchedUserInfo?.photoURL }}
      />

      <View>
        <Text style={tailwind("text-lg font-semibold")}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const style = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
