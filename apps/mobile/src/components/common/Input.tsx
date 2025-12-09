import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { theme } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  disabled = false,
  required = false,
  style,
  containerStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          disabled && styles.inputContainerDisabled,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            !!leftIcon && styles.inputWithLeftIcon,
            !!rightIcon && styles.inputWithRightIcon,
            style,
          ]}
          placeholderTextColor={theme.colors.text.tertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          {...props}
        />

        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },

  labelContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },

  label: {
    ...theme.typography.styles.label,
    color: theme.colors.text.primary,
  },

  required: {
    ...theme.typography.styles.label,
    color: theme.colors.error,
    marginLeft: theme.spacing.xs / 2,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.components.input.height.medium,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.gray[200],
    borderRadius: theme.radius.component.input,
    paddingHorizontal: theme.spacing.md,
  },

  inputContainerFocused: {
    borderColor: theme.colors.primary.main,
    ...theme.shadows.sm,
  },

  inputContainerError: {
    borderColor: theme.colors.error,
  },

  inputContainerDisabled: {
    backgroundColor: theme.colors.gray[50],
    opacity: 0.7,
  },

  input: {
    flex: 1,
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
    padding: 0, // Remove default padding
  },

  inputWithLeftIcon: {
    marginLeft: theme.spacing.sm,
  },

  inputWithRightIcon: {
    marginRight: theme.spacing.sm,
  },

  leftIcon: {
    marginRight: theme.spacing.xs,
  },

  rightIcon: {
    marginLeft: theme.spacing.xs,
  },

  errorText: {
    ...theme.typography.styles.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },

  helperText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
});
