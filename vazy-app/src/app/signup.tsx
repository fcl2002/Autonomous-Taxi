import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

          <TextInput
            accessibilityLabel="Full name"
            autoCapitalize="words"
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
            accessibilityHint="At least 8 characters"
            accessibilityLabel="Password"
            autoCapitalize="none"
            autoCorrect={false}
            enterKeyHint="done"
            onChangeText={setPassword}
            onSubmitEditing={signUp}
            placeholder="Password (8+ characters)"
            placeholderTextColor="#A5A5A5"
            secureTextEntry
            style={[styles.input, styles.spacedInput]}
            value={password}
          />

          {error && (
            <ThemedText accessibilityRole="alert" style={styles.error} variant="bodyPrimary">
              {error}
            </ThemedText>
          )}

          <ThemedButton
            accessibilityState={{ busy: loading, disabled: loading }}
            disabled={loading}
            label={loading ? "Creating account…" : "Sign Up"}
            onPress={signUp}
            style={[styles.action, loading && styles.busy]}
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
  error: {
    width: "100%",
    maxWidth: 350,
    marginTop: 12,
    color: "#C62828",
  },
  action: {
    width: "100%",
    maxWidth: 350,
    marginTop: 30,
  },
  busy: {
    opacity: 0.6,
  },
  loginPrompt: {
    width: "100%",
    marginTop: "auto",
    paddingTop: 60,
    marginBottom: 2,
  },
});
