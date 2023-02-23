import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  ToastAndroid,
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
import Carousel, { Pagination } from "react-native-snap-carousel";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ImageViewer from "react-native-image-zoom-viewer";
import generateId from "../lib/generateId";

const dimensionsForScreen = Dimensions.get("screen");

const IndividualScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const { params } = useRoute();
  const { userSelected } = params;

  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
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
  const [currentUserInfor, setCurrentUserInfor] = useState();

  useState(() => {
    firestore()
      .collection("users")
      .doc(currentUser.uid)
      .onSnapshot(async (snapShot) => {
        setCurrentUserInfor(snapShot.data());
      });
  }, [currentUser]);

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
  const snapPoints = useMemo(() => ["28%", "55%"], []);

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

  const swipeLeft = async () => {
    ToastAndroid.showWithGravity(
      `You swiped PASS on ${userSelected.displayName}`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
    firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("passes")
      .doc(userSelected.id)
      .set(userSelected);
  };

  const swipeRight = async () => {
    const infor = await firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get();

    const loggedInProfile = infor.data();

    firestore()
      .collection("users")
      .doc(userSelected.id)
      .collection("swipes")
      .doc(currentUser.uid)
      .onSnapshot({
        next: (documentSnapshot) => {
          if (documentSnapshot.exists) {
            console.log(`YEAH, you MATCHED with ${userSelected.displayName}`);

            firestore()
              .collection("users")
              .doc(currentUser.uid)
              .collection("swipes")
              .doc(userSelected.id)
              .set(userSelected);

            //Create a match
            firestore()
              .collection("matches")
              .doc(generateId(currentUser.uid, userSelected.id))
              .set({
                users: {
                  [currentUser.uid]: loggedInProfile,
                  [userSelected.id]: userSelected,
                },
                usersMatched: [currentUser.uid, userSelected.id],
                theme: {
                  id: 1,
                  background: "https://wallpaperaccess.com/full/1076238.jpg",
                  senderColor: "#FD697F",
                  receiverColor: "#E6E8EB",
                  selected: true,
                },
              });

            navigation.navigate("Match", {
              loggedInProfile,
              userSelected,
            });
          } else {
            ToastAndroid.showWithGravity(
              `You swiped MATCH on ${userSelected.displayName}`,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );

            firestore()
              .collection("users")
              .doc(currentUser.uid)
              .collection("swipes")
              .doc(userSelected.id)
              .set(userSelected);
          }
        },
      });
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        data={
          userSelected.photos.filter((item) => !item.empty).length !== 0
            ? userSelected.photos.filter((item) => !item.empty)
            : userSelected.gender === "male"
            ? [
                {
                  photoURL:
                    "https://drive.google.com/uc?id=1LZ5AUJmG-Dc3eE5C5heHlnZoew5B07X1",
                },
              ]
            : [
                {
                  photoURL:
                    "https://drive.google.com/uc?id=1LZ5AUJmG-Dc3eE5C5heHlnZoew5B07X1",
                },
              ]
        }
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setInitialIndex(index);
                setVisible(true);
              }}
            >
              <Image
                resizeMode="cover"
                style={tailwind("h-full w-full")}
                source={{ uri: item.photoURL }}
              />
            </TouchableOpacity>
          );
        }}
        sliderWidth={Dimensions.get("screen").width}
        onSnapToItem={(index) => setActiveImage(index)}
        itemWidth={dimensionsForScreen.width}
      />
      {/* <View style={tailwind("absolute absolute top-0 left-1/3 ml-1")}> */}
      <Pagination
        dotsLength={userSelected.photos.filter((item) => !item.empty).length}
        activeDotIndex={activeImage}
        containerStyle={{
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 10,
          paddingHorizontal: 3,
          paddingLeft: 0,
          paddingRight: 0,
          position: "absolute",
          left: 0,
        }}
        dotContainerStyle={{ marginHorizontal: 1 }}
        dotStyle={{
          width:
            dimensionsForScreen.width /
              userSelected.photos.filter((item) => !item.empty).length +
            0.1,
          height: 5,
          borderRadius: 5,
          marginHorizontal: 0,
          marginLeft: 0,
          marginRight: 0,
          marginVertical: 0,
          padding: 0,
          backgroundColor: "rgba(61, 59, 115, 1)",
        }}
        inactiveDotStyle={{
          width:
            dimensionsForScreen.width /
              userSelected.photos.filter((item) => !item.empty).length +
            0.1,
          height: 5,
          borderRadius: 5,
          marginHorizontal: 0,
          marginVertical: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        // inactiveDotOpacity={0.4}
        inactiveDotScale={1}
      />
      {/* </View> */}

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetScrollView style={tailwind("px-5 mb-24")}>
          <View style={tailwind("flex-row justify-between")}>
            <Text style={[tailwind("text-3xl"), { fontFamily: "NunitoBold" }]}>
              {userSelected.displayName.length < 14
                ? userSelected.displayName
                : userSelected.displayName.substring(0, 14) + "..."}
            </Text>
            <Text style={[tailwind("ml-3 text-3xl"), { fontFamily: "Nunito" }]}>
              {Math.floor(
                (new Date() - userSelected.dayOfBirth.toDate().getTime()) /
                  3.15576e10
              )}
            </Text>
          </View>
          {currentUserInfor?.geoPoint &&
          userSelected?.geoPoint &&
          currentUserInfor?.geoPoint !== null &&
          userSelected?.geoPoint !== null ? (
            <Text
              style={[
                tailwind("text-base self-end text-lightText"),
                { fontFamily: "Nunito" },
              ]}
            >
              🛣️
              {getDistance(
                userSelected.geoPoint.latitude,
                userSelected.geoPoint.longitude,
                currentUserInfor.geoPoint.latitude,
                currentUserInfor.geoPoint.longitude
              ).toFixed() + " km"}
            </Text>
          ) : (
            <Text
              style={[
                tailwind("text-base self-end text-lightText -mt-1 py-1"),
                { fontFamily: "Nunito" },
              ]}
            >
              🛣️ No information
            </Text>
          )}
          <View style={tailwind("justify-between flex-row")}>
            <Text style={tailwind("text-xl font-nunito")}>
              💼 <Text style={tailwind("mt-2")}>{userSelected.job}</Text>
            </Text>
            <Text style={tailwind("text-xl font-nunito")}>
              🏠{" "}
              <Text style={tailwind("mt-2 font-nunito")}>
                {userSelected.location
                  ? userSelected.location?.city?.name?.replace(
                      /Tỉnh |Thành phố /gi,
                      function (matched) {
                        return { "Tỉnh ": "", "Thành phố ": "" }[matched];
                      }
                    )
                  : "No information"}
              </Text>
            </Text>
          </View>

          <Text style={tailwind("text-xl mt-2 text-gray-600 font-nunito")}>
            About
          </Text>
          <Text style={tailwind("text-base font-nunito")}>
            He/She haven't updated about, but try swiping to have chance knowing
            more about him/her 😍.
          </Text>

          <Text style={tailwind("text-xl mt-1.5 text-gray-600 font-nunito")}>
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
                      <Text
                        style={[
                          tailwind("text-xl"),
                          { fontFamily: "NunitoBold" },
                        ]}
                      >
                        {interest.icon}
                      </Text>
                      <Text
                        style={[
                          tailwind("text-base pl-1 text-white"),
                          { fontFamily: "NunitoBold" },
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

      <View
        style={[
          tailwind(
            "flex flex-row w-full justify-evenly items-center px-8 py-4"
          ),
          show ? { backgroundColor: "transparent" } : tailwind("bg-white"),
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
            onPress={() => swipeLeft()}
          >
            <Entypo name="cross" size={26} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              ToastAndroid.showWithGravity(
                "This feature is under development!",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
            }}
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
            onPress={() => swipeRight()}
          >
            <AntDesign name="heart" size={26} color="green" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={tailwind("p-2 absolute top-2")}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
      </TouchableOpacity>

      <Modal visible={visible} transparent={true} style={tailwind("relative")}>
        <ImageViewer
          imageUrls={
            userSelected.photos.filter((item) => !item.empty).length !== 0
              ? userSelected.photos
                  .filter((item) => !item.empty)
                  .map((item) => ({ url: item.photoURL }))
              : userSelected.gender === "male"
              ? [
                  {
                    url: "https://drive.google.com/uc?id=1LZ5AUJmG-Dc3eE5C5heHlnZoew5B07X1",
                  },
                ]
              : [
                  {
                    url: "https://drive.google.com/uc?id=1LZ5AUJmG-Dc3eE5C5heHlnZoew5B07X1",
                  },
                ]
          }
          index={initialIndex}
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
