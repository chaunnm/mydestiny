import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const StoryList = () => {
  const tailwind = useTailwind();
  const { currentUser } = useAuth();
  const friendsList = [
    {
      id: 1,
      avatar:
        "https://drive.google.com/uc?export=view&id=1ItH8BbdZtd3HNu7ap5py-R74lhQZ6S8w",
      name: "Kiri Sully",
    },
    {
      id: 2,
      avatar:
        "https://drive.google.com/uc?export=view&id=1C573MrLyUxk3lZbxk8wJn42440IJ87pV",
      name: "Jack Dawson",
    },
    {
      id: 3,
      avatar:
        "https://drive.google.com/uc?export=view&id=1HAnESDzSqNdzx2Qk9dUECYrwEMP9OZbv",
      name: "Rosé Blackpink",
    },
    {
      id: 4,
      avatar:
        "https://drive.google.com/uc?export=view&id=1LUCL0DjK81kJeWcek3vekxk-mpybVTo5",
      name: "Taylor Swift",
    },
    {
      id: 5,
      avatar:
        "https://drive.google.com/uc?export=view&id=1dOICbfS4e-aZv-sQLjYQpkbZ63nC7LP0",
      name: "Jennie Blackpink",
    },
    {
      id: 6,
      avatar:
        "https://drive.google.com/uc?export=view&id=1asON0sw5LOoeJfLMmQ5ONdrJbFo8vEkh",
      name: "Mark Zuckerberg",
    },
    {
      id: 7,
      avatar:
        "https://drive.google.com/uc?export=view&id=1azkSC6SbwGaHRI4MOJqfChgZFOQI0hg1",
      name: "Charlie Puth",
    },
    {
      id: 8,
      avatar:
        "https://drive.google.com/uc?export=view&id=1XqYWb-7vnhH7v0PXZQ9XRqLepGjVlL5N",
      name: "Rihanna",
    },
  ];
  return (
    <View style={tailwind("flex-row h-24 mt-0.5")}>
      <TouchableOpacity
        style={tailwind("w-22 h-32 py-1 pr-0 mr-1 items-center")}
      >
        <View style={tailwind("relative")}>
          <Image
            style={tailwind("w-16 h-16 border-white rounded-full")}
            source={{ uri: currentUser.photoURL }}
          />
          <TouchableOpacity
            style={[
              tailwind(
                "absolute bottom-0 right-0 rounded-full bg-primary justify-center items-center font-bold border-2 border-white"
              ),
              { width: 22, height: 22 },
            ]}
          >
            <AntDesign name="plus" size={11} color="white" />
          </TouchableOpacity>
        </View>

        <Text
          style={[
            tailwind("text-center pt-1"),
            { fontFamily: "NunitoSemiBold" },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {currentUser.displayName}
        </Text>
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={tailwind("h-24")}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={friendsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tailwind("w-22 h-32 py-1 pr-0 mr-0 items-center")}
          >
            <LinearGradient
              colors={["#FFB8C9", "#FF85A2"]}
              style={tailwind("p-0.5 rounded-full")}
            >
              <TouchableOpacity
                style={tailwind(
                  "w-15 h-15 border-white border-4 rounded-full overflow-hidden"
                )}
              >
                <Image
                  style={[tailwind("w-14 h-14 border rounded-full")]}
                  source={{ uri: item.avatar }}
                />
              </TouchableOpacity>
            </LinearGradient>
            <Text
              style={[tailwind("text-center pt-1"), { fontFamily: "Nunito" }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default StoryList;
