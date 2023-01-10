import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import React, { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const ModalScreen = () => {
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompletedForm = !image || !job || !age;

  // const usersCollection = firestore().collection("users");

  // const getUser = firestore()
  //   .collection("users")
  //   .doc("NbM5u6o4YZ9Run4gElE6")
  //   .get();
  // console.log(getUser);

  // const usersCollection = firestore()
  //   .collection("users")
  //   .get()
  //   .then((collectionSnapshot) => {
  //     console.log("Total users: ", collectionSnapshot.size);
  //     collectionSnapshot.forEach((documentSnapshot) => {
  //       console.log("User ID: ", documentSnapshot.id, documentSnapshot.data());
  //     });
  //   });

  const updateUserProfile = () => {
    firestore()
      .collection("users")
      .doc(currentUser.uid)
      .set({
        id: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: image,
        job: job,
        age: age,
      })
      .then(() => {
        ToastAndroid.showWithGravity(
          "Update Profile successfully! 🎉",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        navigation.navigate("Home");
      })
      .catch((error) => {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
  };

  // const updateUserProfile = () => {
  //   setDoc(doc(db, "users", user.uid), {
  //     id: user.uid,
  //     displayName: currentUser.displayName,
  //     photoURL: image,
  //     job: job,
  //     age: age,
  //     timestamp: serverTimestamp(),
  //   })
  //     .then(() => {
  //       navigation.navigate("Home");
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };

  // const updateUserProfile = async () => {
  //   await firestore().collection("users").add({
  //     displayName: currentUser.displayName,
  //     photoURL: image,
  //     job: job,
  //     age: age,
  //   });
  // };

  return (
    <View style={tailwind("relative flex-1 items-center pt-1")}>
      <Image
        style={tailwind("h-20 w-full")}
        resizeMode="contain"
        source={{
          uri: "https://i.imgur.com/d2M94gX.png",
        }}
      />

      <Text style={tailwind("text-3xl text-gray-500 p-2 font-bold")}>
        Welcome {currentUser.displayName}
      </Text>

      <Text style={tailwind("text-center p-4 font-bold text-red-400 text-xl")}>
        Step 1: The Profile picture
      </Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        style={tailwind("text-xl text-center text-xl pb-2")}
        placeholder="Enter a Profile Picture URL"
      />

      <Text style={tailwind("text-center p-4 font-bold text-red-400 text-xl")}>
        Step 2: What is your job?
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={tailwind("text-center text-xl pb-2")}
        placeholder="Enter your occupation"
      />

      <Text style={tailwind("text-center p-4 font-bold text-red-400 text-xl")}>
        Step 3: The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={tailwind("text-center text-xl pb-2")}
        placeholder="Enter your age"
        keyboardType="numeric"
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompletedForm}
        style={[
          tailwind("w-64 p-3 rounded-xl bg-red-400 mt-10"),
          incompletedForm ? tailwind("bg-gray-400") : tailwind("bg-red-400"),
        ]}
        onPress={updateUserProfile}
      >
        <Text style={tailwind("text-center font-bold text-white text-xl")}>
          Update Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[tailwind("w-64 p-3 rounded-xl bg-red-400 mt-10")]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={tailwind("text-center font-bold text-white text-xl")}>
          Edit Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
