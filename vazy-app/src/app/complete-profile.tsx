import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedButton } from "@/components/themed-button";
import { ThemedInput } from "@/components/themed-input";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
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
      // shortcut: a rules refusal bounces back here without the message; only a broken rules deploy can cause it.
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

        <ThemedInput
          accessibilityLabel="Full name"
          autoCapitalize="words"
          enterKeyHint="done"
          inputMode="text"
          maxLength={100}
          onChangeText={setFullName}
          onSubmitEditing={save}
          placeholder="Full Name"
                    value={fullName}
        />

        {error && (
          <ThemedText accessibilityRole="alert" style={styles.error} variant="error">
            {error}
          </ThemedText>
        )}

        <ThemedButton
          accessibilityState={{ busy: loading, disabled: loading }}
          disabled={loading}
          label={loading ? "Saving…" : "Continue"}
          onPress={save}
          style={styles.action}
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
});
