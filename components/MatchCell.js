import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const MatchCell = ({ matchDetails }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, currentUser.uid));
  }, [matchDetails, currentUser]);

  return (
    <TouchableOpacity style={tailwind("w-22 h-56 py-1 pr-0 mr-1 items-center")}>
      <Image
        style={tailwind("w-22 h-28 border-white rounded-lg")}
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <Text
        style={[tailwind("text-center pt-1"), { fontFamily: "Nunito" }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {matchedUserInfo?.displayName}
      </Text>
    </TouchableOpacity>
  );
};

export default MatchCell;
