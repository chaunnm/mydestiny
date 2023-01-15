import React from "react";
import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </TailwindProvider>
    </GestureHandlerRootView>
  );
}
