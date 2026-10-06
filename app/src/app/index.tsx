import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <>
      <StatusBar style="dark" />
      <Pressable
        accessible
        accessibilityLabel="Vazy. Continue to onboarding"
        accessibilityRole="button"
        onPress={() => router.replace("/onboarding")}
        style={styles.screen}
      >
        <SafeAreaView style={styles.content}>
          <View style={styles.brand}>
            <Text
              accessible={false}
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.name}
            >
              Vazy
            </Text>
          </View>
          <View style={styles.artwork}>
            <Image
              accessible={false}
              resizeMode="contain"
              source={require("../../assets/images/vazy-taxi-passenger.png")}
              style={styles.illustration}
            />
          </View>
        </SafeAreaView>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8FF",
  },
  content: {
    flex: 1,
  },
  brand: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    width: "90%",
    color: "#000",
    fontSize: 54,
    fontWeight: "700",
    letterSpacing: -2,
    textAlign: "center",
  },
  artwork: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  illustration: {
    width: "100%",
    height: "85%",
  },
});
