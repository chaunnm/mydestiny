import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChatHeader = ({
  title,
  callEnabled,
  videoEnabled,
  moreEnabled,
  moreClicked,
  opened,
  background,
}) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(opened);
  }, [opened]);

  useEffect(() => {
    moreClicked(clicked);
  }, [clicked]);

  return (
    <ImageBackground
      style={[
        tailwind("p-1 flex-row items-center justify-between"),
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 5,
        },
      ]}
      source={{
        uri: background,
      }}
      blurRadius={20}
    >
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
          style={[
            tailwind("text-2xl pl-2 text-others"),
            { fontFamily: "NunitoBold" },
          ]}
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
          <TouchableOpacity
            style={tailwind("justify-center")}
            onPress={(e) => {
              // Quài luôn :((
              setClicked(!clicked);
            }}
          >
            <MaterialCommunityIcons
              style={tailwind("")}
              name="dots-vertical"
              size={25}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export default ChatHeader;
