import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ToastAndroid } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  GoogleSignin.configure({
    webClientId:
      "1024398290814-f72e5thm3khv3h3eduka049v038m9kl3.apps.googleusercontent.com",
  });

  // Handle user state changes
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        user.reload().then(async () => {
          setCurrentUser(user);
          const deviceToken = await messaging().getToken();

          firestore()
            .collection("users")
            .doc(user.uid)
            .update({
              displayName: user.displayName,
              photoURL: user.photoURL,
              deviceToken: deviceToken,
            });
        });
      } else {
        setCurrentUser(null);
      }

      if (initializing) setInitializing(false);
    });

    // Unsubscribe from the listener when the component is unmounted
    return () => subscriber();
  }, []);

  const onGoogleButtonPress = async () => {
    setLoading(true);

    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        // setCurrentUser(user);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateName = async (name) => {
    if (!currentUser) return;

    try {
      await currentUser.updateProfile({ displayName: name });

      auth()
        .currentUser.reload()
        .then(() => {
          setCurrentUser(auth().currentUser);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const updateAvatar = async (avatar) => {
    if (!currentUser) return;

    try {
      await currentUser.updateProfile({ photoURL: avatar });

      firestore()
        .collection("users")
        .doc(currentUser.id)
        .update({ photoURL: avatar });

      auth()
        .currentUser.reload()
        .then(() => {
          setCurrentUser(auth().currentUser);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (email, password, avatar) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (newUser) => {
        if (newUser.user) {
          await newUser.user
            .updateProfile({
              photoURL: avatar,
            })
            .then(() => {
              signOut();
              return newUser.user.reload();
            })
            .then(auth().currentUser.reload());
          // .then((s) => {
          //   ToastAndroid.showWithGravity(
          //     "Welcome to Tinder, have a great day! 🎉",
          //     ToastAndroid.SHORT,
          //     ToastAndroid.BOTTOM
          //   );
          //   console.log("Bên trong: ", newUser.user);
          //   return auth().currentUser.reload();
          // });
        }

        // return newUser.user
        //   .updateProfile({
        //     displayName: displayName,
        //     photoURL: avatar,
        //   })
        //   .then(() => {
        //     ToastAndroid.showWithGravity(
        //       "Welcome to Tinder, have a great day! 🎉",
        //       ToastAndroid.SHORT,
        //       ToastAndroid.BOTTOM
        //     );
        //     return newUser.user.reload();
        //   });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          ToastAndroid.showWithGravity(
            "That email address is already in use! 😿",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        } else if (error.code === "auth/invalid-email") {
          ToastAndroid.showWithGravity(
            "That email address is invalid! 😿",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        } else if (error.code === "auth/operation-not-allowed") {
          ToastAndroid.showWithGravity(
            "Your account was not allowed! 😿",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        } else if (error.code === "auth/weak-password") {
          ToastAndroid.showWithGravity(
            "Your password is not strong enough! 😿",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        } else {
          ToastAndroid.showWithGravity(
            "There is an error in firebase server! 😿",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
        console.error(error);
      });
  };

  const signIn = async (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.showWithGravity(
          "Welcome to MyDestiny, have a great day! 🎉",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          ToastAndroid.showWithGravity(
            "You provided a wrong password! 😿",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        } else if (error.code === "auth/user-not-found") {
          ToastAndroid.showWithGravity(
            "User not found, try again! 😿",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        } else {
          ToastAndroid.showWithGravity(
            `${error}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      });
  };

  // console.log("Current ben useAuth: ", currentUser);

  const signOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.revokeAccess();
    } catch (error) {
      console.error(error);
    }
  };

  const memoedValue = useMemo(
    () => ({
      currentUser,
      loading,
      error,
      onGoogleButtonPress,
      signIn,
      signUp,
      signOut,
      updateName,
      updateAvatar,
    }),
    [currentUser, loading, error]
  );

  if (initializing) return null;

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initializing && children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}
