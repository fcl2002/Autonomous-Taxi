import { useState } from "react";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
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
import { authErrorMessage } from "@/lib/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function logIn() {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
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

            <TextInput
              accessibilityLabel="Email address"
              autoCapitalize="none"
              autoCorrect={false}
              enterKeyHint="next"
              inputMode="email"
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#A5A5A5"
              style={styles.input}
              value={email}
            />

            <TextInput
              accessibilityLabel="Password"
              autoCapitalize="none"
              autoCorrect={false}
              enterKeyHint="done"
              onChangeText={setPassword}
              onSubmitEditing={logIn}
              placeholder="Password"
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
              label={loading ? "Logging in…" : "Log In"}
              onPress={logIn}
              style={[styles.action, loading && styles.busy]}
            />
          </View>

          <ThemedText style={styles.signupPrompt} variant="bodyPrimary">
            Don’t have an account?{" "}
            <ThemedText
              accessibilityRole="link"
              onPress={() => router.navigate("/signup")}
              variant="link"
            >
              Sign Up
            </ThemedText>
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
  spacedInput: {
    marginTop: 20,
  },
  error: {
    width: "100%",
    marginTop: 12,
    color: "#C62828",
  },
  action: {
    width: "100%",
    marginTop: 30,
  },
  busy: {
    opacity: 0.6,
  },
  signupPrompt: {
    width: "100%",
    marginBottom: 2,
  },
});
