import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.intro}>
        <ThemedText
          accessibilityRole="header"
          adjustsFontSizeToFit
          numberOfLines={2}
          style={styles.title}
          variant="title"
        >
          Request a ride
        </ThemedText>
        <ThemedText style={styles.description} variant="body">
          Choose your pickup point and destination, then let the autonomous
          taxi take care of the journey.
        </ThemedText>
      </View>

      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.artwork}
      >
        <View style={styles.artworkFrame}>
          <Image
            accessible={false}
            resizeMode="contain"
            source={require("../../assets/images/onboarding-taxi-passenger.png")}
            style={styles.illustration}
          />
          <Image
            accessible={false}
            resizeMode="contain"
            source={require("../../assets/icons/onboarding-status-badge.png")}
            style={styles.badge}
          />
        </View>
      </View>

      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.progressArea}
      >
        <View style={styles.progress}>
          <Image
            accessible={false}
            source={require("../../assets/icons/onboarding-progress-active.png")}
            style={styles.progressActive}
          />
          <Image
            accessible={false}
            source={require("../../assets/icons/onboarding-progress-dot.png")}
            style={styles.progressDotOne}
          />
          <Image
            accessible={false}
            source={require("../../assets/icons/onboarding-progress-dot.png")}
            style={styles.progressDotTwo}
          />
        </View>
      </View>

      <View style={styles.actionArea}>
        <ThemedButton
          accessibilityLabel="Continue to tracking introduction"
          label="Get Started"
          onPress={() => router.navigate("/onboarding-tracking")}
          style={styles.action}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8FF",
  },
  intro: {
    flex: 23,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 32,
  },
  title: {
    width: "100%",
  },
  description: {
    width: "100%",
    marginTop: 14,
  },
  artwork: {
    flex: 42,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  artworkFrame: {
    width: "91%",
    maxWidth: 390,
    aspectRatio: 390 / 290,
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: "6.6%",
    right: "11.8%",
    width: "5.65%",
    aspectRatio: 1,
  },
  progressArea: {
    flex: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    width: 102,
    height: 14,
  },
  progressActive: {
    width: 56,
    height: 14,
  },
  progressDotOne: {
    width: 14,
    height: 14,
    marginLeft: 8,
  },
  progressDotTwo: {
    width: 14,
    height: 14,
    marginLeft: 10,
  },
  actionArea: {
    flex: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  action: {
    width: "51.4%",
    maxWidth: 220,
  },
});
