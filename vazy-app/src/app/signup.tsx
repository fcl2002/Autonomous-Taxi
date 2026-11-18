import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedButton } from "@/components/themed-button";
import { ThemedInput } from "@/components/themed-input";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { authErrorMessage } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { saveProfile } from "@/lib/profile";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signUp() {
    const name = fullName.trim();
    // Firebase doesn't require a name, so check it here.
    if (!name) return setError("Enter your full name.");
    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
      // Not awaited: Firestore queues and retries the write; if it is lost, complete-profile asks again.
      saveProfile(user, name).catch(console.warn);
    } catch (e) {
      setError(authErrorMessage(e));
      setLoading(false);
    }
  }

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

          <ThemedInput
            accessibilityLabel="Full name"
            autoCapitalize="words"
            enterKeyHint="next"
            inputMode="text"
            maxLength={100}
            onChangeText={setFullName}
            placeholder="Full Name"
                        value={fullName}
          />

          <ThemedInput
            accessibilityLabel="Email address"
            autoCapitalize="none"
            autoCorrect={false}
            enterKeyHint="next"
            inputMode="email"
            onChangeText={setEmail}
            placeholder="Email"
            style={styles.spacedInput}
            value={email}
          />

          <ThemedInput
            accessibilityHint="At least 8 characters"
            accessibilityLabel="Password"
            autoCapitalize="none"
            autoCorrect={false}
            enterKeyHint="done"
            onChangeText={setPassword}
            onSubmitEditing={signUp}
            placeholder="Password (8+ characters)"
            secureTextEntry
            style={styles.spacedInput}
            value={password}
          />

          {error && (
            <ThemedText accessibilityRole="alert" style={styles.error} variant="error">
              {error}
            </ThemedText>
          )}

          <ThemedButton
            accessibilityState={{ busy: loading, disabled: loading }}
            disabled={loading}
            label={loading ? "Creating account…" : "Sign Up"}
            onPress={signUp}
            style={styles.action}
          />

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
  spacedInput: {
    marginTop: 20,
  },
  error: {
    width: "100%",
    maxWidth: 350,
    marginTop: 12,
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
