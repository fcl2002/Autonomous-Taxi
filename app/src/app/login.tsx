import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";

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
            <ThemedText
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.brand}
              variant="brand"
            >
              Vazy
            </ThemedText>

            <ThemedText
              accessibilityRole="header"
              style={styles.title}
              variant="display"
            >
              Login
            </ThemedText>

            <ThemedText style={styles.guidance} variant="bodyPrimary">
              Login with your phone number
            </ThemedText>

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
            <ThemedButton label="Send Code" style={styles.action} />
          </View>

          {/* ponytail: visual-only; add navigation after the sign-up destination is specified. */}
          <ThemedText style={styles.signupPrompt} variant="bodyPrimary">
            Don’t have an account?{" "}
            <ThemedText variant="link">Sign Up</ThemedText>
          </ThemedText>
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
    paddingBottom: 12,
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
    fontSize: 52,
  },
  title: {
    marginBottom: 52,
  },
  guidance: {
    width: "100%",
    marginBottom: 25,
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
    width: "100%",
    marginTop: 30,
  },
  signupPrompt: {
    width: "100%",
    marginBottom: 2,
  },
});
