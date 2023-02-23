import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Modal,
  Pressable,
  ToastAndroid,
  BackHandler,
} from "react-native";
import { Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import Carousel, { Pagination } from "react-native-snap-carousel";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const PolicyScreen = ({ agree }) => {
  const dimensionsForScreen = Dimensions.get("screen");
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [seenFirstTimePage, setSeenFirstTimePage] = useState(false);
  const [loader, setLoader] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [policy, setPolicy] = useState(false);
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem("seenFirstTimePage");
      if (value) {
        if (value === "true") {
          navigation.navigate("Login");
        }
        if (value === "false") {
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    };
    getData();
  }, [seenFirstTimePage]);

  const carouselRef = useRef(null);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleSnapPress = useCallback(() => {
    carouselRef.current?.snapToNext();
  }, []);

  const handleButtonClick = async () => {
    if (checked) {
      try {
        await AsyncStorage.setItem("seenFirstTimePage", "true");
        setSeenFirstTimePage(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      ToastAndroid.showWithGravity(
        "You need to accept our Policy! ✍️",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  return loader ? (
    <View style={tailwind("my-auto")}>
      <StatusBar hidden />
      <ActivityIndicator size={50} color="#FF85A2" />
    </View>
  ) : (
    <View style={tailwind("flex-1")}>
      <StatusBar hidden />
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        visible={modalVisible}
      >
        <View
          style={[
            tailwind("flex-1 justify-center items-center h-full"),
            { backgroundColor: "rgba(0,0,0,0.5)" },
          ]}
        >
          <View
            style={[
              tailwind("relative bg-white rounded-xl w-11/12"),
              {
                height: "90%",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                elevation: 5,
              },
            ]}
          >
            <TouchableOpacity
              style={tailwind("absolute right-2 top-2")}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="closecircleo" size={24} color="black" />
            </TouchableOpacity>
            <Image
              style={tailwind("w-24 h-24 self-center mt-0.5")}
              source={{ uri: "https://i.imgur.com/uzELqEg.png" }}
            />
            <Text
              style={[
                tailwind(
                  "font-bold text-2xl text-center mb-2 text-others -mt-2"
                ),
                { fontFamily: "NunitoBold" },
              ]}
            >
              Terms & Conditions
            </Text>
            <ScrollView style={tailwind("mx-2 mb-3 px-1 py-1")}>
              <Text style={[tailwind("leading-5"), { fontFamily: "Nunito" }]}>
                <Text style={{ fontFamily: "NunitoSemiBold" }}>
                  1. Introduction
                </Text>
                : This agreement outlines the terms and conditions under which
                you may use the dating app.
              </Text>
              <Text style={[tailwind("leading-5"), { fontFamily: "Nunito" }]}>
                <Text style={{ fontFamily: "NunitoSemiBold" }}>
                  2. User Eligibility
                </Text>
                : The dating app is intended for use by individuals who are 18
                years of age or older. By using the app, you represent and
                warrant that you are at least 18 years old.
              </Text>
              <Text style={[tailwind("leading-5"), { fontFamily: "Nunito" }]}>
                <Text style={{ fontFamily: "NunitoSemiBold" }}>
                  3. User Content
                </Text>
                : You are solely responsible for the content that you post on
                the dating app, including but not limited to photos, videos, and
                text. You agree not to post any content that is offensive,
                illegal, or otherwise violates the terms of this agreement.
              </Text>
              <Text style={[tailwind("leading-5"), { fontFamily: "Nunito" }]}>
                <Text style={{ fontFamily: "NunitoSemiBold" }}>
                  4. Proprietary Rights
                </Text>
                : The dating app and all content and software associated with it
                are the property of the company. You may not reproduce,
                distribute, or otherwise use the app or any content without the
                express permission of the company.
              </Text>
              <Text style={[tailwind("leading-5"), { fontFamily: "Nunito" }]}>
                <Text style={{ fontFamily: "NunitoSemiBold" }}>
                  5. Limitation of Liability
                </Text>
                : The company will not be liable for any damages arising out of
                or in connection with your use of the dating app. This includes
                but is not limited to damages for loss of profits, goodwill,
                use, data, or other intangible losses.
              </Text>
              <Text style={[tailwind("leading-5"), { fontFamily: "Nunito" }]}>
                <Text style={{ fontFamily: "NunitoSemiBold" }}>
                  6. Indemnification
                </Text>
                : You agree to indemnify and hold the company harmless from any
                claims, liabilities, damages, and expenses arising out of or in
                connection with your use of the dating app.
              </Text>
              <Text style={[tailwind("leading-5"), { fontFamily: "Nunito" }]}>
                <Text style={{ fontFamily: "NunitoSemiBold" }}>
                  7. Termination
                </Text>
                : The company may terminate this agreement at any time and for
                any reason. Upon termination, you will no longer be able to
                access the dating app.
              </Text>
              <Text style={[tailwind("leading-5"), { fontFamily: "Nunito" }]}>
                <Text style={{ fontFamily: "NunitoSemiBold" }}>
                  8. Dispute Resolution
                </Text>
                : Any disputes arising out of or in connection with this
                agreement will be resolved through binding arbitration.
              </Text>
              <Text style={[tailwind("leading-5"), { fontFamily: "Nunito" }]}>
                <Text style={{ fontFamily: "NunitoSemiBold" }}>
                  9. Governing Law
                </Text>
                : This agreement will be governed by and construed in accordance
                with the laws of the jurisdiction in which the company is
                headquartered.
              </Text>
              <Text
                style={[tailwind("leading-5 mb-1.5"), { fontFamily: "Nunito" }]}
              >
                <Text style={{ fontFamily: "NunitoSemiBold" }}>
                  {" "}
                  10. Entire Agreement
                </Text>
                : This agreement constitutes the entire understanding between
                the parties and supersedes all prior agreements,
                representations, and understandings.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View style={tailwind("mt-4")}>
        {!policy ? (
          <Carousel
            ref={carouselRef}
            scrollEnabled={false}
            data={[
              {
                photoURL: "https://i.imgur.com/qKN8bv5.png",
              },
              {
                photoURL: "https://i.imgur.com/je0M8rh.png",
              },
              {
                photoURL: "https://i.imgur.com/uYhlAq6.png",
              },
            ]}
            onSnapToItem={(index) => setActiveSlide(index)}
            renderItem={({ item, index }) => {
              return (
                <Image
                  resizeMode="cover"
                  style={tailwind("h-96 w-full rounded-2xl")}
                  source={{ uri: item.photoURL }}
                />
              );
            }}
            sliderWidth={Dimensions.get("screen").width}
            itemWidth={300}
            firstItem={0}
            // autoplay
            // autoplayInterval={5000}
          />
        ) : (
          <View style={tailwind("relative h-96")}>
            <Text
              style={[
                tailwind("text-3xl w-9/12 leading-10 pt-4 pl-4"),
                { fontFamily: "NunitoBold" },
              ]}
            >
              TO JOIN AS{"\n"}
              <Text
                style={[tailwind("text-primary"), { fontFamily: "Nunito" }]}
              >
                MY DESTINY
              </Text>{" "}
              MEMBER YOU MUST BE AT LEAST{"\n"}
              <Text
                style={[tailwind("text-something"), { fontFamily: "Nunito" }]}
              >
                18 YEARS OLD!
              </Text>
            </Text>
            <Image
              style={tailwind("w-52 h-52 absolute bottom-0 right-4")}
              resizeMode="contain"
              source={{ uri: "https://i.imgur.com/eVv2aQH.png" }}
            />
          </View>
        )}
      </View>

      <BottomSheet
        snapPoints={!policy ? ["47%"] : ["51%"]}
        style={tailwind("border-2 rounded-2xl")}
      >
        <BottomSheetScrollView style={tailwind("px-5")}>
          <View style={tailwind("flex items-center")}>
            {activeSlide == 0 && !policy ? (
              <Text
                style={[
                  tailwind("text-center text-3xl mt-2"),
                  { fontFamily: "NunitoSemiBold" },
                ]}
              >
                Find people who{" "}
                <Text
                  style={[
                    tailwind("text-3xl text-primary"),
                    { fontFamily: "NunitoSemiBold" },
                  ]}
                >
                  match
                </Text>{" "}
                with you
              </Text>
            ) : activeSlide == 1 && !policy ? (
              <Text
                style={[
                  tailwind("text-center text-3xl mt-2"),
                  { fontFamily: "NunitoSemiBold" },
                ]}
              >
                Easily{" "}
                <Text
                  style={[
                    tailwind("text-3xl text-primary"),
                    { fontFamily: "NunitoSemiBold" },
                  ]}
                >
                  message & call
                </Text>{" "}
                the people you like{" "}
              </Text>
            ) : activeSlide == 2 && !policy ? (
              <Text
                style={[
                  tailwind("text-center text-3xl mt-2"),
                  { fontFamily: "NunitoSemiBold" },
                ]}
              >
                Don’t wait anymore, find out your{" "}
                <Text
                  style={[
                    tailwind("text-3xl text-primary"),
                    { fontFamily: "NunitoSemiBold" },
                  ]}
                >
                  soul mate
                </Text>{" "}
                now
              </Text>
            ) : (
              <View style={tailwind("relative")}>
                <Text style={tailwind("text-justify text-base mb-1.5")}>
                  <Text style={{ fontFamily: "NunitoBold" }}>My Destiny</Text>{" "}
                  may contain
                  <Text style={{ fontFamily: "NunitoSemiBold" }}>
                    {" "}
                    mature content{" "}
                  </Text>
                  and is only available to{" "}
                  <Text style={{ fontFamily: "NunitoSemiBold" }}>adults</Text>.
                  If you are{" "}
                  <Text
                    style={[
                      tailwind("text-something"),
                      { fontFamily: "NunitoSemiBold" },
                    ]}
                  >
                    under the age of 18
                  </Text>
                  , it is illegal to view such material in your jurisdiction and
                  the attempt to use My Destiny will offend you,{" "}
                  <Text
                    style={[
                      tailwind("text-something"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    PLEASE DO NOT CONTINUE
                  </Text>
                  .
                </Text>
                <Text
                  style={[
                    tailwind("text-justify text-base"),
                    { fontFamily: "Nunito" },
                  ]}
                >
                  If{" "}
                  <Text style={{ fontFamily: "NunitoSemiBold" }}>
                    you are ≥ 18
                  </Text>{" "}
                  you will have permission to register as My Destiny member to
                  use the application, however to use this app you must{" "}
                  <Text style={tailwind("text-something")}>read and agree</Text>{" "}
                  to our{" "}
                </Text>
                <Pressable
                  style={tailwind("absolute bottom-0 left-11")}
                  onPress={() => setModalVisible(true)}
                >
                  <Text
                    style={[
                      tailwind("underline text-others text-base"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    Terms & Conditions
                  </Text>
                </Pressable>
              </View>
            )}
            {!policy ? (
              <Pagination
                dotsLength={3}
                activeDotIndex={activeSlide}
                containerStyle={{
                  backgroundColor: "rgba(255,255,255,1)",
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginTop: 10,
                }}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  marginVertical: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                }}
                inactiveDotStyle={
                  {
                    // Define styles for inactive dots here
                  }
                }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            ) : null}

            {activeSlide == 0 && !policy ? (
              <Image
                style={tailwind("h-28 w-28 self-center mt-1")}
                source={{
                  uri: "https://drive.google.com/uc?id=1FycSd-b46Ky1TARp2NxEk0ZKaXKc2KIL",
                }}
              />
            ) : activeSlide == 1 && !policy ? (
              <Image
                style={tailwind("h-28 w-28 self-center mt-1")}
                source={{
                  uri: "https://drive.google.com/uc?id=14pH1jeqBRpctiio1Bz7mcRiQAts8LWY7",
                }}
              />
            ) : activeSlide == 2 && !policy ? (
              <Image
                resizeMode="contain"
                style={tailwind("h-28 w-40 self-center mt-1")}
                source={{
                  uri: "https://drive.google.com/uc?id=1X0dv0k-kMBnIkNE6rW6cpVvcyFjVZwex",
                }}
              />
            ) : (
              <View style={tailwind("flex-row justify-between w-full")}>
                <View style={tailwind("-ml-1.5")}>
                  <Checkbox
                    status={checked ? "checked" : "unchecked"}
                    color={"#FF85A2"}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                </View>
                <Text
                  style={[
                    tailwind("self-center text-sm italic"),
                    { fontFamily: "Nunito", fontSize: 14.5 },
                  ]}
                >
                  I have read and agreed to Terms & Conditions
                </Text>
                {/* <Checkbox.Item
                  position="leading"
                  style={{ backgroundColor: "black" }}
                  color={"#FF85A2"}
                  labelStyle={{ fontSize: 14 }}
                  label="I have read and agreed with Terms & Conditions"
                  status={checked ? "checked" : "unchecked"}
                /> */}
              </View>
            )}
            {!policy ? (
              <TouchableOpacity
                style={tailwind(
                  "w-full py-2 rounded-xl border border-gray-500 mt-1"
                )}
                onPress={() => setPolicy(true)}
              >
                <Text
                  style={[
                    tailwind("text-primary text-center text-lg"),
                    { fontFamily: "NunitoSemiBold" },
                  ]}
                >
                  Skip
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={tailwind(
                  "w-full py-2 rounded-xl border border-something mt-1"
                )}
                onPress={handleBackButton}
              >
                <Text
                  style={[
                    tailwind("text-primary text-center text-lg"),
                    { fontFamily: "NunitoSemiBold" },
                  ]}
                >
                  No, I'm under 18 yrs old.
                </Text>
              </TouchableOpacity>
            )}

            {activeSlide != 2 && !policy ? (
              <TouchableOpacity
                style={tailwind("w-full py-2 rounded-xl bg-primary mt-3")}
                onPress={() => handleSnapPress()}
              >
                <Text
                  style={[
                    tailwind("text-white text-center text-lg"),
                    { fontFamily: "NunitoSemiBold" },
                  ]}
                >
                  Next
                </Text>
              </TouchableOpacity>
            ) : activeSlide == 2 && !policy ? (
              <TouchableOpacity
                style={tailwind("w-full py-2 rounded-xl mt-3 bg-primary")}
                onPress={() => setPolicy(true)}
              >
                <Text
                  style={[
                    tailwind("text-white text-center text-lg"),
                    { fontFamily: "NunitoSemiBold" },
                  ]}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={tailwind("w-full py-2 rounded-xl mt-3 bg-primary")}
                onPress={handleButtonClick}
              >
                <Text
                  style={[
                    tailwind("text-white text-center text-lg"),
                    { fontFamily: "NunitoSemiBold" },
                  ]}
                >
                  Yes, I'm over 18 yrs old.
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default PolicyScreen;
