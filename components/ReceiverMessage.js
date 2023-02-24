import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn";
import { Video } from "expo-av";
import ImageViewer from "react-native-image-zoom-viewer";
import firestore from "@react-native-firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

const ReceiverMessage = ({ message, matchId }) => {
  const tailwind = useTailwind();
  const [color, setColor] = useState(null);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    firestore()
      .collection("matches")
      .doc(matchId)
      .onSnapshot((snapshot) => {
        setColor(snapshot.data().theme.receiverColor);
      });
  }, [firestore]);

  return (
    <View style={[tailwind("flex-row ml-3"), { alignSelf: "flex-start" }]}>
      <View
        style={[
          tailwind(
            "bg-chat rounded-xl rounded-tl-none px-4 py-2.5 mx-3 my-2 ml-14"
          ),
          color !== ""
            ? {
                backgroundColor: color,
                alignSelf: "flex-start",
                maxWidth: "85%",
              }
            : {
                alignSelf: "flex-start",
                maxWidth: "85%",
              },
        ]}
      >
        <Image
          style={tailwind("h-11 w-11 rounded-full absolute top-0 -left-14")}
          source={{ uri: message.photoURL }}
        />
        {message.media === "" ? (
          <Text style={[tailwind("text-base"), { fontFamily: "Nunito" }]}>
            {message.message}
          </Text>
        ) : message.media.slice(36, 41) === "image" ? (
          <TouchableOpacity
            onPress={() => {
              setImage(message.media);
              setVisible(true);
            }}
          >
            <Image
              resizeMode="contain"
              source={{ uri: message.media }}
              style={tailwind("w-44 h-48 rounded-xl")}
            />
          </TouchableOpacity>
        ) : (
          <Video
            style={tailwind("w-44 h-48")}
            source={{
              uri: message.media,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        )}
      </View>
      <Text
        style={[
          tailwind("self-center mr-1.5 text-lightText"),
          { fontFamily: "Nunito" },
        ]}
      >
        {message.timestamp?.toDate().toLocaleTimeString().slice(0, -3)}
      </Text>
      <Modal visible={visible} transparent={true} style={tailwind("relative")}>
        <ImageViewer
          imageUrls={[{ url: image }]}
          enableSwipeDown
          onSwipeDown={() => setVisible(false)}
        />
        <TouchableOpacity
          style={tailwind("absolute right-1.5 top-1")}
          onPress={() => setVisible(false)}
        >
          <AntDesign name="closecircleo" size={24} color="white" />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ReceiverMessage;
