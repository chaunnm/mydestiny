import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
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
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SettingsScreen from "./screens/SettingsScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import SafetyScreen from "./screens/SafetyScreen";
import VibeScreen from "./screens/VibeScreen";
import AddPost from "./screens/AddPost";
import PolicyScreen from "./screens/PolicyScreen";
import firestore from "@react-native-firebase/firestore";
import AllMatchScreen from "./screens/AllMatchScreen";
import NotificationScreen from "./screens/NotificationScreen";
import InviteFriendsScreen from "./screens/InviteFriendsScreen";
import PostScreen from "./screens/PostScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTailwind } from "tailwind-rn";
import StoryList from "./components/StoryList";
import TopPickScreen from "./screens/TopPickScreen";

const HomeTopBar = ({ state, descriptors, navigation, position }) => {
  const tailwind = useTailwind();

  return (
    <View>
      <View style={tailwind("flex-row rounded-full mx-2 overflow-hidden")}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
          });

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[tailwind("p-2"), styles.homeTopBar]}
            >
              <Animated.Text
                style={[
                  tailwind(
                    isFocused
                      ? "text-base bg-white text-center rounded-full p-2"
                      : "text-base font-nunito text-center rounded-full p-2"
                  ),
                  isFocused ? styles.textHome : null,
                ]}
              >
                {label}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>
      {state.index === 1 ? <StoryList /> : null}
    </View>
  );
};

const HomeStackScreen = () => {
  const HomeStack = createMaterialTopTabNavigator();
  const tailwind = useTailwind();
  return (
    <HomeStack.Navigator
      style={tailwind("bg-white")}
      tabBar={(props) => <HomeTopBar {...props} />}
    >
      <HomeStack.Screen name="Search Partners" component={HomeScreen} />
      <HomeStack.Screen name="Make Friends" component={PostScreen} />
    </HomeStack.Navigator>
  );
};

const LikeTopBar = ({ state, descriptors, navigation, position }) => {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        "flex-row overflow-hidden border border-x-0 border-gray-300"
      )}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              tailwind(
                state.index === 0
                  ? "border-r border-gray-300 p-2"
                  : "border-l border-gray-300 p-2"
              ),
              { width: "50%" },
            ]}
          >
            <Animated.Text
              style={[
                tailwind(
                  isFocused
                    ? "text-lg text-others font-semibold bg-white text-center rounded-full p-2"
                    : "text-lg font-nunito text-center rounded-full p-2"
                ),
                styles.textHome,
              ]}
            >
              {label}
            </Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const LikeStackScreen = () => {
  const LikeStack = createMaterialTopTabNavigator();
  const tailwind = useTailwind();
  return (
    <LikeStack.Navigator
      style={tailwind("bg-white")}
      tabBar={(props) => <LikeTopBar {...props} />}
    >
      <LikeStack.Screen name="Likes" component={LikeScreen} />
      <LikeStack.Screen name="Top Picks" component={TopPickScreen} />
    </LikeStack.Navigator>
  );
};

const LogoHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        height: 37,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 4,
      }}
    >
      <TouchableOpacity
        width={Dimensions.get("screen").width}
        style={{ width: 330 }}
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
          style={{ paddingEnd: 30 }}
          name="bell"
          size={28}
          color="#3d3b73"
        />
      </TouchableOpacity>
    </View>
  );
};

const AccountStack = () => {
  const AccountStack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerTitle: (props) => <LogoHeader {...props} />,
        }}
      />
      <AccountStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitleStyle: {
            color: "#3D3B73",
            fontFamily: "NunitoExtraBold",
            fontSize: 24,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerArrowBack}
              onPress={() => navigation.navigate("AccountScreen")}
            >
              <Ionicons name="arrow-back" size={34} color="#FF85A2" />
            </TouchableOpacity>
          ),
        }}
      />
      <AccountStack.Screen
        options={{
          headerShown: false,
        }}
        name="Edit Profile"
        component={ProfileScreen}
      />
      <AccountStack.Screen
        name="Safety"
        component={SafetyScreen}
        options={{
          headerTitleStyle: {
            color: "#3D3B73",
            fontFamily: "NunitoExtraBold",
            fontSize: 24,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerArrowBack}
              onPress={() => navigation.navigate("AccountScreen")}
            >
              <Ionicons name="arrow-back" size={34} color="#FF85A2" />
            </TouchableOpacity>
          ),
        }}
      />
      <AccountStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerTitleStyle: {
            color: "#3D3B73",
            fontFamily: "NunitoExtraBold",
            fontSize: 24,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerArrowBack}
              onPress={() => navigation.navigate("Settings")}
            >
              <Ionicons name="arrow-back" size={34} color="#FF85A2" />
            </TouchableOpacity>
          ),
        }}
      />
      <AccountStack.Screen
        name="Invite Friends"
        component={InviteFriendsScreen}
        options={{
          headerTitleStyle: {
            color: "#3D3B73",
            fontFamily: "NunitoExtraBold",
            fontSize: 24,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerArrowBack}
              onPress={() => navigation.navigate("Settings")}
            >
              <Ionicons name="arrow-back" size={34} color="#FF85A2" />
            </TouchableOpacity>
          ),
        }}
      />
    </AccountStack.Navigator>
  );
};

const ChatStack = () => {
  const ChatStack = createNativeStackNavigator();
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerTitle: (props) => <LogoHeader {...props} />,
        }}
      />
      <ChatStack.Screen name="AllMatch" component={AllMatchScreen} />
    </ChatStack.Navigator>
  );
};

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ headerTitle: (props) => <LogoHeader {...props} /> }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ headerTitle: (props) => <LogoHeader {...props} /> }}
      />
      <Tab.Screen
        name="Like"
        component={LikeStackScreen}
        options={{ headerTitle: (props) => <LogoHeader {...props} /> }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
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
              options={{
                headerShown: false,
              }}
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
          <Stack.Screen
            options={{
              headerTitleStyle: {
                color: "#3D3B73",
                fontFamily: "NunitoExtraBold",
                fontSize: 24,
              },
              headerLeft: () => (
                <TouchableOpacity
                  style={styles.headerArrowBack}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={34} color="#FF85A2" />
                </TouchableOpacity>
              ),
            }}
            name="Email"
            component={EmailScreen}
          />
          <Stack.Screen
            options={{
              headerTitleStyle: {
                color: "#3D3B73",
                fontFamily: "NunitoExtraBold",
                fontSize: 24,
              },
              headerLeft: () => (
                <TouchableOpacity
                  style={styles.headerArrowBack}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={34} color="#FF85A2" />
                </TouchableOpacity>
              ),
            }}
            name="Sign Up"
            component={SignupScreen}
          />
          <Stack.Screen
            options={{
              headerTitleStyle: {
                color: "#3D3B73",
                fontFamily: "NunitoExtraBold",
                fontSize: 24,
              },
              headerLeft: () => (
                <TouchableOpacity
                  style={styles.headerArrowBack}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={34} color="#FF85A2" />
                </TouchableOpacity>
              ),
            }}
            name="Phone"
            component={PhoneScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  homeTopBar: {
    backgroundColor: "#FFD1DC",
    width: "50%",
  },
  textHome: {
    fontFamily: "NunitoBold",
  },
  headerArrowBack: {
    width: 27,
    height: 34,
    alignItems: "center",
    marginRight: 20,
  },
});

export default StackNavigator;
