import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MessageScreen from "./screens/MessageScreen";
import useAuth from "./hooks/useAuth";
import ModalScreen from "./screens/ModalScreen";
import MatchedScreen from "./screens/MatchedScreen";
import PhoneScreen from "./screens/PhoneScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { currentUser } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {currentUser ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
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
          <Stack.Screen name="Phone" component={PhoneScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
