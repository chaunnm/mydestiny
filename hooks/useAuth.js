import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

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
  function onAuthStateChanged(currentUser) {
    setCurrentUser(currentUser);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
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

  // console.log("Current ben useAuth: ", currentUser);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
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
      signOut,
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
