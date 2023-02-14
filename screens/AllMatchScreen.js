import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import ChatList from "../components/ChatList";
import MatchList from "../components/MatchList";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import MatchHeader from "../components/MatchHeader";
import BottomNavigator from "../StackNavigator";
import { useLayoutEffect } from "react";

const AllMatchScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const [matchIds, setMatchIds] = useState([]);
  const [matchUsers, setMatchUsers] = useState([]);
  const { currentUser } = useAuth();

  useEffect(
    () =>
      firestore()
        .collection("matches")
        .where("usersMatched", "array-contains", currentUser.uid)
        .onSnapshot({
          next: (querySnapshot) => {
            const temp = querySnapshot.docs.map((doc) => ({
              ...doc.data().usersMatched,
            }));
            const temp0 = temp
              .map((item) => item["0"])
              .filter((item) => item !== "1EJKAmqqKEdm22J3AejHdmNmhyD2");

            const temp1 = temp
              .map((item) => item["1"])
              .filter((item) => item !== "1EJKAmqqKEdm22J3AejHdmNmhyD2");

            setMatchIds([...temp0, ...temp1]);
          },
        }),
    [currentUser]
  );

  useEffect(() => {
    if (matchIds.length > 0) {
      const unsubscribe = firestore()
        .collection("users")
        .where("id", "in", matchIds)
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          //   console.log(data);
          setMatchUsers(data);
        });

      return () => unsubscribe();
    }
  }, [matchIds]);

  useLayoutEffect(() => {
    // navigation.setOptions({ header: () => null });
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={tailwind("bg-white flex-1")}>
      <MatchHeader
        title={"All match " + "(" + matchUsers.length + ")"}
        notification
        filter
      />
      {matchUsers.length > 0 ? (
        <FlatList
          numColumns={2}
          data={matchUsers}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tailwind("h-full mx-auto")}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tailwind("h-62 w-43 rounded-xl overflow-hidden mx-3 my-4")}
            >
              <ImageBackground
                resizeMode="cover"
                style={tailwind("flex-1 h-full w-full mx-auto relative")}
                source={{
                  uri: item.photos.find((photo) => photo.photoURL)?.photoURL
                    ? item.photos.find((photo) => photo.photoURL)?.photoURL
                    : item.gender === "male"
                    ? "https://drive.google.com/uc?id=1LZ5AUJmG-Dc3eE5C5heHlnZoew5B07X1"
                    : "https://drive.google.com/uc?id=1LZ5AUJmG-Dc3eE5C5heHlnZoew5B07X1",
                }}
              >
                <LinearGradient
                  style={tailwind("absolute left-0 right-0 bottom-0 h-1/2")}
                  colors={["rgba(255,235,239,0)", "rgba(255,133,162,1)"]}
                />
                <View style={tailwind("absolute bottom-0 mb-1 p-3")}>
                  <Text style={tailwind("text-white font-bold text-2xl")}>
                    {item.displayName},{" "}
                    <Text style={tailwind("text-white font-normal text-2xl ")}>
                      {Math.floor(
                        (new Date() - item.dayOfBirth.toDate().getTime()) /
                          3.15576e10
                      )}
                    </Text>
                  </Text>
                  <Text style={tailwind("font-semibold text-base text-white")}>
                    {item.job}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={tailwind("self-center my-auto")}>
          <Image
            resizeMode="contain"
            style={tailwind("h-72 w-60 self-center")}
            source={{
              uri: "https://drive.google.com/uc?id=1wTHbtKcMv-_kSYXjhoocpVeJ5v23k0xU",
            }}
          />
          <Text style={tailwind("text-base -mt-2")}>
            You have no match at the moment
          </Text>
        </View>
      )}
      <BottomNavigator />
    </SafeAreaView>
  );
};

export default AllMatchScreen;
