import { StyleSheet, Text, type TextProps } from "react-native";

import { Colors, Fonts } from "@/constants/theme";

export type ThemedTextVariant =
  | "brand"
  | "title"
  | "display"
  | "body"
  | "bodyPrimary"
  | "bodyLarge"
  | "link"
  | "action";

export type ThemedTextProps = TextProps & {
  variant?: ThemedTextVariant;
};

export function ThemedText({
  style,
  variant = "bodyPrimary",
  ...props
}: ThemedTextProps) {
  return <Text {...props} style={[styles.base, styles[variant], style]} />;
}

const styles = StyleSheet.create({
  base: {
    flexShrink: 1,
  },
  brand: {
    color: Colors.light.text,
    fontFamily: Fonts.semibold,
    fontSize: 54,
    letterSpacing: -2,
    lineHeight: 60,
    textAlign: "center",
  },
  title: {
    color: Colors.light.text,
    fontFamily: Fonts.regular,
    fontSize: 42,
    letterSpacing: -1,
    lineHeight: 52,
    textAlign: "center",
  },
  display: {
    color: Colors.light.text,
    fontFamily: Fonts.display,
    fontSize: 36,
    letterSpacing: -1.5,
    lineHeight: 44,
    textAlign: "center",
  },
  body: {
    color: Colors.light.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  bodyPrimary: {
    color: Colors.light.text,
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  bodyLarge: {
    color: Colors.light.text,
    fontFamily: Fonts.medium,
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
  },
  link: {
    color: Colors.accent,
    fontFamily: Fonts.semibold,
    fontSize: 16,
    lineHeight: 24,
  },
  action: {
    color: Colors.onAccent,
    fontFamily: Fonts.semibold,
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
  },
});
