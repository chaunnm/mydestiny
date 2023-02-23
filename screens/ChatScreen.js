import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import ChatList from "../components/ChatList";
import MatchList from "../components/MatchList";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";

const ChatScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const [matches, setMatches] = useState([]);
  const { currentUser } = useAuth();

  useEffect(
    () =>
      firestore()
        .collection("matches")
        .where("usersMatched", "array-contains", currentUser.uid)
        .onSnapshot({
          next: (querySnapshot) => {
            setMatches(
              querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
          },
        }),
    [currentUser]
  );
  return (
    <SafeAreaView style={tailwind("flex-1 bg-white")}>
      <View style={tailwind("flex-row justify-between mx-3 my-2")}>
        <Text
          style={[
            tailwind("text-something text-base"),
            { fontFamily: "NunitoBold" },
          ]}
        >
          New Matches
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllMatch")}>
          <Text
            style={[
              tailwind("text-something self-center"),
              { fontFamily: "NunitoBold" },
            ]}
          >
            See all ({matches.length})
          </Text>
        </TouchableOpacity>
      </View>
      <MatchList />
      <Text
        style={[
          tailwind("text-something text-base mx-3 mb-2"),
          { fontFamily: "NunitoBold" },
        ]}
      >
        Messages
      </Text>
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
