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
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("flex-row justify-between mx-3 my-2")}>
        <Text style={tailwind("text-something font-bold text-base")}>
          New Matches
        </Text>
        <TouchableOpacity>
          <Text style={tailwind("text-something font-bold self-center")}>
            See all ({matches.length})
          </Text>
        </TouchableOpacity>
      </View>
      <MatchList />
      <Text style={tailwind("text-something text-base font-bold mx-3 mb-2")}>
        Messages
      </Text>
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
