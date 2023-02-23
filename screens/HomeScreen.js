import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import { useTailwind } from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-deck-swiper";
import generateId from "../lib/generateId";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  const { signOut, currentUser, cardUser } = useAuth();
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [passes, setPasses] = useState([]);
  const [swipes, setSwipes] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  // const [cardIndex, setCardIndex] = useState(0);
  const { defaultIndex } = 0;

  const swipeRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  const confirmLogout = () => {
    Alert.alert("Sign Out", "Are you sure want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          signOut().then(() => {
            ToastAndroid.showWithGravity(
              "You've been logged out successfully! 🎉",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          });
        },
      },
    ]);
  };

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);

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
    console.log(`You swiped RIGHT on ${userSwiped.displayName}`);

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
            navigation.navigate("Profile");
          }
        },
      });
  }, []);

  useEffect(() => {
    const subcribe = firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("passes")
      .onSnapshot({
        next: (snapshot) => {
          const newSnapshot = [...snapshot.docs];
          setPasses(newSnapshot.map((doc) => doc.id));
        },
      });
    return () => subcribe();
  }, [currentUser]);

  useEffect(() => {
    const subcribe = firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("swipes")
      .onSnapshot({
        next: (snapshot) => {
          const newSnapshot = [...snapshot.docs];
          setSwipes(newSnapshot.map((doc) => doc.id));
        },
      });
    return () => subcribe();
  }, [currentUser]);

  useEffect(() => {
    const fetchCards = async () => {
      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];
      const temp = [...passedUserIds, ...swipedUserIds];
      temp.push(currentUser.uid);

      firestore()
        .collection("users")
        .onSnapshot({
          next: (snapshot) => {
            setProfiles(
              snapshot.docs
                .filter((doc) => !temp.includes(doc.id))
                .map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }))
            );
            // setCardIndex(0);
          },
        });
    };

    fetchCards();
  }, [passes, swipes]);

  // useEffect(() => {
  //   const usersUnsubscribe = firestore()
  //     .collection("users")
  //     .onSnapshot((snapshot) => {
  //       const users = [];
  //       snapshot.forEach((doc) => {
  //         users.push({ id: doc.id, ...doc.data() });
  //       });
  //       setUsers(users);
  //     });

  //   const passesUnsubscribe = firestore()
  //     .collection("users")
  //     .doc(currentUser.uid)
  //     .collection("passes")
  //     .onSnapshot((snapshot) => {
  //       const passes = [];
  //       snapshot.forEach((doc) => {
  //         passes.push({ id: doc.id, ...doc.data() });
  //       });
  //       setPasses(passes);
  //     });

  //   const swipesUnsubscribe = firestore()
  //     .collection("users")
  //     .doc(currentUser.uid)
  //     .collection("swipes")
  //     .onSnapshot((snapshot) => {
  //       const swipes = [];
  //       snapshot.forEach((doc) => {
  //         swipes.push({ id: doc.id, ...doc.data() });
  //       });
  //       setSwipes(swipes);
  //     });

  //   return () => {
  //     usersUnsubscribe();
  //     passesUnsubscribe();
  //     swipesUnsubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const usersSnapshot = await firestore().collection("users").get();
  //     const users = usersSnapshot.docs.map((doc) => doc.data());
  //     setUsers(users);

  //     const passesSnapshot = await firestore()
  //       .collection("users")
  //       .doc(currentUser.uid)
  //       .collection("passes")
  //       .get();
  //     const passes = passesSnapshot.docs.map((doc) => doc.data());
  //     setPasses(passes);

  //     const swipesSnapshot = await firestore()
  //       .collection("users")
  //       .doc(currentUser.uid)
  //       .collection("swipes")
  //       .get();
  //     const swipes = swipesSnapshot.docs.map((doc) => doc.data());
  //     setSwipes(swipes);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (users.length) {
  //     let filtered = users;
  //     if (passes.length) {
  //       filtered = filtered.filter(
  //         (user) => !passes.some((pass) => pass.userId === currentUser.uid)
  //       );
  //     }
  //     if (swipes.length) {
  //       filtered = filtered.filter(
  //         (user) => !swipes.some((swipe) => swipe.userId === currentUser.uid)
  //       );
  //     }
  //     setFilterUsers(filtered.filter((user) => user.id !== currentUser.uid));
  //   }
  // }, [users, passes, swipes]);

  return loader ? (
    <View style={tailwind("flex-1 justify-center items-center")}>
      <ActivityIndicator size={55} />
    </View>
  ) : (
    <SafeAreaView style={tailwind("flex-1")}>
      {/* Header */}
      {/* <View
        style={tailwind("flex-row px-3 items-center justify-between relative")}
      >
        <TouchableOpacity onPress={confirmLogout}>
          <Image
            style={tailwind("h-10 w-10 rounded-full")}
            source={{ uri: currentUser.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            style={tailwind("h-14 w-14")}
            source={{ uri: "https://i.imgur.com/M9lks2g.png" }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View> */}
      {/* Cards */}
      <View style={tailwind("flex-1 mt-0 bg-white")}>
        <Swiper
          cardStyle={{ top: 8, left: 8, height: "108%", width: "96%" }}
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={2}
          cardIndex={defaultIndex}
          animateCardOpacity
          verticalSwipe={false}
          key={profiles.length}
          // onSwiped={(index) => {
          // console.log(index);
          // swipeRef.current.swipeBack();
          // }}
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
                style={[
                  tailwind(
                    "top-0 left-0 relative bg-slate-500 h-full rounded-xl overflow-hidden"
                  ),
                  styles.cardShadow,
                ]}
              >
                {card.photos[0].photoURL !== "" ? (
                  <Image
                    style={tailwind("absolute top-0 h-full w-full rounded-xl")}
                    source={{ uri: card.photos[0]?.photoURL }}
                  />
                ) : card.gender === "male" ? (
                  <Image
                    style={tailwind("absolute top-0 h-full w-full rounded-xl")}
                    source={{
                      uri: "https://drive.google.com/uc?id=1LZ5AUJmG-Dc3eE5C5heHlnZoew5B07X1",
                    }}
                  />
                ) : (
                  <Image
                    style={tailwind("absolute top-0 h-full w-full rounded-xl")}
                    source={{
                      uri: "https://drive.google.com/uc?id=1LZ5AUJmG-Dc3eE5C5heHlnZoew5B07X1",
                    }}
                  />
                )}
                <LinearGradient
                  style={tailwind(
                    "absolute left-0 right-0 bottom-0 h-1/2 rounded-xl"
                  )}
                  colors={[
                    "rgba(61,59,115,0)",
                    "rgba(61,59,115,0.7)",
                    "rgba(61,59,115,0.9)",
                    "rgba(61,59,115,1)",
                  ]}
                />
                <View
                  style={tailwind(
                    "absolute bottom-12 w-full h-24 flex-row items-center justify-between px-6 py-2 rounded-b-xl"
                  )}
                >
                  <View>
                    <Text style={tailwind("text-3xl text-white font-bold")}>
                      {card.displayName}
                    </Text>
                    <Text style={tailwind("text-white text-lg")}>
                      {card.job}
                    </Text>
                  </View>

                  <View
                    style={tailwind("flex-row justify-center items-center")}
                  >
                    <Text
                      style={tailwind(
                        "text-4xl text-white font-light text-center"
                      )}
                    >
                      {Math.floor(
                        (new Date() - card.dayOfBirth.toDate().getTime()) /
                          3.15576e10
                      )}{" "}
                    </Text>
                    <Text style={tailwind("text-lg text-white mt-2")}>ys</Text>
                    <Image
                      style={tailwind("w-10 h-10")}
                      source={{ uri: "https://i.imgur.com/Kj0SveG.png" }}
                    />
                  </View>
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
      </View>

      <View style={tailwind("flex flex-row justify-evenly mb-3")}>
        <TouchableOpacity
          style={tailwind(
            "items-center justify-center rounded-full w-12 h-12 border border-red-400"
          )}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={26} color="#DA251D" />
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
            "items-center justify-center rounded-full w-12 h-12 border border-blue-400"
          )}
        >
          <AntDesign name="star" size={26} color="#1DA1F2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={tailwind(
            "items-center justify-center rounded-full w-12 h-12 border border-green-400"
          )}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={26} color="#70D7A6" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
