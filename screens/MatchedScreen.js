import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import React from "react";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const tailwind = useTailwind();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={[tailwind("h-full bg-red-500 pt-20"), { opacity: 0.9 }]}>
      <View style={tailwind("justify-center px-10 pt-20")}>
        <Image
          resizeMode="contain"
          style={[tailwind("h-20 w-full")]}
          source={{
            uri: "https://i.imgur.com/NMW3xjB.png",
          }}
        />
      </View>

      <Text style={tailwind("text-white text-center mt-5")}>
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View style={tailwind("flex-row justify-evenly mt-8")}>
        <Image
          style={tailwind("h-28 w-28 rounded-full")}
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          style={tailwind("h-28 w-28 rounded-full")}
          source={{ uri: userSwiped.photoURL }}
        />
      </View>

      <TouchableOpacity
        style={[
          tailwind("bg-white m-auto px-4 py-7 mt-20 rounded-full"),
          { width: "86%" },
        ]}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={tailwind("text-center text-lg")}>
          Say hi to {userSwiped.displayName} 👋
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;
