import { View, Text, Image } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";

const SenderMessage = ({ message }) => {
  const tailwind = useTailwind();

  return (
    <View style={[tailwind("flex-row"), { alignSelf: "flex-end" }]}>
      <Text style={tailwind("self-center mr-1.5 text-lightText")}>
        {message.timestamp?.toDate().toLocaleTimeString().slice(0, -3)}
      </Text>
      <View
        style={[
          tailwind(
            "bg-red-400 rounded-xl rounded-tr-none px-4 py-2.5 mx-3 my-2"
          ),
          { alignSelf: "flex-start", marginLeft: "auto", maxWidth: "85%" },
        ]}
      >
        {message.image === "" ? (
          <Text style={tailwind("text-white text-base")}>
            {message.message}
          </Text>
        ) : (
          <Image
            resizeMode="contain"
            source={{ uri: message.image }}
            style={tailwind("w-40 h-40 rounded-xl")}
          />
        )}
      </View>
    </View>
  );
};

export default SenderMessage;
