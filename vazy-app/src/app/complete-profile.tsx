import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { Colors, Fonts } from "@/constants/theme";
import { authErrorMessage } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { saveProfile } from "@/lib/profile";

// Shown by the root layout only when the server confirms the signed-in user has no profile.
export default function CompleteProfile() {
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    const name = fullName.trim();
    if (!name) return setError("Enter your full name.");
    const user = auth.currentUser;
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      // The guard moves on as soon as the write lands locally; this resolves once the server accepts it.
      await saveProfile(user, name);
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
        style={styles.content}
      >
        <ThemedText accessibilityRole="header" style={styles.title} variant="display">
          {"What's your name?"}
        </ThemedText>
        <ThemedText style={styles.guidance} variant="bodyPrimary">
          {"We couldn't finish setting up your profile. Enter your full name to continue."}
        </ThemedText>

        <TextInput
          accessibilityLabel="Full name"
          autoCapitalize="words"
          enterKeyHint="done"
          inputMode="text"
          maxLength={100}
          onChangeText={setFullName}
          onSubmitEditing={save}
          placeholder="Full Name"
          placeholderTextColor="#A5A5A5"
          style={styles.input}
          value={fullName}
        />

        {error && (
          <ThemedText accessibilityRole="alert" style={styles.error} variant="bodyPrimary">
            {error}
          </ThemedText>
        )}

        <ThemedButton
          accessibilityState={{ busy: loading, disabled: loading }}
          disabled={loading}
          label={loading ? "Saving…" : "Continue"}
          onPress={save}
          style={[styles.action, loading && styles.busy]}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 39,
    paddingTop: 140,
  },
  title: {
    marginBottom: 16,
  },
  guidance: {
    maxWidth: 350,
    marginBottom: 40,
    textAlign: "center",
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
});
