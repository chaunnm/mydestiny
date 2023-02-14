import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MatchHeader = ({ title, notification, filter, opened }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <View
      style={[
        tailwind("p-1 flex-row items-center justify-between bg-white"),
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        },
      ]}
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
          style={tailwind("text-2xl font-bold pl-2 text-others")}
        >
          {title.length < 17 ? `${title}` : `${title.substring(0, 17)}...`}
        </Text>
      </View>

      <View style={tailwind("flex-row")}>
        {notification && (
          <TouchableOpacity
            onPress={() =>
              ToastAndroid.showWithGravity(
                "This feature is under development",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              )
            }
            style={tailwind("mr-2.5 ")}
          >
            <MaterialCommunityIcons
              //   style={{ marginEnd: 30 }}
              name="bell"
              size={28}
              color="#3d3b73"
            />
          </TouchableOpacity>
        )}
        {filter && (
          <TouchableOpacity
            onPress={() =>
              ToastAndroid.showWithGravity(
                "This feature is under development",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              )
            }
            style={tailwind("mr-2 ")}
          >
            <MaterialIcons
              style={tailwind("")}
              name="filter-list"
              size={28}
              color="#3d3b73"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MatchHeader;
