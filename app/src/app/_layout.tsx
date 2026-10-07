import { Stack } from "expo-router";
import { initialWindowMetrics, SafeAreaProvider, } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Medel: require("../../assets/fonts/Medel/Medel.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
    
  if (!fontError) {
    console.error("Font loading error: ", fontError);
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
