import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import PickCell from "../components/PickCell";
import { LinearGradient } from "expo-linear-gradient";

const TopPickScreen = () => {
  const tailwind = useTailwind();
  const friendsList = [
    {
      id: 1,
      avatar:
        "https://drive.google.com/uc?export=view&id=1ItH8BbdZtd3HNu7ap5py-R74lhQZ6S8w",
      name: "Kiri Sully",
      age: 25,
      job: "Actor",
    },
    {
      id: 2,
      avatar:
        "https://drive.google.com/uc?export=view&id=1C573MrLyUxk3lZbxk8wJn42440IJ87pV",
      name: "Jack Dawson",
      age: 34,
      job: "KOL",
    },
    {
      id: 3,
      avatar:
        "https://drive.google.com/uc?export=view&id=1HAnESDzSqNdzx2Qk9dUECYrwEMP9OZbv",
      name: "Rosé",
      age: 22,
      job: "Singer",
    },
    {
      id: 4,
      avatar:
        "https://drive.google.com/uc?export=view&id=1LUCL0DjK81kJeWcek3vekxk-mpybVTo5",
      name: "Taylor Swift",
      age: 30,
      job: "Saler",
    },
    {
      id: 5,
      avatar:
        "https://drive.google.com/uc?export=view&id=1dOICbfS4e-aZv-sQLjYQpkbZ63nC7LP0",
      name: "Jennie",
      age: 40,
      job: "Dancer",
    },
    {
      id: 6,
      avatar:
        "https://drive.google.com/uc?export=view&id=1asON0sw5LOoeJfLMmQ5ONdrJbFo8vEkh",
      name: "Mark Zuckerberg",
      age: 48,
      job: "The rich",
    },
    {
      id: 7,
      avatar:
        "https://drive.google.com/uc?export=view&id=1azkSC6SbwGaHRI4MOJqfChgZFOQI0hg1",
      name: "Charlie Puth",
      age: 30,
      job: "Producer",
    },
    {
      id: 8,
      avatar:
        "https://drive.google.com/uc?export=view&id=1XqYWb-7vnhH7v0PXZQ9XRqLepGjVlL5N",
      name: "Rihanna",
      age: 32,
      job: "Businesswoman",
    },
  ];
  return (
    <SafeAreaView style={tailwind("flex-1 justify-center items-center")}>
      <Text
        style={tailwind(
          "text-base text-lightText text-center mt-3 px-3 font-semibold"
        )}
      >
        Upgrade to My Destiny Gold to for more Top Picks.
      </Text>
      <FlatList
        style={tailwind("w-full")}
        numColumns={2}
        data={friendsList}
        keyExtractor={(item) => item.id}
        // contentContainerStyle={tailwind("h-full mx-auto")}
        renderItem={({ item }) => <PickCell pickInfor={item} />}
      />
      <View style={tailwind("absolute bottom-4 left-0 right-0 items-center")}>
        <TouchableOpacity style={tailwind("relative rounded-xl")}>
          <LinearGradient
            style={tailwind(
              "absolute left-0 right-0 bottom-0 h-full rounded-xl"
            )}
            colors={["#FBBC05", "#F59124"]}
          />
          <Text
            style={tailwind(
              "text-center text-white text-lg font-semibold px-8 py-2"
            )}
          >
            UNLOCK TOP PICKS
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
  },
  cardFriend: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    width: 200,
  },
  name: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  phone: {
    marginLeft: 10,
    fontSize: 16,
    paddingTop: 5,
  },
});

export default TopPickScreen;
