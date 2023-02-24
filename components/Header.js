import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, back, cancel }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <View style={tailwind("p-2 flex-row items-center justify-between")}>
      <View style={tailwind("flex flex-row items-center")}>
        {back && (
          <TouchableOpacity
            style={tailwind("p-2")}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={34} color="#FF5864" />
          </TouchableOpacity>
        )}
        {cancel && (
          <TouchableOpacity
            style={tailwind("p-2")}
            onPress={() => navigation.goBack()}
          >
            <Feather name="x-octagon" size={30} color="#FF5864" />
          </TouchableOpacity>
        )}
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            tailwind("text-2xl pl-2 text-others"),
            { fontFamily: "NunitoBold" },
          ]}
        >
          {title.length < 17 ? `${title}` : `${title.substring(0, 17)}...`}
        </Text>
      </View>
    </View>
  );
};

export default Header;
