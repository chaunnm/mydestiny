import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import MatchHeader from "../components/MatchHeader";
// import BottomNavigator from "../StackNavigator";
import { useLayoutEffect } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import Slider from "@react-native-community/slider";

const AllMatchScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const [matchIds, setMatchIds] = useState([]);
  const [matchUsers, setMatchUsers] = useState([]);
  const { currentUser } = useAuth();
  const [moreClicked, setMoreClicked] = useState(false);

  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [value, setValue] = useState(0);

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

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["68%"], []);

  const handleMoreClicked = (value) => {
    setMoreClicked(value);
    if (value) bottomSheetModalRef.current?.present();
    else bottomSheetModalRef.current?.close();
  };

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) setMoreClicked(false);
  }, []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={tailwind("bg-white flex-1")}>
        <MatchHeader
          title={"All match " + "(" + matchUsers.length + ")"}
          notification
          filter
          moreClicked={handleMoreClicked}
          opened={moreClicked}
        />
        {matchUsers.length > 0 ? (
          <FlatList
            numColumns={2}
            data={matchUsers}
            keyExtractor={(item) => item.id}
            contentContainerStyle={tailwind("h-full mx-auto")}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tailwind(
                  "h-62 w-43 rounded-xl overflow-hidden mx-3 my-4"
                )}
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
                    <Text
                      style={[
                        tailwind("text-white text-2xl"),
                        { fontFamily: "NunitoBold" },
                      ]}
                    >
                      {item.displayName},{" "}
                      <Text
                        style={[
                          tailwind("text-white text-2xl"),
                          { fontFamily: "Nunito" },
                        ]}
                      >
                        {Math.floor(
                          (new Date() - item.dayOfBirth.toDate().getTime()) /
                            3.15576e10
                        )}
                      </Text>
                    </Text>
                    <Text
                      style={[
                        tailwind("text-base text-white"),
                        { fontFamily: "NunitoSemiBold" },
                      ]}
                    >
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
            <Text
              style={[tailwind("text-base -mt-2"), { fontFamily: "Nunito" }]}
            >
              You have no match at the moment
            </Text>
          </View>
        )}
        {/* <BottomNavigator /> */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <Text
            style={[
              tailwind("text-center text-lg text-others"),
              { fontFamily: "NunitoBold" },
            ]}
          >
            Filter
          </Text>
          <BottomSheetScrollView style={tailwind("px-3 flex-1")}>
            <View style={tailwind("flex justify-between mt-2 bg-white")}>
              <Text
                style={[
                  tailwind("text-xl text-lightText"),
                  { fontFamily: "NunitoBold" },
                ]}
              >
                Location
              </Text>
              <TouchableOpacity
                style={[
                  tailwind(
                    "flex-row justify-between rounded-full border border-primary border-2 px-2 py-2.5 mt-1"
                  ),
                ]}
              >
                <Text style={tailwind("pl-2 font-nunito")}>
                  Ho Chi Minh City
                </Text>
                <FontAwesome
                  style={tailwind("mr-2")}
                  name="caret-down"
                  size={18}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View style={tailwind("flex justify-between mt-2")}>
              <Text
                style={[
                  tailwind("text-xl text-lightText"),
                  { fontFamily: "NunitoBold" },
                ]}
              >
                Gender
              </Text>
              <View style={tailwind("flex-row mt-1.5")}>
                <TouchableOpacity
                  style={tailwind(
                    "rounded-3xl border border-primary border-2 px-3 py-2 bg-white mr-2"
                  )}
                >
                  <Text
                    style={[
                      tailwind("text-primary text-center bg-white text-base"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind(
                    "rounded-3xl border border-primary border-2 px-3 py-2 bg-primary mr-2"
                  )}
                >
                  <Text
                    style={[
                      tailwind("text-white text-center text-base"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={tailwind("flex justify-between mt-2")}>
              <Text
                style={[
                  tailwind("text-xl text-lightText"),
                  { fontFamily: "NunitoBold" },
                ]}
              >
                Age
              </Text>
              <View horizontal style={tailwind("flex-row mt-1.5")}>
                <TouchableOpacity
                  style={tailwind(
                    "rounded-3xl border border-primary border-2 px-3 py-2 bg-white mr-2"
                  )}
                >
                  <Text
                    style={[
                      tailwind("text-primary text-center bg-white text-base"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    18-25
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind(
                    "rounded-3xl border border-primary border-2 px-3 py-2 bg-primary mr-2"
                  )}
                >
                  <Text
                    style={[
                      tailwind("text-white text-center text-base"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    26-30
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind(
                    "rounded-3xl border border-primary border-2 px-3 py-2 bg-white mr-2"
                  )}
                >
                  <Text
                    style={[
                      tailwind("text-primary text-center bg-white text-base"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    31-45
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind(
                    "rounded-3xl border border-primary border-2 px-3 py-2 bg-white mr-2"
                  )}
                >
                  <Text
                    style={[
                      tailwind("text-primary text-center bg-white text-base"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    Others
                  </Text>
                </TouchableOpacity>
              </View>

              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#FF85A2"
                maximumTrackTintColor="#FF85A2"
              />
            </View>

            <View style={tailwind("flex justify-between")}>
              <Text
                style={[
                  tailwind("text-xl text-lightText"),
                  { fontFamily: "NunitoBold" },
                ]}
              >
                Distance
              </Text>
              <View horizontal style={tailwind("flex-row mt-1.5")}>
                <TouchableOpacity
                  style={tailwind(
                    "rounded-3xl border border-primary border-2 px-3 py-2 bg-white mr-2"
                  )}
                >
                  <Text
                    style={[
                      tailwind("text-primary text-center bg-white text-base"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    1-10km
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind(
                    "rounded-3xl border border-primary border-2 px-3 py-2 bg-primary mr-2"
                  )}
                >
                  <Text
                    style={[
                      tailwind("text-white text-center text-base"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    11-20km
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind(
                    "rounded-3xl border border-primary border-2 px-3 py-2 bg-white mr-2"
                  )}
                >
                  <Text
                    style={[
                      tailwind("text-primary text-center bg-white text-base"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    {">30km"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind(
                    "rounded-3xl border border-primary border-2 px-3 py-2 bg-white mr-2"
                  )}
                >
                  <Text
                    style={[
                      tailwind("text-primary text-center bg-white text-base"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={tailwind("flex-row justify-between mt-3")}>
                <TouchableOpacity
                  style={tailwind(
                    "border border-primary rounded-full px-12 py-2"
                  )}
                >
                  <Text
                    style={[
                      tailwind("text-primary text-lg text-center"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={tailwind("")}>
                  <LinearGradient
                    colors={["#FFB8C9", "#FF85A2"]}
                    style={tailwind(
                      "border border-primary rounded-full px-12 py-2"
                    )}
                  >
                    <Text
                      style={[
                        tailwind("text-lg text-center text-white"),
                        { fontFamily: "NunitoBold" },
                      ]}
                    >
                      Apply Filter
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                /> */}
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default AllMatchScreen;
