import { Stack } from "expo-router";
import { initialWindowMetrics, SafeAreaProvider, } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { onAuthStateChanged, type User } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { auth } from "@/lib/firebase";
import { profileRef } from "@/lib/profile";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Medel: require("../../assets/fonts/Medel/Medel.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });
  // undefined = session not restored yet; keep the splash up so no wrong screen flashes.
  const [user, setUser] = useState<User | null | undefined>(undefined);

  // "missing" only when the server confirms it; offline or pending states never trigger the name prompt.
  // Keyed by uid so a previous user's answer never applies to the next one.
  const [profileOf, setProfileOf] = useState<{ uid: string; exists: boolean } | null>(null);
  const profile =
    !user || profileOf?.uid !== user.uid ? "unknown" : profileOf.exists ? "present" : "missing";

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    if (!user) return;
    return onSnapshot(profileRef(user.uid), { includeMetadataChanges: true }, (snap) => {
      if (snap.exists() || !snap.metadata.fromCache) setProfileOf({ uid: user.uid, exists: snap.exists() });
    }, console.warn);
  }, [user]);

  const ready = (fontsLoaded || !!fontError) && user !== undefined;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);
    
  if (fontError) {
    console.error("Font loading error: ", fontError);
  }

  if (!ready) return null;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Losing the session (logout) lands on login, not the onboarding. */}
        <Stack.Protected guard={!!user && profile !== "missing"} redirectTo="/login">
          <Stack.Screen name="map" />
        </Stack.Protected>
        <Stack.Protected guard={!!user && profile === "missing"}>
          <Stack.Screen name="complete-profile" />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="onboarding-tracking" />
          <Stack.Screen name="onboarding-location" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </Stack.Protected>
      </Stack>
    </SafeAreaProvider>
  );
}
