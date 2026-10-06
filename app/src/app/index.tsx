import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.screen}>
        <View style={styles.brand}>
          <Text
            accessibilityRole="header"
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
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8FF",
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
