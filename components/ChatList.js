import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import ChatRow from "../components/ChatRow";

const ChatList = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
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

  //   console.log("Matches: ", matches);

  return matches.length > 0 ? (
    <FlatList
      style={tailwind("h-full")}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item}></ChatRow>}
    />
  ) : (
    <View style={tailwind("p-5")}>
      <Image
        style={tailwind("w-52 h-52 self-center")}
        source={{
          uri: "https://drive.google.com/uc?id=1RuT7AHy40dLoSGk6AQUlCuFDnJTSDqi_",
        }}
      />
      <Text style={tailwind("text-center text-base")}>
        No messages at the moment 📰
      </Text>
    </View>
  );
};

export default ChatList;
