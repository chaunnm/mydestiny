import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import useAuth from "../hooks/useAuth";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "react-native-image-zoom-viewer";
import { AntDesign } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";

const AvatarAccount = () => {
  const tailwind = useTailwind();
  const { currentUser, updateAvatar } = useAuth();
  const [image, setImage] = useState(currentUser.photoURL);
  const [visible, setVisible] = useState(false);

  const { showActionSheetWithOptions } = useActionSheet();

  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleUploadImage(result.assets[0].uri);
    }
  };

  const handleUploadImage = async (avatar) => {
    const cloudName = "dtu8kyhxq";
    const cloudURL = "https://api.cloudinary.com/v1_1/dtu8kyhxq/auto/upload";
    const uploadPreset = "uw_test";

    let image = {
      uri: avatar,
      type: `test/${avatar.split(".")[1]}`,
      name: `test.${avatar.split(".")[1]}`,
    };
    const formData = new FormData();
    if (image != undefined) {
      formData.append("file", image);
      formData.append("cloud_name", cloudName);
      formData.append("upload_preset", uploadPreset);

      await fetch(cloudURL, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          updateAvatar(data.url).then(() => {
            setImage(data.url);
            ToastAndroid.showWithGravity(
              "Your avatar has been changed successfully! 🎉",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          });
        })
        .catch((err) => Alert.alert("Change avatar error: ", err.message));
    }
  };

  const handleAvatar = () => {
    const options = ["View Avatar", "Change Avatar", "Cancel"];
    const viewAvatarIndex = 0;
    const changeAvatarIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        changeAvatarIndex,
        cancelButtonIndex,
        viewAvatarIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case changeAvatarIndex:
            pickAvatar();
            break;

          case viewAvatarIndex:
            setVisible(true);
            break;

          case cancelButtonIndex:
        }
      }
    );
  };

  return (
    <View style={styles.avatarContainer}>
      <TouchableOpacity onPress={handleAvatar} style={styles.avatar}>
        <Avatar.Image
          style={styles.avatarImg}
          size={130}
          source={{ uri: currentUser.photoURL }}
        />
      </TouchableOpacity>
      <Text style={styles.avatarText}>
        {currentUser.displayName}, {currentUser.age}
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

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    borderColor: "#ffb8c9",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  avatarImg: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#3d3b73",
    margin: 5,
    fontSize: 26,
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AvatarAccount;
