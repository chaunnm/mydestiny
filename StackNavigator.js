import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MessageScreen from "./screens/MessageScreen";
import useAuth from "./hooks/useAuth";
import ModalScreen from "./screens/ModalScreen";
import MatchedScreen from "./screens/MatchedScreen";
import ExploreScreen from "./screens/ExploreScreen";
import LikeScreen from "./screens/LikeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

// const StackNavigator = () => {
//   const { currentUser } = useAuth();
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       {currentUser ? (
//         <>
//           <Stack.Group>
//             <Stack.Screen name="Home" component={HomeScreen} />
//             <Stack.Screen name="Chat" component={ChatScreen} />
//             <Stack.Screen name="Message" component={MessageScreen} />
//           </Stack.Group>
//           <Stack.Group screenOptions={{ presentation: "modal" }}>
//             <Stack.Screen name="Modal" component={ModalScreen} />
//           </Stack.Group>
//           <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
//             <Stack.Screen name="Match" component={MatchedScreen} />
//           </Stack.Group>
//         </>
//       ) : (
//         <>
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Signup" component={SignupScreen} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// };

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
      {/* <TouchableOpacity
        style={{ overflow: "visible" }}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={{ width: 214 }}
          source={{
            uri: "https://drive.google.com/uc?export=view&id=10ckuZCn5Mt9t8VFRAlrKpT2eDH--GFkP",
          }}
        />
      </TouchableOpacity> */}
      <Image
        style={{ width: 214 }}
        source={{
          uri: "https://drive.google.com/uc?export=view&id=10ckuZCn5Mt9t8VFRAlrKpT2eDH--GFkP",
        }}
      />
      <MaterialCommunityIcons
        style={{ marginEnd: 30 }}
        name="bell"
        size={28}
        color="#3d3b73"
      />
    </View>
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
          } else if (route.name === "Profile") {
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Like" component={LikeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  const { currentUser } = useAuth();
  return (
    <Stack.Navigator>
      {currentUser ? (
        <>
          <Stack.Group>
            <Stack.Screen
              name="Nav"
              component={BottomNavigator}
              screenOptions={{
                headerShown: true,
              }}
              options={{ headerTitle: (props) => <LogoHeader {...props} /> }}
            />
            <Stack.Screen
              name="Message"
              component={MessageScreen}
              screenOptions={{
                headerShown: false,
              }}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="Match" component={MatchedScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
