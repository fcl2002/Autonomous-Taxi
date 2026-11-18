import { Stack } from "expo-router";
import { initialWindowMetrics, SafeAreaProvider, } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "@/lib/firebase";

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

  useEffect(() => onAuthStateChanged(auth, setUser), []);

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
        <Stack.Protected guard={!!user} redirectTo="/login">
          <Stack.Screen name="map" />
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
