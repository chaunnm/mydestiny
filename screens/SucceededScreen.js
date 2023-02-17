import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";

const SucceededScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  return (
    <View
      style={[
        tailwind("h-full bg-gray-400 justify-center items-center"),
        { opacity: 0.89 },
      ]}
    >
      <View
        style={[
          tailwind(
            "bg-white w-11/12 h-96 rounded-2xl items-center justify-center px-5 py-3 pt-7"
          ),
          { opacity: 1 },
        ]}
      >
        <Image
          source={{ uri: "https://i.imgur.com/HUSzKKz.png" }}
          style={tailwind("w-44 h-44")}
          resizeMode="contain"
        />
        <Text style={tailwind("text-primary text-3xl font-bold")}>Great</Text>
        <Text style={tailwind("font-bold text-xl text-primary text-center")}>
          Your profile has been created successfully!
        </Text>
        <TouchableOpacity
          style={tailwind("bg-primary m-5 px-10 py-4 w-full rounded-full")}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Nav",
                },
              ],
            });
          }}
        >
          <Text style={tailwind("text-white font-bold text-center text-xl")}>
            Go to home 🏠
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SucceededScreen;
