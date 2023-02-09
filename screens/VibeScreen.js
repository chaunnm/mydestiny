import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import Swiper from "react-native-deck-swiper";
import generateId from "../lib/generateId";
import { useTailwind } from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const dimensionsForScreen = Dimensions.get("screen");

const VibeScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { params } = useRoute();
  const { vibeSelected, filter } = params;
  const { currentUser } = useAuth();

  const [profiles, setProfiles] = useState([]);
  const [passes, setPasses] = useState([]);
  const [swipes, setSwipes] = useState([]);
  const swipeRef = useRef(null);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    // console.log(`You swiped PASS on ${userSwiped.displayName}`);

    firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("passes")
      .doc(userSwiped.id)
      .set(userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    const infor = await firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get();

    const loggedInProfile = infor.data();

    // console.log("User hien tai: ", loggedInProfile);
    // console.log("User yeu thich: ", userSwiped);

    // Check if the user swiped on you...
    firestore()
      .collection("users")
      .doc(userSwiped.id)
      .collection("swipes")
      .doc(currentUser.uid)
      .onSnapshot({
        next: (documentSnapshot) => {
          // console.log("check exists: ", documentSnapshot.exists);
          if (documentSnapshot.exists) {
            console.log(`YEAH, you MATCHED with ${userSwiped.displayName}`);

            firestore()
              .collection("users")
              .doc(currentUser.uid)
              .collection("swipes")
              .doc(userSwiped.id)
              .set(userSwiped);
            //Create a match
            firestore()
              .collection("matches")
              .doc(generateId(currentUser.uid, userSwiped.id))
              .set({
                users: {
                  [currentUser.uid]: loggedInProfile,
                  [userSwiped.id]: userSwiped,
                },
                usersMatched: [currentUser.uid, userSwiped.id],
              });

            navigation.navigate("Match", {
              loggedInProfile,
              userSwiped,
            });
          } else {
            console.log(
              `You swiped MATCH on ${userSwiped.displayName} (${userSwiped.job})`
            );

            firestore()
              .collection("users")
              .doc(currentUser.uid)
              .collection("swipes")
              .doc(userSwiped.id)
              .set(userSwiped);
          }
        },
      });
  };

  const showInfor = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSelected = profiles[cardIndex];
    navigation.navigate("Individual", {
      userSelected,
    });
  };

  useLayoutEffect(() => {
    return firestore()
      .collection("users")
      .doc(currentUser.uid)
      .onSnapshot({
        next: (documentSnapshot) => {
          if (!documentSnapshot.exists) {
            navigation.navigate("Modal");
          }
        },
      });
  }, []);

  useEffect(() => {
    firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("passes")
      .onSnapshot({
        next: (snapshot) => {
          // console.log("Passes: ", snapshot.docs);
          const newSnapshot = [...snapshot.docs];
          setPasses(newSnapshot.map((doc) => doc.id));
        },
      });
  }, [currentUser]);

  useEffect(() => {
    firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("swipes")
      .onSnapshot({
        next: (snapshot) => {
          // console.log("Swipes: ", snapshot.docs);
          const newSnapshot = [...snapshot.docs];
          setSwipes(newSnapshot.map((doc) => doc.id));
        },
      });
  }, [currentUser]);

  useEffect(() => {
    const fetchCards = async () => {
      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];
      const temp = [...passedUserIds, ...swipedUserIds];
      temp.push(currentUser.uid);

      // console.log("State swipes: ", swipes);

      firestore()
        .collection("users")
        .onSnapshot({
          next: (snapshot) => {
            setProfiles(
              snapshot.docs
                .filter(
                  (doc) =>
                    !temp.includes(doc.id) && doc.data().ideals.includes(filter)
                )
                .map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }))
            );
          },
        });
    };

    fetchCards();
  }, [passes, swipes]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#FF85A2" style="light" />
      <LinearGradient
        style={tailwind("absolute left-0 right-0 top-0 h-full w-full")}
        colors={[
          "rgba(255,133,162,1)",
          "rgba(255,133,162,1)",
          "rgba(255,133,162,0.1)",
        ]}
      />
      <View style={tailwind("flex-row mr-5 relative")}>
        <TouchableOpacity
          style={tailwind("items-center justify-center w-12 h-12 ")}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="cross" size={26} color="#3D3B73" />
        </TouchableOpacity>
        <TouchableHighlight style={tailwind("bg-white rounded-lg h-10 m-auto")}>
          <Text
            style={tailwind(
              "items-center text-center text-others font-bold text-lg px-4 my-auto"
            )}
          >
            {vibeSelected}
          </Text>
        </TouchableHighlight>
      </View>

      {/* Cards */}
      <View style={tailwind("flex-1 relative")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{
            backgroundColor: "transparent",
            // marginTop: "auto",
            // marginBottom: "auto",
          }}
          cardStyle={{ top: 10, height: "98%" }}
          cards={profiles}
          // cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            // console.log("Swipe PASS");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            // console.log("Swipe MATCH");
            swipeRight(cardIndex);
          }}
          onTapCard={(cardIndex) => {
            // console.log("Selected");
            showInfor(cardIndex);
          }}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "NOPE 🥲",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH 😍",
              style: {
                label: {
                  textAlign: "left",
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                style={tailwind("relative bg-slate-500 h-full rounded-xl")}
              >
                <Image
                  style={tailwind("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.photos[0]?.photoURL }}
                />
                <LinearGradient
                  style={tailwind(
                    "absolute left-0 right-0 bottom-0 h-1/2 rounded-xl"
                  )}
                  colors={[
                    "rgba(61,59,115,0)",
                    "rgba(61,59,115,0.1)",
                    "rgba(61,59,115,0.5)",
                    "rgba(61,59,115,0.9)",
                  ]}
                />
                <View
                  style={[
                    tailwind(
                      "absolute bottom-16 bg-transparent w-full h-20 flex-row items-center justify-between px-6 py-2 rounded-b-xl"
                    ),
                  ]}
                >
                  <View>
                    <Text style={tailwind("text-3xl font-bold text-white")}>
                      {card.displayName}
                    </Text>
                    <Text style={tailwind("text-2xl text-white font-bold")}>
                      {card.job}
                    </Text>
                  </View>
                  <Text style={tailwind("text-3xl font-bold text-white")}>
                    {Math.floor(
                      (new Date() - card.dayOfBirth.toDate().getTime()) /
                        3.15576e10
                    )}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tailwind(
                    "relative bg-white h-full rounded-xl justify-center items-center"
                  ),
                  styles.cardShadow,
                ]}
              >
                <Text style={tailwind("font-bold pb-5")}>No more profiles</Text>
                <Image
                  style={tailwind("h-20 w-20")}
                  height={100}
                  width={100}
                  source={{
                    uri: "https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037",
                  }}
                />
              </View>
            )
          }
        />
        <View
          style={tailwind(
            "flex flex-row justify-evenly mb-3 w-3/4 mx-auto absolute bottom-0 left-12"
          )}
        >
          <TouchableOpacity
            style={tailwind(
              "items-center justify-center rounded-full w-12 h-12 border-2 border-red-600 bg-slate-300"
            )}
            onPress={() => swipeRef.current.swipeLeft()}
          >
            <Entypo name="cross" size={28} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind(
              "items-center justify-center rounded-full w-12 h-12 mx-5 border-indigo-600 border-2 bg-slate-300"
            )}
          >
            <AntDesign name="star" size={26} color="blue" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind(
              "items-center justify-center rounded-full w-12 h-12 border-2 border-green-600 bg-slate-300"
            )}
            onPress={() => swipeRef.current.swipeRight()}
          >
            <AntDesign name="heart" size={26} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VibeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: dimensionsForScreen.height,
    width: dimensionsForScreen.width,
    // position: "relative",
    // paddingTop: StatusBar.currentHeight,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
