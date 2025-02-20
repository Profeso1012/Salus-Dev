import React from "react"
import { TextInput as RNTextInput, StyleSheet, type TextInputProps } from "react-native"
import { colors } from "../theme/colors"

interface Props extends TextInputProps {
  style?: any
}

export const TextInput = React.forwardRef<RNTextInput, Props>(({ style, ...props }, ref) => {
  return <RNTextInput ref={ref} style={[styles.input, style]} placeholderTextColor={colors.text.secondary} {...props} />
})

const styles = StyleSheet.create({
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.background,
  },
})

