import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";

export default function OnboardingLocation() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.artworkArea}
      >
        <View style={styles.artwork}>
          <Image
            accessible={false}
            resizeMode="contain"
            source={require("../../assets/icons/onboarding-location-background.png")}
            style={styles.background}
          />
          <Image
            accessible={false}
            resizeMode="contain"
            source={require("../../assets/icons/onboarding-location-person.png")}
            style={styles.person}
          />
          <Image
            accessible={false}
            resizeMode="contain"
            source={require("../../assets/icons/onboarding-location-globe-ring.png")}
            style={styles.globeRing}
          />
          <Image
            accessible={false}
            resizeMode="contain"
            source={require("../../assets/icons/onboarding-location-globe.png")}
            style={styles.globe}
          />
          <Image
            accessible={false}
            resizeMode="contain"
            source={require("../../assets/icons/onboarding-location-pin.png")}
            style={styles.pin}
          />
        </View>
      </View>

      <ThemedText style={styles.privacy} variant="bodyLarge">
        Your location, your control
      </ThemedText>
      <ThemedText style={styles.privacy} variant="bodyPrimary">
        We use your location to identify your pickup point and track your ride.
        Your location data is only used to provide the service and is handled
        according to our privacy policy.
      </ThemedText>

      <View style={styles.spacer} />

      {/* ponytail: UI-only navigation; request location permission and record the consent outcome before continuing when the data flow is implemented. */}
      <ThemedButton
        accessibilityLabel="Allow location and continue to phone login"
        label="Allow Location"
        onPress={() => router.navigate("/login")}
        style={styles.action}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8F8FF",
  },
  artworkArea: {
    width: "100%",
    height: "42%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  artwork: {
    position: "relative",
    width: "65.1%",
    maxWidth: 279,
    aspectRatio: 278.531 / 278.919,
  },
  background: {
    position: "absolute",
    top: "8.22%",
    left: 0,
    width: "100%",
    height: "91.78%",
  },
  person: {
    position: "absolute",
    top: 0,
    left: "34.49%",
    width: "49.42%",
    height: "100%",
  },
  globeRing: {
    position: "absolute",
    top: "32.03%",
    left: "14%",
    width: "31.59%",
    height: "31.55%",
  },
  globe: {
    position: "absolute",
    top: "38.12%",
    left: "20.1%",
    width: "19.43%",
    height: "19.4%",
  },
  pin: {
    position: "absolute",
    top: "34.54%",
    left: "21.9%",
    width: "8.62%",
    height: "11.47%",
  },
  privacy: {
    alignSelf: "stretch",
    marginHorizontal: 32,
    marginTop: 28,
  },
  spacer: {
    flex: 1,
  },
  action: {
    width: "81.8%",
    maxWidth: 350,
  },
});
