import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle, ActivityIndicator } from "react-native"
import { colors } from "../theme/colors"

interface ButtonProps {
  onPress: () => void
  title: string
  variant?: "primary" | "secondary" | "outline"
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export const Button = ({
  onPress,
  title,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) => {
  const buttonStyles = [
    styles.button,
    variant === "primary" && styles.primaryButton,
    variant === "secondary" && styles.secondaryButton,
    variant === "outline" && styles.outlineButton,
    disabled && styles.disabledButton,
    style,
  ]

  const textStyles = [
    styles.text,
    variant === "outline" && styles.outlineText,
    disabled && styles.disabledText,
    textStyle,
  ]

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? colors.primary : colors.text.white} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.white,
  },
  outlineText: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.text.secondary,
  },
})

