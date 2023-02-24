import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

const PickCell = ({ pickInfor }) => {
  const tailwind = useTailwind();
  return (
    <View
      style={tailwind(
        "relative h-62 w-43 rounded-xl overflow-hidden mx-3 my-4"
      )}
    >
      <ImageBackground
        resizeMode="cover"
        style={tailwind("flex-1 h-full w-full mx-auto relative")}
        source={{
          uri: pickInfor.avatar,
        }}
      >
        <LinearGradient
          style={tailwind("absolute left-0 right-0 bottom-0 h-1/2")}
          colors={["rgba(255,235,239,0)", "rgba(255,133,162,1)"]}
        />
        <View style={tailwind("absolute bottom-0 mb-1 p-3")}>
          <Text
            style={[
              tailwind("text-white text-2xl"),
              { fontFamily: "NunitoBold" },
            ]}
          >
            {pickInfor.name},{" "}
            <Text
              style={[
                tailwind("text-white text-2xl "),
                { fontFamily: "Nunito" },
              ]}
            >
              {pickInfor.age}
            </Text>
          </Text>
          <Text
            style={[
              tailwind("text-base text-white"),
              { fontFamily: "NunitoSemiBold" },
            ]}
          >
            {pickInfor.job}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            ToastAndroid.showWithGravity(
              "This feature is under development!",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          }}
          style={tailwind(
            "absolute right-2 top-2 items-center justify-center rounded-full w-12 h-12 border border-blue-400 bg-white"
          )}
        >
          <AntDesign name="star" size={26} color="#1DA1F2" />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default PickCell;
