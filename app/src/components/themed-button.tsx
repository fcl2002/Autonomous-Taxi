import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type TextStyle,
} from "react-native";

import { Colors } from "@/constants/theme";

import { ThemedText } from "./themed-text";

export type ThemedButtonProps = Omit<PressableProps, "children"> & {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
};

export function ThemedButton({
  accessible = true,
  accessibilityRole = "button",
  label,
  labelStyle,
  style,
  ...props
}: ThemedButtonProps) {
  return (
    <Pressable
      {...props}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      style={(state) => [
        styles.button,
        typeof style === "function" ? style(state) : style,
      ]}
    >
      <ThemedText
        adjustsFontSizeToFit
        numberOfLines={1}
        style={[styles.label, labelStyle]}
        variant="action"
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 55,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: Colors.accent,
  },
  label: {
    maxWidth: "100%",
  },
});
