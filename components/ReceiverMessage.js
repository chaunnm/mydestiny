import { View, Text, Image } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";

const ReceiverMessage = ({ message }) => {
  const tailwind = useTailwind();

  return (
    <View style={[tailwind("flex-row"), { alignSelf: "flex-start" }]}>
      <View
        style={[
          tailwind(
            "bg-chat rounded-xl rounded-tl-none px-4 py-2.5 mx-3 my-2 ml-14"
          ),
          {
            alignSelf: "flex-start",
            maxWidth: "85%",
          },
        ]}
      >
        <Image
          style={tailwind("h-11 w-11 rounded-full absolute top-0 -left-14")}
          source={{ uri: message.photoURL }}
        />
        {message.image === "" ? (
          <Text style={tailwind("text-base")}>{message.message}</Text>
        ) : (
          <Image
            resizeMode="contain"
            source={{ uri: message.image }}
            style={tailwind("w-40 h-40 rounded-xl")}
          />
        )}
      </View>
      <Text style={tailwind("self-center mr-1.5 text-lightText")}>
        {message.timestamp?.toDate().toLocaleTimeString().slice(0, -3)}
      </Text>
    </View>
  );
};

export default ReceiverMessage;
