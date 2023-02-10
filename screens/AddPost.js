import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Keyboard,
  ToastAndroid,
} from "react-native";
// import { useHeaderHeight } from "@react-navigation/elements";
import React, { useState } from "react";
import Header from "../components/Header";
import { useTailwind } from "tailwind-rn";
import firestore from "@react-native-firebase/firestore";
import useAuth from "../hooks/useAuth";
import { Divider } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { FAB, Portal, Provider } from "react-native-paper";
import { Video } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddPost = () => {
  const tailwind = useTailwind();
  const { currentUser } = useAuth();
  const navigation = useNavigation();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [open, setOpen] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setVideo("");
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      setImage("");
    }
  };

  const uploadPost = async () => {
    const cloudName = "dtu8kyhxq";
    const cloudURL = "https://api.cloudinary.com/v1_1/dtu8kyhxq/auto/upload";
    const uploadPreset = "uw_test";
    const uri = video || image;

    let media = {
      uri: uri,
      type: `test/${uri.split(".")[1]}`,
      name: `test.${uri.split(".")[1]}`,
    };
    const formData = new FormData();

    if (video !== "" || image !== "") {
      formData.append("file", media);
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
          const post = {
            user: {
              id: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            content: {
              caption: caption,
              image: data.url.slice(36, 41) === "image" ? data.url : "",
              video: data.url.slice(36, 41) === "video" ? data.url : "",
            },
            likes: {},
            comments: {},
            timestamp: firestore.FieldValue.serverTimestamp(),
          };
          firestore()
            .collection("posts")
            .add(post)
            .then(() => {
              ToastAndroid.showWithGravity(
                "Post saved successfully! 🎉",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
              navigation.goBack();
            });
        });
    } else {
      const post = {
        user: {
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        content: {
          caption: caption,
          image: "",
          video: "",
        },
        likes: {},
        comments: {},
        timestamp: firestore.FieldValue.serverTimestamp(),
      };
      firestore()
        .collection("posts")
        .add(post)
        .then((docRef) => {
          firestore().collection("posts").doc(docRef.id).update({
            id: docRef.id,
          });
          ToastAndroid.showWithGravity(
            "Post saved successfully! 🎉",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          navigation.goBack();
        });
    }
  };

  return (
    <SafeAreaView style={tailwind("flex-1 relative")}>
      <Provider>
        <Header title="Add a post" cancel />
        <TouchableOpacity
          style={tailwind("w-16 absolute right-1.5 top-4")}
          onPress={() => uploadPost()}
        >
          <Text
            style={tailwind(
              "text-lg font-bold px-3 py-1 rounded self-center bg-gray-300"
            )}
          >
            Post
          </Text>
        </TouchableOpacity>
        <View style={tailwind("flex-row p-2")}>
          <Image
            style={tailwind("w-10 h-10 rounded-full")}
            source={{ uri: currentUser.photoURL }}
          />
          <Text style={tailwind("font-bold text-base self-center ml-2")}>
            {currentUser.displayName}
          </Text>
        </View>
        <Divider />
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // style={tailwind("flex-1")}
            keyboardVerticalOffset={10}
            // keyboardVerticalOffset={headerHeight}
          >
            <TextInput
              style={tailwind("w-full text-base p-3 mb-0")}
              placeholder="What's on your mind?"
              autoCapitalize="none"
              multiline
              value={caption}
              onChangeText={setCaption}
            />
            <Divider />
          </KeyboardAvoidingView>
          <View style={tailwind("relative mt-4")}>
            {image !== "" && (
              <Image
                style={tailwind("w-full h-56")}
                resizeMode="cover"
                source={{
                  uri: image,
                }}
              />
            )}
            {video !== "" && (
              <Video
                style={tailwind("w-full h-56")}
                source={{
                  uri: video,
                }}
                useNativeControls
                resizeMode="contain"
              />
            )}
            {(image !== "" || video !== "") && (
              <TouchableOpacity
                onPress={() => {
                  setImage("");
                  setVideo("");
                }}
                style={tailwind("absolute right-2 top-1")}
              >
                <AntDesign name="delete" size={26} color="red" />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <Portal>
          <FAB.Group
            open={open}
            visible
            icon={open ? "folder-multiple-image" : "plus"}
            actions={[
              {
                icon: "image",
                label: "Photo",
                onPress: () => pickImage(),
              },
              {
                icon: "video",
                label: "Video",
                onPress: () => pickVideo(),
              },
            ]}
            onStateChange={() => setOpen(!open)}
            onPress={() => {
              Keyboard.dismiss();
            }}
          />
        </Portal>
      </Provider>
    </SafeAreaView>
  );
};

export default AddPost;
