import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";

export default function OnboardingTracking() {
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
          Track your ride in real time
        </ThemedText>
        <ThemedText style={styles.description} variant="body">
          Follow the taxi’s location and stay updated on every step of your journey.
        </ThemedText>
      </View>

      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.artwork}
      >
        <Image
          accessible={false}
          resizeMode="contain"
          source={require("../../assets/images/onboarding-tracking.png")}
          style={styles.illustration}
        />
      </View>

      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.progressArea}
      >
        <View style={styles.progress}>
          <Image
            accessible={false}
            source={require("../../assets/icons/onboarding-progress-dot.png")}
            style={styles.progressDot}
          />
          <Image
            accessible={false}
            source={require("../../assets/icons/onboarding-progress-active.png")}
            style={styles.progressActive}
          />
          <Image
            accessible={false}
            source={require("../../assets/icons/onboarding-progress-dot.png")}
            style={styles.progressLastDot}
          />
        </View>
      </View>

      <View style={styles.actionArea}>
        <ThemedButton
          accessibilityLabel="Continue to location privacy introduction"
          label="Get Started"
          onPress={() => router.navigate("/onboarding-location")}
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
    flex: 44,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  illustration: {
    width: "100%",
    maxWidth: 427,
    aspectRatio: 427 / 388,
  },
  progressArea: {
    flex: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    width: 104,
    height: 14,
  },
  progressDot: {
    width: 14,
    height: 14,
  },
  progressActive: {
    width: 56,
    height: 14,
    marginLeft: 10,
  },
  progressLastDot: {
    width: 14,
    height: 14,
    marginLeft: 10,
  },
  actionArea: {
    flex: 19,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  action: {
    width: "51.4%",
    maxWidth: 220,
  },
});
