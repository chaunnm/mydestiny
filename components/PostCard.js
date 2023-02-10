import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ToastAndroid,
} from "react-native";
import { Divider, Dialog, Button } from "react-native-paper";
import React, { useEffect, useState, useCallback } from "react";
import ImageViewer from "react-native-image-zoom-viewer";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import { useTailwind } from "tailwind-rn";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Video } from "expo-av";
import moment from "moment/moment";

const PostCard = ({ post }) => {
  const { currentUser } = useAuth();
  const tailwind = useTailwind();

  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("");

  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [deleteBtn, setdeleteBtn] = useState(post.user.id === currentUser.uid);

  const showDeleteBtn = () =>
    Alert.alert(
      "Delete post",
      "Are you want to permanently delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => deletePost() },
      ]
    );

  const deletePost = () => {
    firestore()
      .collection("posts")
      .doc(post.id)
      .delete()
      .then(() => {
        ToastAndroid.showWithGravity(
          "Delete post successfully! 🎉",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
  };

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  return (
    <View
      style={[
        tailwind("w-full mb-4 rounded-lg bg-white overflow-hidden"),
        {
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 3,
        },
      ]}
    >
      <View style={tailwind("flex-row justify-between")}>
        <View style={tailwind("flex-row justify-start p-2.5")}>
          <Image
            style={tailwind("rounded-full w-10 h-10 mr-2")}
            source={{
              uri: post.user.photoURL,
            }}
          />
          <View style={tailwind("ml-1 flex justify-center")}>
            <Text style={tailwind("text-base font-bold")}>
              {post.user.displayName}
            </Text>
            <Text>{moment(post.timestamp?.toDate()).fromNow()}</Text>
          </View>
        </View>
        {deleteBtn ? (
          <TouchableOpacity
            style={tailwind("self-center mr-2")}
            onPress={showDeleteBtn}
          >
            <MaterialCommunityIcons
              name="delete-circle-outline"
              size={28}
              color="#DA251D"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 4}
        style={[
          tailwind("px-3 mb-4 text-justify mt-0.5"),
          { lineHeight: 18 },
          lengthMore ? tailwind("mb-1") : tailwind("mb-4"),
        ]}
      >
        {/* Hello, my name is An Nguyen and those words are just some kinds some
        dumb things Ive made to test whether this Text comp works perfectly or
        not! So I would like to add a lot more words here, nvm:
        auiadajdkankdnakdhawkdakldkladdadawdawadawdawdadadadadad
        adadwdawdawdawdwa
        lahdlhlwdlaldalwdjakwdbakbdkarfewetwetwtwtwewsbwkdbakbdkabdkbakdakdkabwkdbdjkbkwdbkabdkad{" "}
        {"\n"}Well it was alright, damn ^^ */}
        {post.content.caption}
      </Text>
      {lengthMore ? (
        <TouchableOpacity>
          <Text
            onPress={toggleNumberOfLines}
            style={[tailwind("px-3 font-bold mb-2"), { lineHeight: 18 }]}
          >
            {textShown ? "See less" : "See more..."}
          </Text>
        </TouchableOpacity>
      ) : null}
      {post.content.image !== "" && (
        <TouchableOpacity
          style={tailwind("bg-gray-300")}
          onPress={() => {
            setImage(post.content.image);
            setVisible(true);
          }}
        >
          <Image
            resizeMode="cover"
            source={{
              uri: post.content.image,
            }}
            style={tailwind("w-full h-56")}
          />
        </TouchableOpacity>
      )}
      {post.content.video !== "" && (
        <TouchableOpacity style={tailwind("bg-gray-300")}>
          <Video
            style={tailwind("w-full h-52")}
            source={{
              uri: post.content.video,
            }}
            useNativeControls
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Divider bold />
      <View style={tailwind("flex-row p-1 py-2 justify-around")}>
        <TouchableOpacity
          style={tailwind("flex-row justify-center rounded py-0.5 px-1")}
        >
          <Ionicons name="ios-heart-circle-outline" size={32} color="#3D3B73" />
          {/* <Ionicons name="ios-heart-circle" size={32} color="#FF85A2" /> */}
          <Text style={tailwind("self-center text-lightText")}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tailwind("flex-row justify-center rounded py-0.5 px-1")}
        >
          <MaterialCommunityIcons
            style={tailwind("self-center mr-1")}
            name="comment-multiple-outline"
            size={25}
            color="#3D3B73"
          />
          <Text style={tailwind("self-center text-lightText")}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tailwind("flex-row justify-center rounded py-0.5 px-1")}
        >
          <Ionicons name="share-outline" size={27} color="#3D3B73" />
          <Text style={tailwind("self-center text-lightText")}>Share</Text>
        </TouchableOpacity>
      </View>
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

export default PostCard;
