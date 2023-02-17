import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import EmailScreen from "./screens/EmailScreen";
import SignupScreen from "./screens/SignupScreen";
import MessageScreen from "./screens/MessageScreen";
import useAuth from "./hooks/useAuth";
import ModalScreen from "./screens/ModalScreen";
import MatchedScreen from "./screens/MatchedScreen";
import PhoneScreen from "./screens/PhoneScreen";
import ProfileScreen from "./screens/ProfileScreen";
import IndividualScreen from "./screens/IndividualScreen";
import SucceededScreen from "./screens/SucceededScreen";
import ExploreScreen from "./screens/ExploreScreen";
import LikeScreen from "./screens/LikeScreen";
import AccountScreen from "./screens/AccountScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SettingsScreen from "./screens/SettingsScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import SafetyScreen from "./screens/SafetyScreen";
import VibeScreen from "./screens/VibeScreen";
import AddPost from "./screens/AddPost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PolicyScreen from "./screens/PolicyScreen";
import firestore from "@react-native-firebase/firestore";
import AllMatchScreen from "./screens/AllMatchScreen";

const Stack = createNativeStackNavigator();

// const HomeStackScreen = () => {
//   const HomeStack = createNativeStackNavigator();
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Home" component={HomeScreen} />
//       <HomeStack.Screen name="Chat" component={ChatScreen} />
//       <HomeStack.Screen name="Message" component={MessageScreen} />
//     </HomeStack.Navigator>
//   );
// };

const LogoHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        height: 37,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{ overflow: "visible" }}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={{ width: 214, height: 37 }}
          source={{
            uri: "https://drive.google.com/uc?export=view&id=10ckuZCn5Mt9t8VFRAlrKpT2eDH--GFkP",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          ToastAndroid.showWithGravity(
            "This feature is under development",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
        }
      >
        <MaterialCommunityIcons
          style={{ marginEnd: 30 }}
          name="bell"
          size={28}
          color="#3d3b73"
        />
      </TouchableOpacity>
    </View>
  );
};

// const HomeTabBar = () => {
//   const navigation = useNavigation();
//   <Appbar.Header>
//     <Appbar.Content title="Search Partners" onPress={() => navigation.navigate("Home")} />
//     <Appbar.Content title="Make Friends" onPress={() => navigation.navigate("Account")} />
//   </Appbar.Header>
// };

const AccountStack = () => {
  const AccountStack = createNativeStackNavigator();
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AccountStack.Screen name="AccountScreen" component={AccountScreen} />
      <AccountStack.Screen name="Settings" component={SettingsScreen} />
      <AccountStack.Screen name="Edit Profile" component={EditProfileScreen} />
      <AccountStack.Screen name="Safety" component={SafetyScreen} />
    </AccountStack.Navigator>
  );
};

const ChatStack = () => {
  const ChatStack = createNativeStackNavigator();
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
      <ChatStack.Screen name="AllMatch" component={AllMatchScreen} />
    </ChatStack.Navigator>
  );
};

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused
              ? "format-list-bulleted-square"
              : "format-list-checkbox";
          } else if (route.name === "Like") {
            iconName = focused ? "star-shooting" : "star-shooting-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "puzzle-heart" : "puzzle-heart-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "account" : "account-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#3d3b73",
        tabBarInactiveTintColor: "#d9d9d9",
      })}
    >
      {/* <Tab.Screen name="Home" component={HomeTabBar} /> */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Like" component={LikeScreen} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const [firstProfile, setFirstProfile] = useState(false);

  useEffect(() => {
    if (currentUser) {
      firestore()
        .collection("users")
        .doc(currentUser.uid)
        .onSnapshot(async (snapShot) => {
          snapShot.data().newMember
            ? setFirstProfile(true)
            : setFirstProfile(false);
        });
    }
  }, [currentUser]);

  return (
    <Stack.Navigator>
      {currentUser && firstProfile ? (
        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
            headerShown: false,
          }}
        >
          <Stack.Screen name="Profile">
            {() => <ProfileScreen firstTime />}
          </Stack.Screen>
        </Stack.Group>
      ) : currentUser && !firstProfile ? (
        <>
          <Stack.Group>
            <Stack.Screen
              name="Nav"
              component={BottomNavigator}
              options={{ headerTitle: (props) => <LogoHeader {...props} /> }}
            />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen name="Individual" component={IndividualScreen} />
            <Stack.Screen name="Vibe" component={VibeScreen} />
            <Stack.Screen name="Post" component={AddPost} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "transparentModal",
              headerShown: false,
            }}
          >
            <Stack.Screen name="Match" component={MatchedScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "transparentModal",
              headerShown: false,
            }}
          >
            <Stack.Screen name="Success" component={SucceededScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="Policy" component={PolicyScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Email" component={EmailScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Phone" component={PhoneScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
