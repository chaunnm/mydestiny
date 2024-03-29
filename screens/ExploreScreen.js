import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const ExploreScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView style={tailwind("flex-1")}>
        <View style={tailwind("mx-3 rounded-xl overflow-hidden mt-1 relative")}>
          <ImageBackground
            style={tailwind("h-52 flex-1")}
            source={{ uri: "https://i.imgur.com/uBkqstD.png" }}
          >
            <LinearGradient
              style={tailwind("absolute left-0 right-0 top-0 h-full")}
              colors={["rgba(0,0,0,0.5)", "rgba(255,255,255,0.3)"]}
            />
            <Text
              style={[
                tailwind("text-lg text-white leading-7 p-3"),
                { fontFamily: "NunitoBold" },
              ]}
            >
              Meet your soulmate 🤞. {"\n"}
              Interact with people with the same interest like you.
            </Text>
            <View style={tailwind("bottom-4 right-4 absolute")}>
              <TouchableOpacity
                style={[
                  tailwind(
                    "flex-row justify-between items-center py-2.5 px-5 rounded-full bg-white"
                  ),
                ]}
                onPress={() => navigation.navigate("Search Partners")}
              >
                <Text
                  style={[
                    tailwind("text-center text-primary text-base"),
                    { fontFamily: "Nunito" },
                  ]}
                >
                  Search Partners
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <Text
            style={[
              tailwind("mt-2 text-others text-2xl"),
              { fontFamily: "NunitoBold" },
            ]}
          >
            Welcome to explore
          </Text>
          <Text style={[tailwind("text-base"), { fontFamily: "Nunito" }]}>
            My vibe is...
          </Text>

          <View
            style={tailwind(
              "flex-row w-full justify-between content-between h-62 mt-3"
            )}
          >
            <TouchableOpacity
              style={tailwind("h-62 w-43 rounded-xl overflow-hidden")}
              onPress={() => {
                navigation.navigate("Vibe", {
                  vibeSelected: "Looking for love",
                  filter: "Love",
                });
              }}
            >
              <ImageBackground
                resizeMode="cover"
                style={tailwind("flex-1 h-full w-full mx-auto relative")}
                source={{ uri: "https://i.imgur.com/AeTtoT5.png" }}
              >
                <LinearGradient
                  style={tailwind("absolute left-0 right-0 top-0 h-full")}
                  colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)"]}
                />
                <Text
                  style={[
                    tailwind("text-white text-3xl p-3 top-1/3"),
                    { fontFamily: "NunitoBold" },
                  ]}
                >
                  Looking for love
                </Text>
                <View style={tailwind("absolute bottom-0 mb-1 p-3")}>
                  <Text
                    style={[
                      tailwind("text-white"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    Sweep me off my feet
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={[
                        tailwind("text-slate-400"),
                        { fontFamily: "NunitoBold" },
                      ]}
                    >
                      Discover
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={tailwind("h-62 w-43 rounded-xl overflow-hidden")}
              onPress={() => {
                navigation.navigate("Vibe", {
                  vibeSelected: "Free tonight",
                  filter: "Fling",
                });
              }}
            >
              <ImageBackground
                resizeMode="cover"
                style={tailwind("flex-1 h-full w-full mx-auto")}
                source={{ uri: "https://i.imgur.com/WSZvfad.png" }}
              >
                <LinearGradient
                  style={tailwind("absolute left-0 right-0 top-0 h-full")}
                  colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)"]}
                />
                <Text
                  style={[
                    tailwind("text-white text-3xl p-3 top-1/3"),
                    { fontFamily: "NunitoBold" },
                  ]}
                >
                  Free tonight
                </Text>
                <View style={tailwind("absolute bottom-0 mb-1 p-3")}>
                  <Text
                    style={[
                      tailwind("text-white"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    Down for something spontaneous
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={[
                        tailwind("text-slate-400"),
                        { fontFamily: "NunitoBold" },
                      ]}
                    >
                      Discover
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={tailwind("flex-row w-full justify-between h-62 mt-4")}>
            <TouchableOpacity
              style={tailwind("h-62 w-43 rounded-xl overflow-hidden")}
              onPress={() => {
                navigation.navigate("Vibe", {
                  vibeSelected: "Let's be friends",
                  filter: "Friends",
                });
              }}
            >
              <ImageBackground
                resizeMode="cover"
                style={tailwind("flex-1 h-full w-full mx-auto")}
                source={{ uri: "https://i.imgur.com/98NQYUy.png" }}
              >
                <LinearGradient
                  style={tailwind("absolute left-0 right-0 top-0 h-full")}
                  colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)"]}
                />
                <Text
                  style={[
                    tailwind("text-white text-3xl p-3 top-1/3"),
                    { fontFamily: "NunitoBold" },
                  ]}
                >
                  Let's be friends
                </Text>
                <View style={tailwind("absolute bottom-0 mb-1 p-3")}>
                  <Text
                    style={[
                      tailwind("text-white"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    Maybe even besties
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={[
                        tailwind("text-slate-400"),
                        { fontFamily: "NunitoBold" },
                      ]}
                    >
                      Discover
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={tailwind("h-62 w-43 rounded-xl overflow-hidden")}
              onPress={() => {
                navigation.navigate("Vibe", {
                  vibeSelected: "Business",
                  filter: "Business",
                });
              }}
            >
              <ImageBackground
                resizeMode="cover"
                style={tailwind("flex-1 h-full w-full mx-auto")}
                source={{ uri: "https://i.imgur.com/HCSWdZx.png" }}
              >
                <LinearGradient
                  style={tailwind("absolute left-0 right-0 top-0 h-full")}
                  colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)"]}
                />
                <Text
                  style={[
                    tailwind("text-white text-3xl p-3 top-1/3"),
                    { fontFamily: "NunitoBold" },
                  ]}
                >
                  Business
                </Text>
                <View style={tailwind("absolute bottom-0 mb-1 p-3")}>
                  <Text
                    style={[
                      tailwind("text-white"),
                      { fontFamily: "NunitoBold" },
                    ]}
                  >
                    Take me to your favourite café
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={[
                        tailwind("text-slate-400"),
                        { fontFamily: "NunitoBold" },
                      ]}
                    >
                      Discover
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;
