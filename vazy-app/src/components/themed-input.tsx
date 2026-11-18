import { StyleSheet, TextInput, type TextInputProps } from "react-native";

import { Colors, Fonts } from "@/constants/theme";

// The rounded text field used by the login, sign-up and profile forms.
export function ThemedInput({ style, ...props }: TextInputProps) {
  return <TextInput placeholderTextColor="#A5A5A5" {...props} style={[styles.input, style]} />;
}

const styles = StyleSheet.create({
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
});
