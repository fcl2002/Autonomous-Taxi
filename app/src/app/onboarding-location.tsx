import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
            source={require("../../assets/images/tabIcons/onboarding-location-background.png")}
            style={styles.background}
          />
          <Image
            accessible={false}
            resizeMode="contain"
            source={require("../../assets/images/tabIcons/onboarding-location-person.png")}
            style={styles.person}
          />
          <Image
            accessible={false}
            resizeMode="contain"
            source={require("../../assets/images/tabIcons/onboarding-location-globe-ring.png")}
            style={styles.globeRing}
          />
          <Image
            accessible={false}
            resizeMode="contain"
            source={require("../../assets/images/tabIcons/onboarding-location-globe.png")}
            style={styles.globe}
          />
          <Image
            accessible={false}
            resizeMode="contain"
            source={require("../../assets/images/tabIcons/onboarding-location-pin.png")}
            style={styles.pin}
          />
        </View>
      </View>

      <Text style={styles.privacy}>Don&apos;t worry your data is private</Text>

      <View style={styles.spacer} />

      <View style={styles.action}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.actionText}>
          Allow Location
        </Text>
      </View>
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
    width: "84%",
    marginTop: 28,
    color: "#000",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 30,
    textAlign: "center",
  },
  spacer: {
    flex: 1,
  },
  action: {
    alignItems: "center",
    justifyContent: "center",
    width: "81.8%",
    maxWidth: 350,
    minHeight: 55,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#3422F2",
  },
  actionText: {
    maxWidth: "100%",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500",
  },
});
