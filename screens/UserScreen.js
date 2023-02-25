import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  Alert,
  ToastAndroid,
  FlatList,
  RefreshControl,
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
import PostCard from "../components/PostCard";

const dimensionsForScreen = Dimensions.get("screen");

const UserScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const { params } = useRoute();
  const { item } = params;

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
  const [posts, setPosts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    firestore()
      .collection("posts")
      .where("user.id", "==", item.id)
      .orderBy("timestamp", "desc")
      .onSnapshot({
        next: (snapshot) => {
          console.log(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
            }))
          );
          setPosts(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
            }))
          );
        },
      });
  }, [firestore]);

  useState(() => {
    firestore()
      .collection("users")
      .doc(currentUser.uid)
      .onSnapshot(async (snapShot) => {
        setCurrentUserInfor(snapShot.data());
      });
  }, [currentUser]);

  useEffect(() => {
    if (item.interests)
      setInterests(
        interests.map((interest) =>
          item.interests.includes(interest.name)
            ? { ...interest, selected: true }
            : interest
        )
      );
  }, [item]);

  // hooks
  const sheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["28%", "55%", "100%"], []);

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

  const deleteMatch = async () => {
    navigation.goBack();
    let temp = generateId(currentUser.uid, item.id);

    const batch = firestore().batch();

    // Delete the currentUser's swipe doc inside the item's swipes collection
    const itemSwipesRef = firestore()
      .collection("users")
      .doc(item.id)
      .collection("swipes")
      .doc(currentUser.uid);
    batch.delete(itemSwipesRef);

    // Delete the item's swipe doc inside the currentUser's swipes collection
    const currentUserSwipesRef = firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("swipes")
      .doc(item.id);
    batch.delete(currentUserSwipesRef);

    // Delete the match doc
    const matchRef = firestore().collection("matches").doc(temp);
    batch.delete(matchRef);

    // Commit the batch
    try {
      await batch.commit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBreakUp = async () => {
    Alert.alert("Dismiss swipe", "Are you sure want to dismiss this swipe?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteMatch();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        data={
          item.photos.filter((item) => !item.empty).length !== 0
            ? item.photos.filter((item) => !item.empty)
            : item.gender === "male"
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
        dotsLength={item.photos.filter((item) => !item.empty).length}
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
              item.photos.filter((item) => !item.empty).length +
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
              item.photos.filter((item) => !item.empty).length +
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

      <TouchableOpacity
        style={tailwind("p-2 absolute top-2")}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
      </TouchableOpacity>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetScrollView style={tailwind("px-3")}>
          <View style={tailwind("flex-row justify-between")}>
            <Text style={[tailwind("text-3xl"), { fontFamily: "NunitoBold" }]}>
              {item.displayName.length < 14
                ? item.displayName
                : item.displayName.substring(0, 14) + "..."}
            </Text>
            <Text style={[tailwind("ml-3 text-3xl"), { fontFamily: "Nunito" }]}>
              {Math.floor(
                (new Date() - item.dayOfBirth.toDate().getTime()) / 3.15576e10
              )}
            </Text>
          </View>
          {currentUserInfor?.geoPoint &&
          item?.geoPoint &&
          currentUserInfor?.geoPoint !== null &&
          item?.geoPoint !== null ? (
            <Text
              style={[
                tailwind("text-base self-end text-lightText pb-1"),
                { fontFamily: "Nunito" },
              ]}
            >
              🛣️
              {getDistance(
                item.geoPoint.latitude,
                item.geoPoint.longitude,
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
              💼 <Text style={tailwind("mt-2")}>{item.job}</Text>
            </Text>
            <Text style={tailwind("text-xl font-nunito")}>
              🏠{" "}
              <Text style={tailwind("mt-2 font-nunito")}>
                {item.location
                  ? item.location?.city?.name?.replace(
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

          <Text style={tailwind("text-xl mt-1.5 text-gray-600 font-nunito")}>
            Posts
          </Text>
          <View style={tailwind("flex-1 justify-center items-center")}>
            {posts ? (
              <FlatList
                data={posts}
                style={tailwind("w-full py-2")}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    colors={["#FF85A2"]}
                    onRefresh={onRefresh}
                  />
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: post }) => (
                  <PostCard key={post.index} post={post} />
                )}
              />
            ) : (
              <Text style={tailwind("text-primary font-nunito text-base")}>
                She/He hasn't posted anything yet!
              </Text>
            )}
          </View>

          <Text style={tailwind("text-xl mt-1.5 text-gray-600 font-nunito")}>
            Actions
          </Text>
          <TouchableOpacity
            style={tailwind(
              "border border-gray-300 border-x-0 mt-2 border-b-0"
            )}
          >
            <Text
              style={[
                tailwind("uppercase text-base py-2.5 text-center"),
                { fontFamily: "NunitoSemiBold" },
              ]}
            >
              Report{" "}
              <Text style={{ fontFamily: "NunitoBold" }}>
                {item.displayName}
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBreakUp}
            style={tailwind("border border-something border-x-0")}
          >
            <Text
              style={[
                tailwind(
                  "uppercase text-base py-2.5 text-center text-something"
                ),
                { fontFamily: "NunitoBold" },
              ]}
            >
              "Break Up"
            </Text>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheet>

      <Modal visible={visible} transparent={true} style={tailwind("relative")}>
        <ImageViewer
          imageUrls={
            item.photos.filter((item) => !item.empty).length !== 0
              ? item.photos
                  .filter((item) => !item.empty)
                  .map((item) => ({ url: item.photoURL }))
              : item.gender === "male"
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

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: dimensionsForScreen.height,
    width: dimensionsForScreen.width,
    position: "relative",
  },
});
