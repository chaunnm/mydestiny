import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Dimensions,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  DrawerLayoutAndroid,
} from "react-native";
import axios from "axios";
import { List, MD3Colors } from "react-native-paper";
import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import ChatHeader from "../components/ChatHeader";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import { useTailwind } from "tailwind-rn";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { useRoute } from "@react-navigation/native";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import {
  FontAwesome5,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import moment from "moment";
import messaging from "@react-native-firebase/messaging";
import appIcon from "../assets/images/app-icon.png";

const screenHeight = Dimensions.get("screen").height - 600;

const MessageScreen = () => {
  const { currentUser } = useAuth();
  const { params } = useRoute();
  const { matchDetails } = params;
  const tailwind = useTailwind();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState({});
  const [visible, setVisible] = useState(false);
  const [bottom, setBottom] = useState(false);
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [moreClicked, setMoreClicked] = useState(false);
  const [theme, setTheme] = useState([
    {
      id: 1,
      background: "https://wallpaperaccess.com/full/1076238.jpg",
      senderColor: "#FD697F",
      receiverColor: "#E6E8EB",
      selected: true,
    },
    {
      id: 2,
      background:
        "https://i.pinimg.com/736x/70/8f/fd/708ffd5b1ca96aa3ce85e117eb25da97.jpg",
      senderColor: "#1481A4",
      receiverColor: "#B1969B",
      selected: false,
    },
    {
      id: 3,
      background:
        "https://i.pinimg.com/564x/92/23/45/92234524c7378afb7c064e0d5e46624f.jpg",
      senderColor: "#FFFFFF",
      receiverColor: "#DEBD76",
      selected: false,
    },
    {
      id: 4,
      background:
        "https://i.pinimg.com/564x/c5/4e/b4/c54eb441cd8a741a8879ea800bcd58ed.jpg",
      senderColor: "#CE7261",
      receiverColor: "#F5F5F5",
      selected: false,
    },
    {
      id: 5,
      background:
        "https://i.pinimg.com/564x/a9/06/30/a906307de9bd292a289efc01459becf1.jpg",
      senderColor: "#6B6B6B",
      receiverColor: "#F5F5F5",
      selected: false,
    },
    {
      id: 6,
      background:
        "https://i.pinimg.com/564x/83/23/0c/83230c8def73293e7640a6ece24ac639.jpg",
      senderColor: "#A19E99",
      receiverColor: "#894A49",
      selected: false,
    },
    {
      id: 7,
      background:
        "https://i.pinimg.com/564x/29/0a/d4/290ad410f9c6a1cfe34a29025ac426d3.jpg",
      senderColor: "#2D9CCF",
      receiverColor: "#E7CE8D",
      selected: false,
    },
    {
      id: 8,
      background:
        "https://i.pinimg.com/736x/3d/0d/c5/3d0dc5b0b7eef23686d0178650eb19d3.jpg",
      senderColor: "#1481A4",
      receiverColor: "#B1969B",
      selected: false,
    },
    {
      id: 9,
      background: "https://i.imgur.com/2QhOvfd.jpg",
      senderColor: "#D4B44F",
      receiverColor: "#EFD6C9",
      selected: false,
    },
    {
      id: 10,
      background:
        "https://i.pinimg.com/564x/5e/1c/4f/5e1c4fb7169f0f49c0b5d00cddfd895a.jpg",
      senderColor: "#8E1069",
      receiverColor: "#5BA1B0",
      selected: false,
    },
    {
      id: 11,
      background:
        "https://i.pinimg.com/564x/2c/46/39/2c4639002f409452699941926c8e9ef8.jpg",
      senderColor: "#C15C5C",
      receiverColor: "#FFFFFF",
      selected: false,
    },
    {
      id: 12,
      background:
        "https://i.pinimg.com/564x/81/d4/4a/81d44ad9e6e84b6d17fb44b45e6a0d9d.jpg",
      senderColor: "",
      receiverColor: "",
      selected: false,
    },
    {
      id: 13,
      background:
        "https://i.pinimg.com/564x/a0/62/f9/a062f9d83ef44c07a3b37025cfb79a82.jpg",
      senderColor: "#045364",
      receiverColor: "#F3F3F3",
      selected: false,
    },
    {
      id: 14,
      background:
        "https://i.pinimg.com/564x/fb/73/b7/fb73b7cddbc16ea06aa08f39516ea14a.jpg",
      senderColor: "#282828",
      receiverColor: "#FFFFFF",
      selected: false,
    },
    {
      id: 15,
      background:
        "https://i.pinimg.com/564x/76/bd/f8/76bdf8af485fc2b1122b3a6712fc041c.jpg",
      senderColor: "#79919E",
      receiverColor: "#CBD0B5",
      selected: false,
    },
    {
      id: 16,
      background:
        "https://i.pinimg.com/564x/25/aa/f5/25aaf58f57a8173215fede4fdb980bdf.jpg",
      senderColor: "#BD8C5F",
      receiverColor: "#7AD68D",
      selected: false,
    },
    {
      id: 17,
      background:
        "https://i.pinimg.com/564x/5b/dd/4d/5bdd4d67dd3a12104b06ac2a06eb6115.jpg",
      senderColor: "#0C0C02",
      receiverColor: "#FFE7A8",
      selected: false,
    },
    {
      id: 18,
      background:
        "https://i.pinimg.com/564x/7d/37/a0/7d37a02beaaf1a3af7624e9e8cf3f5f5.jpg",
      senderColor: "#232323",
      receiverColor: "#D96351",
      selected: false,
    },
  ]);

  const flatlistRef = useRef();
  const drawer = useRef(null);
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["75%", "100%"], []);

  const handlePresentModalPress = useCallback(() => {
    drawer.current.closeDrawer();
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const navigationView = () => (
    <ScrollView style={tailwind("flex-1")}>
      <Image
        style={tailwind(
          "w-24 h-24 rounded-full self-center mt-3 mb-4 border-2 border-red-600"
        )}
        source={{
          uri: getMatchedUserInfo(matchDetails.users, currentUser.uid).photoURL,
        }}
      />
      <Text style={tailwind("text-xl text-center font-semibold ")}>
        {getMatchedUserInfo(matchDetails.users, currentUser.uid).displayName}
      </Text>
      <Text style={tailwind("text-center")}>Last online</Text>
      <View style={tailwind("flex-row justify-center items-center my-1.5")}>
        <TouchableOpacity>
          {getMatchedUserInfo(matchDetails.users, currentUser.uid).gender ===
          "male" ? (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={27}
              color="black"
              style={tailwind(
                "w-10 h-10 text-center pt-1 rounded-2xl border bg-blue-100 mr-1"
              )}
            />
          ) : (
            <MaterialCommunityIcons
              name="face-woman-profile"
              size={27}
              color="black"
              style={tailwind(
                "w-10 h-10 text-center text-gray-800 pt-1 rounded-2xl border bg-red-100 mr-1"
              )}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            name="bell"
            size={27}
            color="black"
            style={tailwind(
              "w-10 h-10 text-center text-gray-800 pt-1.5 rounded-2xl border ml-1"
            )}
          />
          {/* <Feather
            name="bell-off"
            size={27}
            color="black"
            style={tailwind(
              "w-10 h-10 text-center text-gray-800 pt-1.5 rounded-2xl border ml-1 bg-gray-400"
            )}
          /> */}
        </TouchableOpacity>
      </View>

      <List.Section>
        <List.Subheader style={tailwind("font-semibold py-0")}>
          Customization
        </List.Subheader>
        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 mt-1.5 p-1 px-2 py-1 rounded-t-lg"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Background & Theme"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="palette" />}
            onPress={handlePresentModalPress}
          />
          <View
            style={tailwind(
              "w-78/100 h-px bg-gray-300 mr-2.5 absolute right-0 bottom-0"
            )}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 p-1 px-2 py-1"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Emoji"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="emoticon-excited" />}
          />
          <View
            style={tailwind(
              "w-78/100 h-px bg-gray-300 mr-2.5 absolute right-0 bottom-0"
            )}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 p-1 px-2 py-1"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Nicknames"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="format-font" />}
          />
          <View
            style={tailwind(
              "w-78/100 h-px bg-gray-300 mr-2.5 absolute right-0 bottom-0"
            )}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 p-1 px-2 py-1 rounded-b-lg"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Word effects"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="auto-fix" />}
          />
        </TouchableOpacity>
      </List.Section>

      <List.Section>
        <List.Subheader style={tailwind("font-semibold py-0")}>
          More actions
        </List.Subheader>
        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 mt-1.5 p-1 px-2 py-1 rounded-t-lg"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Create group chat"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="account-group" />}
          />
          <View
            style={tailwind(
              "w-78/100 h-px bg-gray-300 mr-2.5 absolute right-0 bottom-0"
            )}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 p-1 px-2 py-1"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="View media, files, links"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="folder-multiple-image" />}
          />
          <View
            style={tailwind(
              "w-78/100 h-px bg-gray-300 mr-2.5 absolute right-0 bottom-0"
            )}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 p-1 px-2 py-1"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Pinned messages"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="pin" />}
          />
          <View
            style={tailwind(
              "w-78/100 h-px bg-gray-300 mr-2.5 absolute right-0 bottom-0"
            )}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 p-1 px-2 py-1 rounded-b-lg"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Open incognition chat"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="incognito-circle" />}
          />
          <View
            style={tailwind(
              "w-78/100 h-px bg-gray-300 mr-2.5 absolute right-0 bottom-0"
            )}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 p-1 px-2 py-1 rounded-b-lg"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Search in conversation"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="magnify" />}
          />
          <View
            style={tailwind(
              "w-78/100 h-px bg-gray-300 mr-2.5 absolute right-0 bottom-0"
            )}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 p-1 px-2 py-1 rounded-b-lg"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Notifications & sounds"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="bell-ring" />}
          />
          <View
            style={tailwind(
              "w-78/100 h-px bg-gray-300 mr-2.5 absolute right-0 bottom-0"
            )}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 p-1 px-2 py-1 rounded-b-lg"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Share contact"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="export-variant" />}
          />
        </TouchableOpacity>
      </List.Section>

      <List.Section>
        <List.Subheader style={tailwind("font-semibold py-0")}>
          Privacy & Support
        </List.Subheader>
        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 mt-1.5 p-1 px-2 py-1 rounded-t-lg"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Restrict"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="chat-alert" />}
          />
          <View
            style={tailwind(
              "w-78/100 h-px bg-gray-300 mr-2.5 absolute right-0 bottom-0"
            )}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 p-1 px-2 py-1"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Block"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="block-helper" />}
          />
          <View
            style={tailwind(
              "w-78/100 h-px bg-gray-300 mr-2.5 absolute right-0 bottom-0"
            )}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={tailwind("relative")}>
          <List.Item
            style={[
              tailwind("mx-2 p-1 px-2 py-1 rounded-b-lg"),
              { backgroundColor: "rgba(240,240,240,1)" },
            ]}
            title="Report"
            titleStyle={tailwind("text-base")}
            left={() => <List.Icon icon="alert" />}
          />
        </TouchableOpacity>
      </List.Section>

      {/* <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      /> */}
    </ScrollView>
  );

  const groupMessageByTime = (messages) => {
    return messages.reduce((acc, message) => {
      const timestamp = moment(message.timestamp?.toDate()).format(
        "DD/MM/YYYY"
      );
      if (!acc[timestamp]) {
        acc[timestamp] = [];
      }
      acc[timestamp].push(message);
      return acc;
    }, {});
  };

  useEffect(() => {
    firestore()
      .collection("matches")
      .doc(matchDetails.id)
      .onSnapshot((snapshot) => {
        let index = theme.findIndex(
          (item) => item.id === snapshot.data().theme?.id
        );
        if (index !== -1) {
          let temporaryarray = theme.slice();
          const temp = temporaryarray.map((item) => ({
            ...item,
            selected: false,
          }));
          temp[index].selected = true;
          setTheme(temp);
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("matches")
      .doc(matchDetails.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // next: (snapshot) => {
        //   let temp = snapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     ...doc.data(),
        //   }));

        //   setGrouped(
        //     snapshot.docs.map((doc) => ({
        //       id: doc.id,
        //       ...doc.data(),
        //     }))
        //   );

        //   setMessages(
        //     snapshot.docs.map((doc) => ({
        //       id: doc.id,
        //       ...doc.data(),
        //     }))
        //   );
        // },
        const newGroupedMessages = {};
        snapshot.docs.forEach((doc) => {
          const message = doc.data();
          const timestamp = moment(message.timestamp?.toDate()).format(
            "DD/MM/YYYY"
          );
          if (!newGroupedMessages[timestamp]) {
            newGroupedMessages[timestamp] = [message];
          } else {
            newGroupedMessages[timestamp].push(message);
          }
        });
        setGroupedMessages(newGroupedMessages);
      });
    return () => unsubscribe();
  }, []);

  const handleUploadMedia = async (img) => {
    const cloudName = "dtu8kyhxq";
    const cloudURL = "https://api.cloudinary.com/v1_1/dtu8kyhxq/auto/upload";
    const uploadPreset = "uw_test";

    let media = {
      uri: img,
      type: `test/${img.split(".")[1]}`,
      name: `test.${img.split(".")[1]}`,
    };
    const formData = new FormData();
    if (media != undefined) {
      formData.append("file", media);
      formData.append("cloud_name", cloudName);
      formData.append("upload_preset", uploadPreset);

      // const config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   onUploadProgress: (e) => {
      //     const { loaded, total } = e;
      //     let percent = Math.floor((loaded * 100) / total);
      //     setProgress((loaded / total) * 100);
      //     console.log(`${loaded}kb of ${total}kb | ${percent}%`);
      //   },
      // };

      // await axios.post(cloudURL, formData, config).then((res) => {
      //   firestore()
      //     .collection("matches")
      //     .doc(matchDetails.id)
      //     .collection("messages")
      //     .add({
      //       timestamp: firestore.FieldValue.serverTimestamp(),
      //       userId: currentUser.uid,
      //       displayName: currentUser.displayName,
      //       photoURL: matchDetails.users[currentUser.uid].photoURL,
      //       message: "",
      //       media: res.data.url,
      //       removedAt: "",
      //     });
      // });
      // setProgress(0);

      await fetch(
        cloudURL,
        {
          method: "POST",
          body: formData,
        }
        // config
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          firestore()
            .collection("matches")
            .doc(matchDetails.id)
            .collection("messages")
            .add({
              timestamp: firestore.FieldValue.serverTimestamp(),
              userId: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: matchDetails.users[currentUser.uid].photoURL,
              message: "",
              media: data.url,
              removedAt: "",
            });
          setVisible(false);
        });
    }
  };

  const uploadMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setVisible(true);
      handleUploadMedia(result.assets[0].uri);
    }
  };

  const sendPushNotification = async (deviceToken, title, body) => {
    // Create the notification payload
    const notification = {
      to: deviceToken,
      notification: {
        title: title,
        body: body,
        // icon: appIcon,
        priority: "high",
        displayType: "inAppAlert",
      },
    };

    // Send the notification using FCM
    const response = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      notification,
      {
        headers: {
          Authorization: `key=AAAA7oLlb34:APA91bFTLJ3d578AWpdxzQtoDXfTmU5-eHF8qMrrzL80nDk4Y_FqC-JkZ6qDk4yQfD9eUW-zfSdpMFCwLZmGgg41NRtqCqUJd8RBLYOfAOq4hAmAwtpGt_BDslv8Il82Ra7MMkdPi-23`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
  };

  const sendMessage = () => {
    firestore()
      .collection("matches")
      .doc(matchDetails.id)
      .collection("messages")
      .add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        removedAt: "",
        userId: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: matchDetails.users[currentUser.uid].photoURL,
        message: input,
        media: "",
      })
      .then(() => {
        console.log(
          getMatchedUserInfo(matchDetails.users, currentUser.uid).deviceToken
        );
        sendPushNotification(
          getMatchedUserInfo(matchDetails.users, currentUser.uid).deviceToken,
          currentUser.displayName,
          input
        );
        console.log("Sent notification!");
      });
    setInput("");
  };

  const handleScroll = (event) => {
    let yOffset = event.nativeEvent.contentOffset.y / 1;
    // setScrollPosition(yOffset);
    if (yOffset >= screenHeight) setBottom(true);
    else setBottom(false);
  };

  const onPressFunction = () => {
    flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const handleMoreClicked = (value) => {
    setMoreClicked(value);
    if (value) drawer.current.openDrawer();
    else drawer.current.closeDrawer();
  };

  const handleChangeBg = (theme) => {
    firestore().collection("matches").doc(matchDetails.id).update({
      theme: theme,
    });
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={tailwind("flex-1")}>
        <DrawerLayoutAndroid
          style={tailwind("flex-1")}
          ref={drawer}
          drawerWidth={300}
          drawerPosition="right"
          onDrawerClose={() => {
            setMoreClicked(false);
          }}
          keyboardDismissMode="on-drag"
          renderNavigationView={navigationView}
        >
          <StatusBar />
          <ChatHeader
            title={
              getMatchedUserInfo(matchDetails.users, currentUser.uid)
                .displayName
            }
            callEnabled
            videoEnabled
            moreEnabled
            moreClicked={handleMoreClicked}
            opened={moreClicked}
            background={theme.find((item) => item.selected === true).background}
          />

          <ImageBackground
            source={{
              uri: theme.find((item) => item.selected === true).background,
            }}
            style={tailwind("flex-1")}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={tailwind("flex-1")}
              keyboardVerticalOffset={10}
            >
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                style={tailwind("relative")}
              >
                <FlatList
                  ref={flatlistRef}
                  inverted={-1}
                  data={Object.entries(groupedMessages)}
                  keyExtractor={(item, index) => index.toString()}
                  onScroll={(event) => handleScroll(event)}
                  renderItem={({ item: [timestamp, messages] }) => (
                    <>
                      <FlatList
                        inverted={-1}
                        data={messages}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item: message }) =>
                          message.userId === currentUser.uid ? (
                            <SenderMessage
                              key={message.id}
                              message={message}
                              matchId={matchDetails.id}
                            />
                          ) : (
                            <ReceiverMessage
                              key={message.id}
                              message={message}
                              matchId={matchDetails.id}
                            />
                          )
                        }
                      />
                      <Text
                        style={[
                          tailwind(
                            "text-center my-2 mx-auto py-1 px-2 w-28 rounded-xl"
                          ),
                          {
                            backgroundColor: "rgba(0,0,0,0.1)",
                            color: "#282828",
                          },
                        ]}
                      >
                        {timestamp}
                      </Text>
                    </>
                  )}
                />
                {/* <FlatList
                  ref={flatlistRef}
                  data={messages}
                  inverted={-1}
                  style={tailwind("pl-4")}
                  onScroll={(event) => handleScroll(event)}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item: message }) =>
                    message.userId === currentUser.uid ? (
                      <SenderMessage
                        key={message.id}
                        message={message}
                        matchId={matchDetails.id}
                      />
                    ) : (
                      <ReceiverMessage
                        key={message.id}
                        message={message}
                        matchId={matchDetails.id}
                      />
                    )
                  }
                /> */}
              </TouchableWithoutFeedback>

              {bottom && (
                <TouchableOpacity
                  onPress={onPressFunction}
                  style={tailwind(
                    "absolute bottom-16 left-44 bg-black w-8 h-8 rounded-full justify-center"
                  )}
                >
                  <AntDesign
                    name="arrowdown"
                    size={16}
                    color="white"
                    style={tailwind("text-center")}
                  />
                </TouchableOpacity>
              )}

              {visible && (
                <TouchableOpacity
                  onPress={onPressFunction}
                  style={tailwind(
                    "absolute top-2 left-44 bg-white w-8 h-8 rounded-full justify-center"
                  )}
                >
                  <ActivityIndicator />
                </TouchableOpacity>
              )}

              <View
                style={[
                  tailwind(
                    "relative flex-row items-center px-5 px-2 pb-3 pt-2"
                  ),
                  { backgroundColor: "rgba(255,255,255,0.1)" },
                ]}
              >
                {/* <ImageBackground
              source={{
                uri: "https://i.pinimg.com/564x/3d/8c/2f/3d8c2f2c82c1c9ef1e27be645cd1aa17.jpg",
              }}
              style={tailwind(
                "relative flex-row items-center px-5 px-2 pb-3 pt-2"
              )}
              blurRadius={20}
            > */}
                <TextInput
                  style={[
                    tailwind(
                      "h-10 text-lg rounded-md border border-gray-400 px-2 pr-14"
                    ),
                    { flex: 1, backgroundColor: "rgba(255,255,255,0.85)" },
                  ]}
                  multiline
                  rows={4}
                  placeholder="Type your message"
                  placeholderTextColor="#999"
                  onChangeText={setInput}
                  onSubmitEditing={sendMessage}
                  value={input}
                />
                <TouchableOpacity
                  style={[tailwind("absolute right-11 bottom-4")]}
                  onPress={sendMessage}
                >
                  <Image
                    style={[tailwind("w-10 h-8")]}
                    source={{ uri: "https://i.imgur.com/I7YNY31.png" }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind("ml-2 mr-0.5")}
                  onPress={uploadMedia}
                >
                  <MaterialIcons
                    name="perm-media"
                    size={24}
                    color={"#3D3B73"}
                  />
                </TouchableOpacity>
                {/* </ImageBackground> */}
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </DrawerLayoutAndroid>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <Text style={tailwind("text-center text-lg font-bold")}>
            Change background and theme chat 🎨
          </Text>
          <BottomSheetScrollView style={tailwind("px-3 flex-1")}>
            <View style={tailwind("flex-row justify-between mt-4")}>
              <TouchableOpacity onPress={() => handleChangeBg(theme[0])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  // source={{
                  //   uri: "https://i.pinimg.com/564x/c5/4e/b4/c54eb441cd8a741a8879ea800bcd58ed.jpg",
                  // }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[1])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[1].background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[2])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[2].background,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={tailwind("flex-row justify-between mt-4")}>
              <TouchableOpacity onPress={() => handleChangeBg(theme[3])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[3].background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[4])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[4].background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[5])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[5].background,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={tailwind("flex-row justify-between mt-4")}>
              <TouchableOpacity onPress={() => handleChangeBg(theme[6])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[6].background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[7])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[7].background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[8])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[8].background,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={tailwind("flex-row justify-between mt-4")}>
              <TouchableOpacity onPress={() => handleChangeBg(theme[9])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[9].background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[10])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[10].background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[11])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[11].background,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={tailwind("flex-row justify-between mt-4")}>
              <TouchableOpacity onPress={() => handleChangeBg(theme[12])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[12].background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[13])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[13].background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[14])}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[14].background,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={tailwind("flex-row justify-between my-4")}>
              <TouchableOpacity onPress={() => handleChangeBg(theme[15].id)}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[15].background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[16].id)}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[16].background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeBg(theme[17].id)}>
                <Image
                  style={tailwind("w-28 h-44 rounded-lg")}
                  source={{
                    uri: theme[17].background,
                  }}
                />
              </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default MessageScreen;
