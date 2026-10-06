import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
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
          Accept a job
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
            source={require("../../assets/images/onboarding-status-badge.png")}
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
            source={require("../../assets/images/onboarding-progress-active.png")}
            style={styles.progressActive}
          />
          <Image
            accessible={false}
            source={require("../../assets/images/onboarding-progress-dot.png")}
            style={styles.progressDotOne}
          />
          <Image
            accessible={false}
            source={require("../../assets/images/onboarding-progress-dot.png")}
            style={styles.progressDotTwo}
          />
        </View>
      </View>

      <View style={styles.actionArea}>
        <View style={styles.action}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.actionText}>
            Get Started
          </Text>
        </View>
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
