import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

// Web app config from the Firebase console. Not secret: access is enforced by Auth and Security Rules.
const app = initializeApp({
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
});

// AsyncStorage keeps the user signed in across app restarts; web's getAuth already persists in the browser
// (and Firebase's web build has no getReactNativePersistence).
export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

// Default memory cache: pending writes are retried while the app runs, lost if it is killed.
export const db = getFirestore(app);
