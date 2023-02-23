import React, { useEffect } from "react";
import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { Alert, LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import messaging from "@react-native-firebase/messaging";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    Nunito: require("./assets/fonts/NunitoSans-Regular.ttf"),
    NunitoBold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    NunitoSemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
    NunitoExtraBold: require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (!loaded) {
      return;
    }
  }, [loaded]);

  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const requestUSerPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status", authStatus);
    }
  };

  useEffect(() => {
    if (requestUSerPermission) {
      console.log("Get Notification Permission Successfully!");
    } else console.log("Failed to get Notification Permission");
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubcribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    return unsubcribe;
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TailwindProvider utilities={utilities}>
        <ActionSheetProvider>
          <NavigationContainer>
            <AuthProvider>
              <StackNavigator />
            </AuthProvider>
          </NavigationContainer>
        </ActionSheetProvider>
      </TailwindProvider>
    </GestureHandlerRootView>
  );
}
