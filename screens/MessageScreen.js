import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { useRoute } from "@react-navigation/native";

const MessageScreen = () => {
  const { currentUser } = useAuth();
  const { params } = useRoute();

  const { matchDetails } = params;

  return (
    <SafeAreaView>
      <Header
        title={
          getMatchedUserInfo(matchDetails.users, currentUser.uid).displayName
        }
        callEnabled
      />
      <Text>MessageScreen</Text>
    </SafeAreaView>
  );
};

export default MessageScreen;
