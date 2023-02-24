import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import { useTailwind } from "tailwind-rn";
import { Video } from "expo-av";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import { useActionSheet } from "@expo/react-native-action-sheet";

const SenderMessage = ({ message, matchId }) => {
  const tailwind = useTailwind();
  const { currentUser } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();
  const [deleted, setDeleted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("");
  const [color, setColor] = useState(null);

  const deleteMessage = () => {
    firestore()
      .collection("matches")
      .doc(matchId)
      .collection("messages")
      .doc(message.id)
      .update({
        message: "",
        media: "",
        removedAt: firestore.FieldValue.serverTimestamp(),
      });
    setDeleted(true);
  };

  const showToast = () => {
    ToastAndroid.show(
      "This function is under development 👩‍💻",
      ToastAndroid.SHORT
    );
  };

  const deleteSheet = () => {
    const options = ["Unsent", "Forward", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 1:
            // Save
            showToast();
            break;

          case destructiveButtonIndex:
            deleteMessage();
            break;

          case cancelButtonIndex:
        }
      }
    );
  };

  useEffect(() => {
    firestore()
      .collection("matches")
      .doc(matchId)
      .onSnapshot((snapshot) => {
        // console.log(snapshot.data().theme?.senderColor);
        setColor(snapshot.data().theme.senderColor);
      });
  }, [firestore]);

  return (
    <View style={[tailwind("flex-row"), { alignSelf: "flex-end" }]}>
      <TouchableOpacity
        onLongPress={deleteSheet}
        disabled={deleted}
        activeOpacity={1}
        style={tailwind("flex-row")}
      >
        {message.removedAt === "" ? (
          <Text
            style={[
              tailwind("self-center mr-1.5 text-lightText"),
              { fontFamily: "Nunito" },
            ]}
          >
            {message.timestamp?.toDate().toLocaleTimeString().slice(0, -3)}
          </Text>
        ) : (
          <Text
            style={[
              tailwind("self-center mr-1.5 text-lightText"),
              { fontFamily: "Nunito" },
            ]}
          >
            Removed at {""}
            {message.removedAt?.toDate().toLocaleTimeString().slice(0, -3)}
          </Text>
        )}
        {/* <Text style={tailwind("self-center mr-1.5 text-lightText")}>
          {message.timestamp?.toDate().toLocaleTimeString().slice(0, -3)}
        </Text> */}
        <View
          style={[
            tailwind("rounded-xl rounded-tr-none px-4 py-2.5 mx-3 my-2"),
            color !== ""
              ? {
                  alignSelf: "flex-start",
                  marginLeft: "auto",
                  maxWidth: "85%",
                  backgroundColor: color,
                }
              : {
                  alignSelf: "flex-start",
                  marginLeft: "auto",
                  maxWidth: "85%",
                  backgroundColor: "#FD697F",
                },
          ]}
        >
          {message.media === "" && message.message !== "" ? (
            <Text
              style={[
                tailwind("text-white text-base"),
                { fontFamily: "Nunito" },
              ]}
            >
              {message.message}
            </Text>
          ) : message.media?.slice(36, 41) === "image" ? (
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
          ) : message.media?.slice(36, 41) === "video" ? (
            <Video
              style={tailwind("w-44 h-48")}
              source={{
                uri: message.media,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
            />
          ) : (
            <Text style={[tailwind("text-white"), { fontFamily: "Nunito" }]}>
              You unsent a message
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <Modal visible={visible} transparent={true} style={tailwind("relative")}>
        <ImageViewer
          imageUrls={[{ url: image }]}
          enableSwipeDown
          onSwipeDown={() => setVisible(false)}
          // onSave={async (url) => {
          //   let cameraPrmissions =
          //     await PermissionsAndroid.PERMISSIONS.getAsync(
          //       PermissionsAndroid.PERMISSIONS.CAMERA_ROLL
          //     );
          //   if (cameraPrmissions.status !== "granted") {
          //     cameraPrmissions = await PermissionsAndroid.PERMISSIONS.askAsync(
          //       PermissionsAndroid.PERMISSIONS.CAMERA_ROLL
          //     );
          //   }

          //   if (cameraPrmissions.status === "granted") {
          //     MediaLibrary.saveToLibraryAsync(image);
          //     console.log("Image saved to Library");
          //   } else {
          //     console.log("You did not allow permissions to camera");
          //   }
          // }}
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

export default SenderMessage;
