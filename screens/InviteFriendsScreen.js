import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Avatar, Card } from "react-native-paper";

const InviteFriendsScreen = () => {
  const friendsList = [
    {
      id: 1,
      avatar:
        "https://drive.google.com/uc?export=view&id=1ItH8BbdZtd3HNu7ap5py-R74lhQZ6S8w",
      name: "Kiri Sully",
      phone: "+62-818-5551-71",
      isInvited: false,
    },
    {
      id: 2,
      avatar:
        "https://drive.google.com/uc?export=view&id=1C573MrLyUxk3lZbxk8wJn42440IJ87pV",
      name: "Jack Dawson",
      phone: "+62-819-5558-60",
      isInvited: false,
    },
    {
      id: 3,
      avatar:
        "https://drive.google.com/uc?export=view&id=1HAnESDzSqNdzx2Qk9dUECYrwEMP9OZbv",
      name: "Rosé Blackpink",
      phone: "+62-878-5551-31",
      isInvited: true,
    },
    {
      id: 4,
      avatar:
        "https://drive.google.com/uc?export=view&id=1LUCL0DjK81kJeWcek3vekxk-mpybVTo5",
      name: "Taylor Swift",
      phone: "+62-838-5564-60",
      isInvited: false,
    },
    {
      id: 5,
      avatar:
        "https://drive.google.com/uc?export=view&id=1dOICbfS4e-aZv-sQLjYQpkbZ63nC7LP0",
      name: "Jennie Blackpink",
      phone: "+62-838-5552-72",
      isInvited: true,
    },
    {
      id: 6,
      avatar:
        "https://drive.google.com/uc?export=view&id=1asON0sw5LOoeJfLMmQ5ONdrJbFo8vEkh",
      name: "Mark Zuckerberg",
      phone: "+62-857-5568-60",
      isInvited: true,
    },
    {
      id: 7,
      avatar:
        "https://drive.google.com/uc?export=view&id=1azkSC6SbwGaHRI4MOJqfChgZFOQI0hg1",
      name: "Charlie Puth",
      phone: "+62-834-5557-92",
      isInvited: false,
    },
    {
      id: 8,
      avatar:
        "https://drive.google.com/uc?export=view&id=1XqYWb-7vnhH7v0PXZQ9XRqLepGjVlL5N",
      name: "Rihanna",
      phone: "+62-838-5554-60",
      isInvited: true,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {friendsList.map((friend) => {
          return (
            <Card style={styles.cardContainer}>
              <View key={friend.id} style={styles.cardFriend}>
                <Avatar.Image
                  style={styles.avatar}
                  size={80}
                  source={{
                    uri: friend.avatar,
                  }}
                />
                <View style={styles.text}>
                  <Text style={styles.name}>{friend.name}</Text>
                  <Text style={styles.phone}>{friend.phone}</Text>
                </View>
                {friend.isInvited ? (
                  <Button mode="contained" buttonColor="#FF85A2">
                    Invited
                  </Button>
                ) : (
                  <Button
                    mode="outlined"
                    textColor="#FF85A2"
                  >
                    Invite
                  </Button>
                )}
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBFC",
    flex: 1,
    padding: 10,
  },
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

export default InviteFriendsScreen;
