import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardArea}
      >
        <View style={styles.content}>
          <View style={styles.form}>
            {/* ponytail: text wordmark until an approved Vazy logo asset exists. */}
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.brand}>
              Vazy
            </Text>

            <Text accessibilityRole="header" style={styles.title}>
              Login
            </Text>

            <Text style={styles.guidance}>Login with your phone number</Text>

            <TextInput
              accessibilityLabel="Phone number"
              autoCapitalize="none"
              autoComplete="tel"
              autoCorrect={false}
              enterKeyHint="done"
              inputMode="tel"
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
              placeholderTextColor="#A5A5A5"
              style={styles.input}
              value={phoneNumber}
            />

            {/* ponytail: visual-only; add validation, OTP delivery, Firebase Authentication, and result states when the login logic is specified. */}
            <View style={styles.action}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.actionText}>
                Send Code
              </Text>
            </View>
          </View>

          {/* ponytail: visual-only; add navigation after the sign-up destination is specified. */}
          <Text style={styles.signupPrompt}>
            Don’t have an account?{" "}
            <Text style={styles.signupText}>Sign Up</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8FF",
  },
  keyboardArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 39,
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 350,
    paddingBottom: 88,
  },
  brand: {
    width: "100%",
    marginBottom: 88,
    color: "#000",
    fontSize: 52,
    fontWeight: "700",
    letterSpacing: -2,
    lineHeight: 60,
    textAlign: "center",
  },
  title: {
    marginBottom: 52,
    color: "#000",
    fontSize: 36,
    fontWeight: "400",
    letterSpacing: -1.5,
    lineHeight: 44,
    textAlign: "center",
  },
  guidance: {
    marginBottom: 25,
    color: "#000",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 55,
    paddingHorizontal: 29,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 50,
    backgroundColor: "#FFF",
    color: "#000",
    fontSize: 14,
  },
  action: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
    marginTop: 30,
    borderRadius: 50,
    backgroundColor: "#3422F2",
  },
  actionText: {
    maxWidth: "85%",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500",
  },
  signupPrompt: {
    marginBottom: 2,
    color: "#000",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  signupText: {
    color: "#3422F2",
    fontWeight: "700",
  },
});
