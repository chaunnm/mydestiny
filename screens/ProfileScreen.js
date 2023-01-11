import {
  View,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const tailwind = useTailwind();

  const [profile, setProfile] = useState();

  useEffect(() => {
    let unsubcribe = firestore()
      .collection("users")
      .doc(currentUser.uid)
      .onSnapshot((snapshot) => {
        const temp = snapshot.data();
        setDisplayname(temp.displayName);
        setEmail(temp.email);
        setPhone(temp.phone);
        setGender(temp.gender);
        setJob(temp.job);
        setDate(temp.dayOfBirth.toDate("dd/MM/yyyy"));
        setLocation(temp.location);
        setImage1(temp.photos[0].photoURL);
        setImage2(temp.photos[1].photoURL);
        setImage3(temp.photos[2].photoURL);
        setImage4(temp.photos[3].photoURL);
        setInterests(
          interests.map((interest) =>
            temp.interests.includes(interest.name)
              ? { ...interest, selected: true }
              : interest
          )
        );
        setIdeals(
          ideals.map((ideal) =>
            temp.ideals.includes(ideal.name)
              ? { ...ideal, selected: true }
              : ideal
          )
        );
      });
    return () => unsubcribe();
  }, []);

  const [loader, setLoader] = useState(false);

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);

  const [displayName, setDisplayname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [date, setDate] = useState();
  const [job, setJob] = useState(currentUser.jobo);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState();

  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [images, setImages] = useState([
    {
      id: 1,
      empty: true,
      photoURL: "",
    },
    {
      id: 2,
      empty: true,
      photoURL: "",
    },
    {
      id: 3,
      empty: true,
      photoURL: "",
    },
    {
      id: 4,
      empty: true,
      photoURL: "",
    },
  ]);

  const [interests, setInterests] = useState([
    {
      id: 1,
      selected: true,
      icon: "🎮",
      name: "Gaming",
    },
    {
      id: 2,
      selected: false,
      icon: "💃",
      name: "Dancing",
    },
    {
      id: 3,
      selected: false,
      icon: "🗣️",
      name: "Language",
    },
    {
      id: 4,
      selected: false,
      icon: "🎵",
      name: "Language",
    },
    {
      id: 5,
      selected: false,
      icon: "🎬",
      name: "Movie",
    },
    {
      id: 6,
      selected: false,
      icon: "📷",
      name: "Photography",
    },
    {
      id: 7,
      selected: false,
      icon: "🏛️",
      name: "Architecture",
    },
    {
      id: 8,
      selected: false,
      icon: "🧑‍💻",
      name: "IT",
    },
    {
      id: 9,
      selected: false,
      icon: "👔",
      name: "Fashion",
    },
    {
      id: 10,
      selected: false,
      icon: "📚",
      name: "Book",
    },
    {
      id: 11,
      selected: false,
      icon: "✍️",
      name: "Writing",
    },
    {
      id: 12,
      selected: false,
      icon: "🏞️",
      name: "Nature",
    },
    {
      id: 13,
      selected: false,
      icon: "🎨",
      name: "Painting",
    },
    {
      id: 14,
      selected: false,
      icon: "😎",
      name: "People",
    },
    {
      id: 15,
      selected: false,
      icon: "🐼",
      name: "Animals",
    },
    {
      id: 16,
      selected: false,
      icon: "💪",
      name: "Gym & Fitness",
    },
    {
      id: 17,
      selected: false,
      icon: "🍔",
      name: "Food & Drink",
    },
    {
      id: 18,
      selected: false,
      icon: "💼",
      name: "Travel & Places",
    },
    {
      id: 19,
      selected: false,
      icon: "🏐",
      name: "Sports",
    },
  ]);

  const [ideals, setIdeals] = useState([
    {
      id: 1,
      selected: false,
      name: "Love",
      icon: "https://i.imgur.com/13Sk3Jk.png",
    },
    {
      id: 2,
      selected: false,
      name: "Friends",
      icon: "https://i.imgur.com/XpKJJyl.png",
    },
    {
      id: 3,
      selected: false,
      name: "Fling",
      icon: "https://i.imgur.com/vD8hpzl.png",
    },
    {
      id: 4,
      selected: false,
      name: "Business",
      icon: "https://i.imgur.com/iQV8u05.png",
    },
  ]);

  // Functions are here

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const updateImages = (id, newValue) => {
    let index = images.findIndex((item) => item.id === id);
    if (index !== -1) {
      let temp = images.slice();
      temp[index]["photoURL"] = newValue;
      temp[index]["empty"] = false;
      setImages(temp);
    } else {
      console.log("There is an error with choosing photos");
    }
  };

  const updateInterest = (id, newValue) => {
    let index = interests.findIndex((item) => item.id === id);
    if (index !== -1) {
      let temp = interests.slice();
      temp[index]["selected"] = newValue;
      setInterests(temp);
    } else {
      console.log("There is an error with choosing interests");
    }
  };

  const updateIdeals = (id, newValue) => {
    let index = ideals.findIndex((item) => item.id === id);
    if (index !== -1) {
      let temp = ideals.slice();
      temp[index]["selected"] = newValue;
      setIdeals(temp);
    } else {
      console.log("There is an error with choosing ideals");
    }
  };

  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage1(result.assets[0].uri);
    }
  };

  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage2(result.assets[0].uri);
    }
  };

  const pickImage3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage3(result.assets[0].uri);
    }
  };

  const pickImage4 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage4(result.assets[0].uri);
    }
  };

  const handleUploadImage = async (img, id) => {
    const cloudName = "dtu8kyhxq";
    const cloudURL = "https://api.cloudinary.com/v1_1/dtu8kyhxq/auto/upload";
    const uploadPreset = "uw_test";

    let image = {
      uri: img,
      type: `test/${img.split(".")[1]}`,
      name: `test.${img.split(".")[1]}`,
    };
    const formData = new FormData();
    if (image != undefined) {
      formData.append("file", image);
      formData.append("cloud_name", cloudName);
      formData.append("upload_preset", uploadPreset);

      await fetch(cloudURL, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          updateImages(id, data.url);
        });
    }
  };

  const updateProfile = () => {
    firestore()
      .collection("users")
      .doc(currentUser.uid)
      .set({
        id: currentUser.uid,
        displayName: displayName,
        email: email,
        phone: phone,
        gender: gender,
        job: job,
        location: location,
        photos: images,
        dayOfBirth: date,
        interests: interests
          .filter((interest) => interest.selected === true)
          .map((interest) => interest.name),
        ideals: ideals
          .filter((ideal) => ideal.selected === true)
          .map((ideal) => ideal.name),
      })
      .then(() => {
        ToastAndroid.showWithGravity(
          "Update Profile successfully! 🎉",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setLoader(false);
        navigation.navigate("Success");
      })
      .catch((error) => {
        setLoader(false);
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
  };

  if (step1) {
    return (
      <SafeAreaView style={tailwind("flex-1")}>
        <Header title="Step 1" />
        <ScrollView style={tailwind("px-5")}>
          <Text
            style={tailwind(
              "font-bold mb-1 text-2xl text-center text-purple-700"
            )}
          >
            Let's fill your profile!
          </Text>
          <Text
            style={tailwind(
              "font-bold mb-5 text-3xl text-center text-purple-700"
            )}
          >
            😜
          </Text>
          <Text style={tailwind("font-semibold px-4 text-lg ")}>
            Display Name{" "}
            <Text style={tailwind("font-semibold text-lg text-red-600")}>
              *
            </Text>
          </Text>
          <TextInput
            style={tailwind(
              "w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg"
            )}
            autoCapitalize="none"
            autoFocus={true}
            value={displayName}
            onChangeText={setDisplayname}
          />
          <Text style={tailwind("font-semibold px-4 text-lg ")}>
            Email{" "}
            <Text style={tailwind("font-semibold text-lg text-red-600")}>
              *
            </Text>
          </Text>
          <TextInput
            style={tailwind(
              "w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg"
            )}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={tailwind("font-semibold px-4 text-lg ")}>
            Phone Number{" "}
          </Text>
          <TextInput
            style={tailwind(
              "w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg"
            )}
            autoCapitalize="none"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
          <Text style={tailwind("font-semibold px-4 text-lg ")}>
            Gender{" "}
            <Text style={tailwind("font-semibold text-lg text-red-600")}>
              *
            </Text>
          </Text>
          <RadioButton.Group value={gender} onValueChange={setGender}>
            <RadioButton.Item label="Male" value="male" />
            <RadioButton.Item label="Female" value="female" />
          </RadioButton.Group>

          <TouchableOpacity onPress={showDatePicker}>
            <Text style={tailwind("font-semibold px-4 text-lg ")}>
              Date Of Birth{" "}
              <Text style={tailwind("font-semibold text-lg text-red-600")}>
                *
              </Text>
            </Text>
            <Text
              style={tailwind(
                "w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg pt-2"
              )}
            >
              {date?.toJSON().slice(0, 10).split("-").reverse().join("/")}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text style={tailwind("font-semibold px-4 text-lg ")}>
            Job{" "}
            <Text style={tailwind("font-semibold text-lg text-red-600")}>
              *
            </Text>
          </Text>
          <TextInput
            style={tailwind(
              "w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg"
            )}
            autoCapitalize="none"
            value={job}
            onChangeText={setJob}
          />
        </ScrollView>

        <TouchableOpacity
          style={[tailwind("w-11/12 p-3 mx-auto rounded-xl bg-red-400 my-5")]}
          onPress={() => {
            setStep1(false);
            setStep2(true);
          }}
        >
          <Text style={tailwind("text-center font-bold text-white text-xl")}>
            Continue
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else if (step2) {
    return (
      <SafeAreaView style={tailwind("flex-1")}>
        <Header title="Step 2" />
        <ScrollView
          automaticallyAdjustContentInsets={true}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{ flexGrow: 1 }}
          style={tailwind("flex-1 px-5 h-full")}
        >
          <Image
            style={tailwind("w-full h-32")}
            resizeMode="contain"
            source={{ uri: "https://i.imgur.com/z2hrGPr.png" }}
          />
          <Text
            style={tailwind(
              "font-bold mb-1 text-2xl text-center text-purple-700"
            )}
          >
            Nice to meet you, Adam Smith. Meet people nearly
          </Text>
          <Text
            style={tailwind(
              "font-bold mb-3 text-3xl text-center text-purple-700"
            )}
          >
            👋
          </Text>

          <Text style={tailwind("leading-5")}>
            You'll need to enable your location in order to use{" "}
            <Text style={tailwind("font-bold")}>MyDestiny</Text> . Your location
            will be used to show potential matches near you.
          </Text>
          <TouchableOpacity
            style={[tailwind("w-full p-3 mx-auto rounded-xl bg-red-400 my-5")]}
          >
            <Text style={tailwind("text-center font-bold text-white text-xl")}>
              Allow Location
            </Text>
          </TouchableOpacity>

          <Text style={tailwind("font-semibold text-center text-lg")}>Or</Text>

          <Text style={tailwind("font-semibold px-4 text-lg ")}>Living In</Text>
          <TextInput
            style={tailwind(
              "w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg"
            )}
            autoCapitalize="none"
            value={location}
            onChangeText={setLocation}
          />
          <Text style={tailwind("leading-5")}>
            If you don’t allow us to enable your location, make sure that your
            filled location is true. MyDestiny will help you make new
            relationship nearby.
          </Text>
        </ScrollView>

        <TouchableOpacity
          style={[tailwind("w-11/12 p-3 mx-auto rounded-xl bg-red-400 my-5")]}
          onPress={() => {
            setStep2(false);
            setStep3(true);
          }}
        >
          <Text style={tailwind("text-center font-bold text-white text-xl")}>
            Continue
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else if (step3) {
    return (
      <SafeAreaView style={tailwind("flex-1")}>
        <Header title="Step 3" />
        <ScrollView style={tailwind("px-5")}>
          <Text
            style={tailwind(
              "font-bold mb-1 text-2xl text-center text-purple-700"
            )}
          >
            Add your best photos
          </Text>
          <Text
            style={tailwind(
              "font-bold mb-5 text-3xl text-center text-purple-700"
            )}
          >
            😎
          </Text>

          <Text style={tailwind("leading-5")}>
            Add your best photos to get a higher amount of daily matches. Upload
            at least 1 photos to get started.
          </Text>

          <View style={tailwind("flex-row w-full justify-between h-64 mt-5")}>
            <TouchableOpacity
              style={tailwind(
                "bg-red-100 border-2 border-red-400 rounded-2xl h-62 w-42"
              )}
              onPress={pickImage1}
            >
              <ImageBackground
                resizeMode="contain"
                style={tailwind("flex-1 w-12 mx-auto")}
                source={{ uri: "https://i.imgur.com/Ht1QbaR.png" }}
              />
              {image1 && (
                <Image
                  style={tailwind("h-60 w-40 rounded-2xl")}
                  resizeMode="cover"
                  source={{
                    uri: image1,
                  }}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={tailwind(
                "bg-red-100 border-2 border-red-400 rounded-2xl h-62 w-42"
              )}
              onPress={pickImage2}
            >
              <ImageBackground
                resizeMode="contain"
                style={tailwind("flex-1 w-12 mx-auto")}
                source={{ uri: "https://i.imgur.com/Ht1QbaR.png" }}
              />
              {image2 && (
                <Image
                  style={tailwind("h-60 w-40 rounded-2xl")}
                  resizeMode="cover"
                  source={{
                    uri: image2,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={tailwind("flex-row w-full justify-between h-64 mt-5")}>
            <TouchableOpacity
              style={tailwind(
                "bg-red-100 border-2 border-red-400 rounded-2xl h-62 w-42"
              )}
              onPress={pickImage3}
            >
              <ImageBackground
                resizeMode="contain"
                style={tailwind("flex-1 w-12 mx-auto")}
                source={{ uri: "https://i.imgur.com/Ht1QbaR.png" }}
              />
              {image3 && (
                <Image
                  style={tailwind("h-60 w-40 rounded-2xl")}
                  resizeMode="cover"
                  source={{
                    uri: image3,
                  }}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={tailwind(
                "bg-red-100 border-2 border-red-400 rounded-2xl h-62 w-42"
              )}
              onPress={pickImage4}
            >
              <ImageBackground
                resizeMode="contain"
                style={tailwind("flex-1 w-12 mx-auto")}
                source={{ uri: "https://i.imgur.com/Ht1QbaR.png" }}
              />
              {image4 && (
                <Image
                  style={tailwind("h-60 w-40 rounded-2xl")}
                  resizeMode="cover"
                  source={{
                    uri: image4,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[tailwind("w-11/12 p-3 mx-auto rounded-xl bg-red-400 my-5")]}
          onPress={() => {
            if (image1 !== null) {
              if (!image1.includes("http")) handleUploadImage(image1, 1);
            }
            if (image2 !== null) {
              if (!image2.includes("http")) handleUploadImage(image2, 2);
            }
            if (image3 !== null) {
              if (!image3.includes("http")) handleUploadImage(image3, 3);
            }
            if (image4 !== null) {
              if (!image4.includes("http")) handleUploadImage(image4, 4);
            }
            setStep3(false);
            setStep4(true);
          }}
        >
          <Text style={tailwind("text-center font-bold text-white text-xl")}>
            Continue
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else if (step4) {
    return (
      <SafeAreaView style={tailwind("flex-1")}>
        <Header title="Step 4" />
        <Text
          style={tailwind(
            "font-bold mb-1 text-2xl text-center text-purple-700"
          )}
        >
          Select your interests
        </Text>
        <Text
          style={tailwind(
            "font-bold mb-5 text-3xl text-center text-purple-700 px-5"
          )}
        >
          👍
        </Text>

        <Text style={tailwind("leading-5 pb-3 px-5")}>
          Select your interests to match with users who have similar things in
          common.
        </Text>

        <ScrollView style={tailwind("px-5")}>
          <View style={tailwind("pb-80")}>
            <View style={tailwind("flex-row flex-wrap h-64")}>
              {interests.map((interest, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      tailwind(
                        "border-2 border-red-400 rounded-full h-11 flex-row px-3 text-center items-center pt-0 mr-2 mb-3"
                      ),
                      interest.selected
                        ? tailwind("bg-red-400")
                        : tailwind("bg-transparent"),
                    ]}
                    onPress={() =>
                      updateInterest(interest.id, !interest.selected)
                    }
                  >
                    <Text style={tailwind("text-xl font-bold")}>
                      {interest.icon}
                    </Text>
                    <Text
                      style={[
                        tailwind("text-lg font-bold pl-1"),
                        interest.selected
                          ? tailwind("text-white")
                          : tailwind("text-gray-800"),
                      ]}
                    >
                      {interest.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[tailwind("w-11/12 p-3 mx-auto rounded-xl bg-red-400 my-5")]}
          onPress={() => {
            setStep4(false);
            setStep5(true);
          }}
        >
          <Text style={tailwind("text-center font-bold text-white text-xl")}>
            Continue
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return loader ? (
      <View style={tailwind("flex-1 justify-center items-center")}>
        <ActivityIndicator size={55} />
      </View>
    ) : (
      <SafeAreaView style={tailwind("flex-1")}>
        <Header title="Step 5" />
        <Text
          style={tailwind(
            "font-bold mb-1 text-2xl text-center text-purple-700"
          )}
        >
          Ideals match
        </Text>
        <Text
          style={tailwind(
            "font-bold mb-5 text-3xl text-center text-purple-700 px-5"
          )}
        >
          🫶
        </Text>

        <Text style={tailwind("leading-5 pb-3 px-5 text-base mb-3")}>
          What are you hoping to find on the{" "}
          <Text style={tailwind("font-bold text-base")}>MyDestiny</Text> dating
          app?
        </Text>
        <ScrollView style={tailwind("px-5")}>
          <View style={tailwind("pb-40")}>
            <View style={tailwind("flex-row flex-wrap justify-between h-64")}>
              {ideals.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      tailwind(
                        "border-2 border-gray-300 rounded-3xl h-44 w-40 px-3 text-center justify-center items-center pt-0 mb-5"
                      ),
                      item.selected
                        ? tailwind("bg-red-200 border-red-400")
                        : tailwind("bg-transparent"),
                    ]}
                    onPress={() => {
                      updateIdeals(item.id, !item.selected);
                    }}
                  >
                    <Image
                      style={tailwind("h-20 w-20")}
                      source={{ uri: item.icon }}
                    />
                    <Text
                      style={[
                        tailwind("text-xl font-bold pl-1 pt-1"),
                        item.selected
                          ? tailwind("text-white")
                          : tailwind("text-gray-800"),
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[tailwind("w-11/12 p-3 mx-auto rounded-xl bg-red-400 my-5")]}
          onPress={() => {
            setLoader(true);
            updateProfile();
          }}
        >
          <Text style={tailwind("text-center font-bold text-white text-xl")}>
            Finish Up
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

export default ProfileScreen;
