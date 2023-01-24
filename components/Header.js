import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled, videoEnabled, moreEnabled }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <View style={tailwind("p-2 flex-row items-center justify-between")}>
      <View style={tailwind("flex flex-row items-center")}>
        <TouchableOpacity
          style={tailwind("p-2")}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={tailwind("text-2xl font-bold pl-2 text-others")}
        >
          {title.length < 17 ? `${title}` : `${title.substring(0, 17)}...`}
        </Text>
      </View>

      <View style={tailwind("flex-row")}>
        {callEnabled && (
          <TouchableOpacity
            style={tailwind("rounded-full w-10 h-10 mr-2 p-3 bg-red-200")}
          >
            <FontAwesome5
              style={tailwind("")}
              name="phone-alt"
              size={15}
              color="red"
            />
          </TouchableOpacity>
        )}
        {videoEnabled && (
          <TouchableOpacity
            style={tailwind("rounded-full w-10 h-10 mr-2 p-3 bg-red-200")}
          >
            <MaterialIcons
              style={tailwind("")}
              name="videocam"
              size={15}
              color="red"
            />
          </TouchableOpacity>
        )}

        {moreEnabled && (
          <TouchableOpacity style={tailwind("justify-center")}>
            <MaterialCommunityIcons
              style={tailwind("")}
              name="dots-vertical"
              size={25}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
