import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import Carousel from "react-native-snap-carousel";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Header from "../components/Header";
import { TabView, SceneMap } from "react-native-tab-view";

const dimensionsForScreen = Dimensions.get("screen");
const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const IndividualScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const { params } = useRoute();
  const { userSelected } = params;

  const [show, setShow] = useState(false);
  const [interests, setInterests] = useState([
    {
      id: 1,
      selected: false,
      icon: "🎮",
      name: "Gaming",
    },
    {
      id: 2,
      selected: false,
      icon: "💃",
      name: "Dancing",
    },
    {
      id: 3,
      selected: false,
      icon: "🗣️",
      name: "Language",
    },
    {
      id: 4,
      selected: false,
      icon: "🎵",
      name: "Language",
    },
    {
      id: 5,
      selected: false,
      icon: "🎬",
      name: "Movie",
    },
    {
      id: 6,
      selected: false,
      icon: "📷",
      name: "Photography",
    },
    {
      id: 7,
      selected: false,
      icon: "🏛️",
      name: "Architecture",
    },
    {
      id: 8,
      selected: false,
      icon: "🧑‍💻",
      name: "IT",
    },
    {
      id: 9,
      selected: false,
      icon: "👔",
      name: "Fashion",
    },
    {
      id: 10,
      selected: false,
      icon: "📚",
      name: "Book",
    },
    {
      id: 11,
      selected: false,
      icon: "✍️",
      name: "Writing",
    },
    {
      id: 12,
      selected: false,
      icon: "🏞️",
      name: "Nature",
    },
    {
      id: 13,
      selected: false,
      icon: "🎨",
      name: "Painting",
    },
    {
      id: 14,
      selected: false,
      icon: "😎",
      name: "People",
    },
    {
      id: 15,
      selected: false,
      icon: "🐼",
      name: "Animals",
    },
    {
      id: 16,
      selected: false,
      icon: "💪",
      name: "Gym & Fitness",
    },
    {
      id: 17,
      selected: false,
      icon: "🍔",
      name: "Food & Drink",
    },
    {
      id: 18,
      selected: false,
      icon: "💼",
      name: "Travel & Places",
    },
    {
      id: 19,
      selected: false,
      icon: "🏐",
      name: "Sports",
    },
  ]);

  useEffect(() => {
    if (userSelected.interests)
      setInterests(
        interests.map((interest) =>
          userSelected.interests.includes(interest.name)
            ? { ...interest, selected: true }
            : interest
        )
      );
  }, [userSelected]);

  // hooks
  const sheetRef = useRef(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["25%", "55%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    // console.log("handleSheetChange", index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        data={userSelected.photos.filter((item) => !item.empty)}
        renderItem={({ item, index }) => {
          return (
            <View style={tailwind("")}>
              <Image
                style={tailwind("h-full w-full")}
                source={{ uri: item.photoURL }}
              />
            </View>
          );
        }}
        sliderWidth={Dimensions.get("screen").width}
        itemWidth={500}
      />

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetScrollView style={tailwind("px-5 mb-20")}>
          <View style={tailwind("flex-row items-center")}>
            <Text style={tailwind("text-3xl font-bold")}>
              {userSelected.displayName}
            </Text>
            <Text style={tailwind("ml-3 text-3xl")}>
              {Math.floor(
                (new Date() - userSelected.dayOfBirth.toDate().getTime()) /
                  3.15576e10
              )}
            </Text>
          </View>
          <View style={tailwind("justify-between flex-row")}>
            <Text style={tailwind("text-xl")}>
              💼 <Text style={tailwind("mt-2")}>{userSelected.job}</Text>
            </Text>
            <Text style={tailwind("text-xl")}>
              🏠 <Text style={tailwind("mt-2")}>{userSelected.location}</Text>
            </Text>
          </View>

          <Text style={tailwind("text-xl mt-2 text-gray-600")}>About</Text>
          <Text style={tailwind("text-base")}>
            He/She haven't updated about, but try swiping to have chance knowing
            more about him/her 😍.
          </Text>

          <Text style={tailwind("text-xl mt-1.5 text-gray-600")}>
            Interests
          </Text>
          <View style={tailwind("mt-2")}>
            <View style={tailwind("flex-row flex-wrap")}>
              {interests
                .filter((interest) => interest.selected)
                .map((interest, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        tailwind(
                          "bg-red-400 rounded-full h-10 flex-row px-2 text-center items-center pt-0 mr-2 mb-3"
                        ),
                      ]}
                    >
                      <Text style={tailwind("text-xl font-bold")}>
                        {interest.icon}
                      </Text>
                      <Text
                        style={[
                          tailwind("text-base font-bold pl-1 text-white"),
                        ]}
                      >
                        {interest.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>

      {/* <View
        style={[
          tailwind(
            "w-full h-64 absolute -bottom-48 bg-white rounded-t-3xl pt-5"
          ),
          show ? tailwind("h-96 bottom-0") : tailwind("h-64 -bottom-48"),
        ]}
      >
        <ScrollView style={tailwind("px-5 mb-24")}>
          <View style={tailwind("flex-row items-center")}>
            <Text style={tailwind("text-3xl font-bold")}>
              {userSelected.displayName}
            </Text>
            <Text style={tailwind("ml-3 text-3xl")}>
              {Math.floor(
                (new Date() - userSelected.dayOfBirth.toDate().getTime()) /
                  3.15576e10
              )}
            </Text>
          </View>
          <View style={tailwind("justify-between flex-row")}>
            <Text style={tailwind("text-xl")}>
              💼 <Text style={tailwind("mt-2")}>{userSelected.job}</Text>
            </Text>
            <Text style={tailwind("text-xl")}>
              🏠 <Text style={tailwind("mt-2")}>{userSelected.location}</Text>
            </Text>
          </View>

          <Text style={tailwind("text-xl mt-2 text-gray-600")}>About</Text>
          <Text style={tailwind("text-base")}>
            A good listener. I love having a good talk to know each other's side
            😍.
          </Text>
          <Text style={tailwind("text-xl mt-2 text-gray-600")}>Interests</Text>
          <View style={tailwind("mt-1")}>
            <View style={tailwind("flex-row flex-wrap")}>
              {interests
                .filter((interest) => interest.selected)
                .map((interest, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        tailwind(
                          "bg-red-400 rounded-full h-10 flex-row px-2 text-center items-center pt-0 mr-2 mb-3"
                        ),
                      ]}
                    >
                      <Text style={tailwind("text-xl font-bold")}>
                        {interest.icon}
                      </Text>
                      <Text
                        style={[
                          tailwind("text-base font-bold pl-1 text-white"),
                        ]}
                      >
                        {interest.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        </ScrollView>
      </View> */}

      {/* <TouchableOpacity
        onPress={() => {
          setShow(!show);
        }}
      >
        <Image
          style={[
            tailwind("w-12 h-12 absolute right-0 bottom-8"),
            show ? tailwind("bottom-90") : tailwind("bottom-8"),
          ]}
          source={{
            uri: !show
              ? "https://i.imgur.com/fNArG4h.png"
              : "https://i.imgur.com/BET6cj3.png",
          }}
        />
      </TouchableOpacity> */}

      <View
        style={[
          tailwind(
            "flex flex-row w-full justify-evenly items-center px-8 py-5 "
          ),
          show ? { backgroundColor: "none" } : tailwind("bg-white"),
        ]}
      >
        <View
          style={[
            tailwind(
              "flex flex-row bg-red-600 px-5 py-2 rounded-full bg-white"
            ),
            {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
          ]}
        >
          <TouchableOpacity
            style={tailwind(
              "items-center justify-center rounded-full w-12 h-12 bg-white border-rose-600 border"
            )}
            onPress={() => swipeRef.current.swipeLeft()}
          >
            <Entypo name="cross" size={26} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind(
              "items-center justify-center rounded-full w-12 h-12 mx-5 bg-white border-indigo-600 border"
            )}
          >
            <AntDesign name="star" size={26} color="blue" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind(
              "items-center justify-center rounded-full w-12 h-12 bg-white border border-green-600"
            )}
            onPress={() => swipeRef.current.swipeRight()}
          >
            <AntDesign name="heart" size={26} color="green" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={tailwind("p-2 absolute")}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default IndividualScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: dimensionsForScreen.height,
    width: dimensionsForScreen.width,
    position: "relative",
  },
});
