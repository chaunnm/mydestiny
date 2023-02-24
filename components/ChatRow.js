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
  const [lastMessage, setLastMessage] = useState("[Say Hi 👋]");

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
            if (snapshot.docs[0]?.data()?.media === "")
              setLastMessage(snapshot.docs[0]?.data()?.message);
            else if (snapshot.docs[0]?.data()?.media?.slice(36, 41) === "image")
              setLastMessage("[Image]");
            else if (snapshot.docs[0]?.data()?.media?.slice(36, 41) === "video")
              setLastMessage("[Video]");
            if (
              snapshot.docs[0]?.data()?.message === "" &&
              snapshot.docs[0]?.data()?.media === ""
            )
              setLastMessage("[Message unsent!]");
            else if (
              snapshot.docs[0]?.data()?.message === "" &&
              snapshot.docs[0]?.data()?.media === "" &&
              snapshot.docs[0]?.data()?.removedAt === ""
            )
              setLastMessage("[Say Hi!]");
          },
        }),
    [matchDetails, firestore]
  );

  return (
    <TouchableOpacity
      style={[
        tailwind(
          "flex-row items-center py-4 px-4 bg-white mx-3 my-1 rounded-lg flex-1"
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
        style={tailwind("rounded-full h-12 w-12 mr-4")}
        source={{ uri: matchedUserInfo?.photoURL }}
      />

      <View style={tailwind("flex-1")}>
        <Text style={[tailwind("text-lg "), { fontFamily: "NunitoSemiBold" }]}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {lastMessage}
        </Text>
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
