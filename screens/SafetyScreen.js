import { ScrollView, View, StyleSheet, Image } from "react-native";
import React from "react";
import { Avatar, Text, Card } from "react-native-paper";
import useAuth from "../hooks/useAuth";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const SafetyScreen = () => {
  const { currentUser } = useAuth();
  const imgSafety = (props) => (
    <Avatar.Image
      {...props}
      source={{
        uri: "https://drive.google.com/uc?export=view&id=1sAFdyY88b1oxEGbBuShl3NLWQiCSUpcW",
      }}
      size={60}
    />
  );

  const imgDeal = (props) => (
    <Avatar.Image
      {...props}
      source={{
        uri: "https://drive.google.com/uc?export=view&id=1atMFQxgGYgkHYXszAO7NURDIY-cxFRWF",
      }}
      size={60}
      style={{ backgroundColor: "#fff" }}
    />
  );

  const imgIRL = (props) => (
    <Avatar.Image
      {...props}
      source={{
        uri: "https://drive.google.com/uc?export=view&id=1_ZHkEP3GzxiZY5QPGQsLUhpI3O-PWZYK",
      }}
      size={60}
      style={{ backgroundColor: "#fff" }}
    />
  );

  const imgReport = (props) => (
    <Avatar.Image
      {...props}
      source={{
        uri: "https://drive.google.com/uc?export=view&id=1mnvF6DRmmyAgEvatoI2ZlmS2E4G1qAMR",
      }}
      size={60}
      style={{ backgroundColor: "#fff" }}
    />
  );

  const imgTravel = (props) => (
    <Avatar.Image
      {...props}
      source={{
        uri: "https://drive.google.com/uc?export=view&id=1-b8351AxGZrgtuNQaId2SJQ4TfgnO1pM",
      }}
      size={60}
      style={{ backgroundColor: "#fff" }}
    />
  );

  const quiz = (props) => (
    <Text
      style={{
        backgroundColor: "#ddd",
        borderRadius: 5,
        padding: 5,
        textAlign: "center",
        fontFamily: "Nunito",
      }}
    >
      Quiz
    </Text>
  );

  return (
    <SafeAreaView style={{ padding: 10, backgroundColor: "#FFFBFC", flex: 1 }}>
      <ScrollView>
        <View style={styles.introContainer}>
          <View>
            <Text variant="headlineLarge" style={{ fontFamily: "NunitoBold" }}>
              Hi {currentUser.displayName}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: "Nunito",
                textAlign: "justify",
                maxWidth: "80%",
              }}
            >
              Here's what you need to know about MyDestiny's safety
            </Text>
          </View>
          <View style={styles.avatar}>
            <Avatar.Image
              style={styles.avatarImg}
              size={80}
              source={{ uri: currentUser.photoURL }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text
            variant="headlineSmall"
            style={{ fontFamily: "NunitoBold", paddingBottom: 10 }}
          >
            Safety
          </Text>
          <Card
            style={{
              backgroundColor: "#fff",
              paddingVertical: 10,
              marginBottom: 8,
            }}
          >
            <Card.Title
              title="The Basics"
              titleStyle={{ fontFamily: "NunitoBold", paddingLeft: 10 }}
              subtitle="What you need to know to be safer on MyDestiny and IRL -- all in one place"
              subtitleNumberOfLines={4}
              subtitleStyle={{ fontFamily: "Nunito", paddingLeft: 10 }}
              left={imgSafety}
              right={(props) => (
                <Entypo
                  {...props}
                  name="chevron-right"
                  size={30}
                  color="#FF9EB5"
                />
              )}
            />
          </Card>
          <Card
            style={{
              backgroundColor: "#fff",
              marginBottom: 8,
            }}
          >
            <Card.Title
              title="Online Dating Safety Quiz"
              titleStyle={{ fontFamily: "NunitoBold", paddingLeft: 10 }}
              left={quiz}
              right={(props) => (
                <Entypo
                  {...props}
                  name="chevron-right"
                  size={30}
                  color="#FF9EB5"
                />
              )}
            />
          </Card>
          <Card
            style={{
              backgroundColor: "#fff",
              marginBottom: 8,
            }}
          >
            <Card.Title
              title="MyDestiny Community Guidelines Quiz"
              titleNumberOfLines={2}
              titleStyle={{ fontFamily: "NunitoBold", paddingLeft: 10 }}
              left={quiz}
              right={(props) => (
                <Entypo
                  {...props}
                  name="chevron-right"
                  size={30}
                  color="#FF9EB5"
                />
              )}
            />
          </Card>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text
            variant="headlineSmall"
            style={{ fontFamily: "NunitoBold", paddingBottom: 10 }}
          >
            Harassment
          </Text>
          <Card
            style={{
              backgroundColor: "#fff",
              paddingVertical: 10,
              marginBottom: 8,
            }}
          >
            <Card.Title
              title="How To Deal"
              titleStyle={{ fontFamily: "NunitoBold", paddingLeft: 10 }}
              subtitle="If you see somethin, say something"
              subtitleNumberOfLines={4}
              subtitleStyle={{ fontFamily: "Nunito", paddingLeft: 10 }}
              left={imgDeal}
              right={(props) => (
                <Entypo
                  {...props}
                  name="chevron-right"
                  size={30}
                  color="#FF9EB5"
                />
              )}
            />
          </Card>
          <Card
            style={{
              backgroundColor: "#fff",
              marginBottom: 8,
            }}
          >
            <Card.Title
              title="7 times it's perfectly acceptable to ghost someone"
              titleNumberOfLines={2}
              titleStyle={{
                fontFamily: "NunitoBold",
                paddingLeft: 10,
                textTransform: "capitalize",
              }}
              // left={quiz}
              right={(props) => (
                <Entypo
                  {...props}
                  name="chevron-right"
                  size={30}
                  color="#FF9EB5"
                />
              )}
            />
          </Card>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text
            variant="headlineSmall"
            style={{ fontFamily: "NunitoBold", paddingBottom: 10 }}
          >
            In Real Life
          </Text>
          <Card
            style={{
              backgroundColor: "#fff",
              paddingVertical: 10,
              marginBottom: 8,
            }}
          >
            <Card.Title
              title="Your IRL Guide"
              titleStyle={{ fontFamily: "NunitoBold", paddingLeft: 10 }}
              subtitle="Tips to help you be safer IRL (even though we wish you didn't have to)"
              subtitleNumberOfLines={4}
              subtitleStyle={{ fontFamily: "Nunito", paddingLeft: 10 }}
              left={imgIRL}
              right={(props) => (
                <Entypo
                  {...props}
                  name="chevron-right"
                  size={30}
                  color="#FF9EB5"
                />
              )}
            />
          </Card>
          <Card
            style={{
              backgroundColor: "#fff",
              marginBottom: 8,
            }}
          >
            <Card.Title
              title="IRL safety 101 quiz"
              titleNumberOfLines={2}
              titleStyle={{
                fontFamily: "NunitoBold",
                paddingLeft: 10,
                textTransform: "capitalize",
              }}
              left={quiz}
              right={(props) => (
                <Entypo
                  {...props}
                  name="chevron-right"
                  size={30}
                  color="#FF9EB5"
                />
              )}
            />
          </Card>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text
            variant="headlineSmall"
            style={{ fontFamily: "NunitoBold", paddingBottom: 10 }}
          >
            Reporting
          </Text>
          <Card
            style={{
              backgroundColor: "#fff",
              paddingVertical: 10,
              marginBottom: 8,
            }}
          >
            <Card.Title
              title="What to Report"
              titleStyle={{ fontFamily: "NunitoBold", paddingLeft: 10 }}
              subtitle="When you should report someone and when you shouldn't"
              subtitleNumberOfLines={4}
              subtitleStyle={{ fontFamily: "Nunito", paddingLeft: 10 }}
              left={imgReport}
              right={(props) => (
                <Entypo
                  {...props}
                  name="chevron-right"
                  size={30}
                  color="#FF9EB5"
                />
              )}
            />
          </Card>
          <Card
            style={{
              backgroundColor: "#fff",
              marginBottom: 8,
            }}
          >
            <Card.Title
              title="How to report someone"
              titleNumberOfLines={2}
              titleStyle={{
                fontFamily: "NunitoBold",
                paddingLeft: 10,
                textTransform: "capitalize",
              }}
              right={(props) => (
                <Entypo
                  {...props}
                  name="chevron-right"
                  size={30}
                  color="#FF9EB5"
                />
              )}
            />
          </Card>
          <Card
            style={{
              backgroundColor: "#fff",
              marginBottom: 8,
            }}
          >
            <Card.Title
              title="What happens after I report?"
              titleNumberOfLines={2}
              titleStyle={{
                fontFamily: "NunitoBold",
                paddingLeft: 10,
                textTransform: "capitalize",
              }}
              right={(props) => (
                <Entypo
                  {...props}
                  name="chevron-right"
                  size={30}
                  color="#FF9EB5"
                />
              )}
            />
          </Card>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text
            variant="headlineSmall"
            style={{ fontFamily: "NunitoBold", paddingBottom: 10 }}
          >
            Travel
          </Text>
          <Card
            style={{
              backgroundColor: "#fff",
              paddingVertical: 10,
              marginBottom: 8,
            }}
          >
            <Card.Title
              title="The Do's and Don'ts"
              titleStyle={{ fontFamily: "NunitoBold", paddingLeft: 10 }}
              subtitle="In order to have the trip of a lifetime, there are a few things you need to know"
              subtitleNumberOfLines={4}
              subtitleStyle={{ fontFamily: "Nunito", paddingLeft: 10 }}
              left={imgTravel}
              right={(props) => (
                <Entypo
                  {...props}
                  name="chevron-right"
                  size={30}
                  color="#FF9EB5"
                />
              )}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  introContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  avatar: {
    borderColor: "#ffb8c9",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    width: 90,
    borderRadius: 100,
  },
  avatarImg: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SafetyScreen;
