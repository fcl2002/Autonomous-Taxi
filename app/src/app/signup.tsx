import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { Colors, Fonts } from "@/constants/theme";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardArea}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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
            Sign Up
          </ThemedText>

          <TextInput
            accessibilityLabel="Full name"
            autoCapitalize="words"
            autoComplete="name"
            enterKeyHint="next"
            inputMode="text"
            onChangeText={setFullName}
            placeholder="Full Name"
            placeholderTextColor="#A5A5A5"
            style={styles.input}
            value={fullName}
          />

          <TextInput
            accessibilityLabel="Email address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            enterKeyHint="next"
            inputMode="email"
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#A5A5A5"
            style={[styles.input, styles.spacedInput]}
            value={email}
          />

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
            style={[styles.input, styles.spacedInput]}
            value={phoneNumber}
          />

          {/* ponytail: visual-only; add validation, account creation, Firebase Authentication, and result states when signup logic is specified. */}
          <ThemedButton label="Sign Up" style={styles.action} />

          <ThemedText style={styles.loginPrompt} variant="bodyPrimary">
            Already have an account?{" "}
            <ThemedText
              accessibilityRole="link"
              onPress={() => router.replace("/login")}
              variant="link"
            >
              Sign In
            </ThemedText>
          </ThemedText>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 39,
    paddingTop: 76,
    paddingBottom: 12,
  },
  brand: {
    width: "100%",
    maxWidth: 350,
    marginBottom: 64,
    fontSize: 52,
  },
  title: {
    marginBottom: 45,
  },
  input: {
    width: "100%",
    maxWidth: 350,
    height: 55,
    paddingHorizontal: 29,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    color: Colors.light.text,
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  spacedInput: {
    marginTop: 20,
  },
  action: {
    width: "100%",
    maxWidth: 350,
    marginTop: 30,
  },
  loginPrompt: {
    width: "100%",
    marginTop: "auto",
    paddingTop: 60,
    marginBottom: 2,
  },
});
