import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingTracking() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.intro}>
        <Text
          accessibilityRole="header"
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.title}
        >
          Tracking Realtime
        </Text>
        <Text style={styles.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
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
            source={require("../../assets/images/tabIcons/onboarding-progress-dot.png")}
            style={styles.progressDot}
          />
          <Image
            accessible={false}
            source={require("../../assets/images/tabIcons/onboarding-progress-active.png")}
            style={styles.progressActive}
          />
          <Image
            accessible={false}
            source={require("../../assets/images/tabIcons/onboarding-progress-dot.png")}
            style={styles.progressLastDot}
          />
        </View>
      </View>

      <View style={styles.actionArea}>
        <Pressable
          accessible
          accessibilityLabel="Continue to location privacy introduction"
          accessibilityRole="button"
          onPress={() => router.navigate("/onboarding-location")}
          style={styles.action}
        >
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.actionText}>
            Get Started
          </Text>
        </Pressable>
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
    color: "#000",
    fontSize: 42,
    fontWeight: "400",
    letterSpacing: -1,
    lineHeight: 52,
    textAlign: "center",
  },
  description: {
    marginTop: 14,
    color: "#525252",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
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
    alignItems: "center",
    justifyContent: "center",
    width: "51.4%",
    maxWidth: 220,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#3422F2",
  },
  actionText: {
    maxWidth: "85%",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
