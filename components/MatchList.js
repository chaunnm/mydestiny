import {
  View,
  Text,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import MatchCell from "./MatchCell";
import { LinearGradient } from "expo-linear-gradient";

const MatchList = () => {
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

  //   useEffect(() => {
  //     matches.map((item, index) =>
  //       setMatchedUserInfo((previous) => [
  //         ...previous,
  //         getMatchedUserInfo(item.users, currentUser.uid),
  //       ])
  //     );
  //   }, []);

  return matches.length > 0 ? (
    // <ScrollView horizontal style={{ flex: 1 }}>
    //   {matchedUserInfo.map((person, index) => (
    //     <View key={index} style={{ width: 85, padding: 5 }}>
    //       {/* <LinearGradient
    //         colors={["#bc2a8d", "#e95950", "#fccc63"]}
    //         style={tailwind("p-1 rounded-full")}
    //       ></LinearGradient> */}
    //       {/* <Image
    //         style={tailwind("w-10 h-10 border-white")}
    //         source={{ uri: person.photoURL }}
    //       /> */}
    //       <Text>{person.displayName}</Text>
    //     </View>
    //   ))}
    // </ScrollView>
    <View style={tailwind("flex-auto flex-row")}>
      <TouchableOpacity style={tailwind("relative ml-3 w-22 h-56 py-1 mr-1")}>
        <LinearGradient
          colors={["rgba(251,188,5,1)", "rgba(245,145,36,1)"]}
          style={tailwind(
            "relative w-22 h-28 border-white rounded-xl justify-center items-center"
          )}
        >
          <TouchableWithoutFeedback
            style={tailwind(
              "w-16 h-24 border-white border rounded-lg overflow-hidden"
            )}
          >
            <Image
              style={[
                tailwind("rounded-lg"),
                {
                  width: 78,
                  height: 103,
                  borderWidth: 6,
                  borderColor: "white",
                },
              ]}
              source={{ uri: "https://i.imgur.com/AeTtoT5.png" }}
            />
          </TouchableWithoutFeedback>
          <LinearGradient
            colors={["rgba(251,188,5,1)", "rgba(245,145,36,1)"]}
            style={tailwind("rounded-full absolute w-8 h-8 justify-center")}
          >
            <Text
              style={[
                tailwind("text-white text-lg text-center"),
                { fontFamily: "NunitoBold" },
              ]}
            >
              12
            </Text>
          </LinearGradient>
          <Image
            style={tailwind("w-9 h-8 absolute -bottom-3")}
            source={{ uri: "https://i.imgur.com/u2nVvtN.png" }}
          />
        </LinearGradient>

        <Text
          style={[tailwind("text-center pt-1"), { fontFamily: "Nunito" }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          Likes
        </Text>
      </TouchableOpacity>
      <FlatList
        horizontal
        //   showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={matches.slice(0, 3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MatchCell matchDetails={item}></MatchCell>}
      />
    </View>
  ) : (
    <View style={tailwind("p-5")}>
      <Text
        style={[tailwind("text-center text-base"), { fontFamily: "Nunito" }]}
      >
        No matches at the moment 🥲
      </Text>
    </View>
  );
};

export default MatchList;
