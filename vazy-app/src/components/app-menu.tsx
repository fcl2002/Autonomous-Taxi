import { SymbolView } from "expo-symbols";
import { signOut } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { auth } from "@/lib/firebase";
import { profileRef } from "@/lib/profile";

// Menu button + side panel for the map. Logging out needs no navigation: the root layout's guard moves to /login.
export function AppMenu() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState<string | null>(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (!open || !user) return;
    return onSnapshot(profileRef(user.uid), (snap) => setFullName(snap.get("fullName") ?? null), console.warn);
  }, [open, user]);

  function confirmLogOut() {
    Alert.alert("Log out?", "You'll need to log in again to request a ride.", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => signOut(auth) },
    ]);
  }

  return (
    <>
      <Pressable
        accessibilityLabel="Open menu"
        accessibilityRole="button"
        hitSlop={8}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [styles.button, { top: insets.top + 16 }, pressed && styles.pressed]}
      >
        <SymbolView name={{ ios: "line.3.horizontal", android: "menu", web: "menu" }} size={24} tintColor="#000000" />
      </Pressable>

      <Modal animationType="fade" onRequestClose={() => setOpen(false)} transparent visible={open}>
        <View style={styles.overlay}>
          <View style={[styles.panel, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
            {fullName && (
              <ThemedText numberOfLines={1} variant="bodyLarge">
                {fullName}
              </ThemedText>
            )}
            <ThemedText numberOfLines={1} style={styles.email} variant="bodyPrimary">
              {user?.email}
            </ThemedText>

            <View style={styles.divider} />

            {/* shortcut: inactive until the profile page exists; wire onPress to it then. */}
            <View accessibilityLabel="Profile, coming soon" accessibilityState={{ disabled: true }} accessible style={styles.row}>
              <SymbolView name={{ ios: "person", android: "person", web: "person" }} size={24} tintColor={Colors.light.textSecondary} />
              <ThemedText style={[styles.rowLabel, styles.inactive]} variant="bodyPrimary">
                Profile
              </ThemedText>
              <ThemedText style={styles.inactive} variant="bodyPrimary">
                Soon
              </ThemedText>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={confirmLogOut}
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}
            >
              <SymbolView
                name={{ ios: "rectangle.portrait.and.arrow.right", android: "logout", web: "logout" }}
                size={24}
                tintColor="#000000"
              />
              <ThemedText style={styles.rowLabel} variant="bodyPrimary">
                Log out
              </ThemedText>
            </Pressable>
          </View>

          <Pressable
            accessibilityLabel="Close menu"
            accessibilityRole="button"
            onPress={() => setOpen(false)}
            style={styles.backdrop}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    left: 16,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.backgroundSelected,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  panel: {
    width: "80%",
    maxWidth: 320,
    paddingHorizontal: 24,
    backgroundColor: Colors.light.background,
  },
  backdrop: {
    flex: 1,
  },
  email: {
    marginTop: 4,
    color: Colors.light.textSecondary,
  },
  divider: {
    height: 1,
    marginVertical: 24,
    backgroundColor: Colors.light.backgroundSelected,
  },
  row: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  rowLabel: {
    flex: 1,
  },
  inactive: {
    color: Colors.light.textSecondary,
  },
});
