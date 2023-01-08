import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import { useTailwind } from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-deck-swiper";
import generateId from "../lib/generateId";

const DUMMY_DATA = [
  {
    id: 1,
    firstName: "Sonny",
    lastName: "Sangha",
    job: "Software Developer",
    photoURL: "http://avatars.githubusercontent.com/u/24712956?v=4",
    age: 40,
  },
  {
    id: 2,
    firstName: "Barack",
    lastName: "Obama",
    job: "Software Developer",
    photoURL:
      "https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/masterrepository/performer%20images/496675/barackobama-1.jpg",
    age: 45,
  },
  {
    id: 3,
    firstName: "Elon",
    lastName: "Musk",
    job: "Software Developer",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg",
    age: 40,
  },
];

const HomeScreen = () => {
  const { signOut, currentUser } = useAuth();
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [passes, setPasses] = useState([]);
  const [swipes, setSwipes] = useState([]);
  const swipeRef = useRef(null);

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

  // useEffect(() => {
  //   const subscriber = () => {
  //     firestore()
  //       .collection("users")
  //       .doc(currentUser.uid)
  //       .collection("passes")
  //       .onSnapshot((documentSnapshot) => {
  //         if (documentSnapshot.docs) {
  //           const temp = documentSnapshot.docs.map((doc) => doc.id);
  //           setPasses(temp);
  //           console.log("Passes: ", passes);
  //           // const passedUserIds = temp.length > 0 ? temp : ["test"];
  //           // passedUserIds.push(currentUser.uid);

  //           // // setPasses(documentSnapshot.docs);
  //           // firestore()
  //           //   .collection("users")
  //           //   // .where("id", "not-in", [...passedUserIds])
  //           //   .onSnapshot({
  //           //     next: (snapshot) => {
  //           //       // console.log("Current user: ", passedUserIds);

  //           //       setProfiles(
  //           //         snapshot.docs
  //           //           // .filter((doc) => doc.id !== currentUser.uid)
  //           //           .filter((doc) => !passedUserIds.includes(doc.id))
  //           //           // .filter((doc) => {
  //           //           //   console.log("Current user: ", passedUserIds.indexOf(doc));

  //           //           //   return passedUserIds.indexOf(doc);
  //           //           // })
  //           //           .map((doc) => ({
  //           //             id: doc.id,
  //           //             ...doc.data(),
  //           //           }))
  //           //       );
  //           //     },
  //           //   });
  //         }
  //       });
  //   };
  //   return () => subscriber();
  // }, []);

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection("users")
  //     .doc(currentUser.uid)
  //     .collection("swipes")
  //     .onSnapshot((documentSnapshot) => {
  //       // console.log(documentSnapshot.docs);
  //       if (documentSnapshot.docs) {
  //         const temp = documentSnapshot.docs.map((doc) => doc.id);
  //         setSwipes(temp);
  //         // const passedUserIds = temp.length > 0 ? temp : ["test"];
  //         // passedUserIds.push(currentUser.uid);

  //         // // setPasses(documentSnapshot.docs);
  //         // firestore()
  //         //   .collection("users")
  //         //   // .where("id", "not-in", [...passedUserIds])
  //         //   .onSnapshot({
  //         //     next: (snapshot) => {
  //         //       // console.log("Current user: ", passedUserIds);

  //         //       setProfiles(
  //         //         snapshot.docs
  //         //           // .filter((doc) => doc.id !== currentUser.uid)
  //         //           .filter((doc) => !passedUserIds.includes(doc.id))
  //         //           // .filter((doc) => {
  //         //           //   console.log("Current user: ", passedUserIds.indexOf(doc));

  //         //           //   return passedUserIds.indexOf(doc);
  //         //           // })
  //         //           .map((doc) => ({
  //         //             id: doc.id,
  //         //             ...doc.data(),
  //         //           }))
  //         //       );
  //         //     },
  //         //   });
  //       }
  //     });

  //   return () => subscriber();
  // }, []);

  // useEffect(() => {
  //   const passedUserIds = passes.length > 0 ? passes : ["test"];
  //   const swipedUserIds = swipes.length > 0 ? swipes : ["test"];
  //   const temp = [...passedUserIds, ...swipedUserIds];
  //   temp.push(currentUser.uid);

  //   // console.log("temp: ", temp);

  //   const subscriber = firestore()
  //     .collection("users")
  //     // .where("id", "not-in", [...passedUserIds])
  //     .onSnapshot({
  //       next: (snapshot) => {
  //         setProfiles(
  //           snapshot.docs
  //             // .filter((doc) => doc.id !== currentUser.uid)
  //             .filter((doc) => !temp.includes(doc.id))
  //             // .filter((doc) => {
  //             //   console.log("Current user: ", passedUserIds.indexOf(doc));

  //             //   return passedUserIds.indexOf(doc);
  //             // })
  //             .map((doc) => ({
  //               id: doc.id,
  //               ...doc.data(),
  //             }))
  //         );
  //       },
  //     });
  //   return () => subscriber();
  // }, [currentUser.uid]);

  // console.log("Profiles: ", profiles);

  useEffect(() => {
    const fetchCards = async () => {
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
                .filter((doc) => !temp.includes(doc.id))
                .map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }))
            );
          },
        });
    };

    fetchCards();
  }, []);

  // console.log("Passes: ", passedUserIds);

  // console.log("Profiles: ", profiles);

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      {/* Header */}
      <View
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
      </View>

      {/* Cards */}
      <View style={tailwind("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
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
                style={tailwind("relative bg-slate-500 h-3/4 rounded-xl")}
              >
                <Image
                  style={tailwind("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={[
                    tailwind(
                      "absolute bottom-0 bg-white w-full h-20 flex-row items-center justify-between px-6 py-2 rounded-b-xl"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <View>
                    <Text style={tailwind("text-xl font-bold")}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tailwind("text-2xl font-bold")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tailwind(
                    "relative bg-white h-3/4 rounded-xl justify-center items-center"
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
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={26} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          style={tailwind(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={26} color="green" />
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
