import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <View style={tailwind("p-2 flex-row items-center justify-between")}>
      <View style={tailwind("flex flex-row items-center")}>
        <TouchableOpacity
          style={tailwind("p-2")}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text style={tailwind("text-2xl font-bold pl-2")}>{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity
          style={tailwind("rounded-full w-10 mr-4 p-3 bg-red-200")}
        >
          <Foundation
            style={tailwind("")}
            name="telephone"
            size={20}
            color="red"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;