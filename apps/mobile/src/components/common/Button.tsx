import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { theme } from '../../theme';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  children,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' || variant === 'danger'
              ? theme.colors.white
              : theme.colors.primary.main
          }
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text
            style={[
              styles.text,
              styles[`${variant}Text`],
              styles[`${size}Text`],
              icon && iconPosition === 'left' && styles.textWithIconLeft,
              icon && iconPosition === 'right' && styles.textWithIconRight,
            ]}
          >
            {children}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base styles
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.component.button,
    ...theme.shadows.sm,
  },

  // Sizes
  small: {
    height: theme.components.button.height.small,
    paddingHorizontal: theme.spacing.md,
  },
  medium: {
    height: theme.components.button.height.medium,
    paddingHorizontal: theme.spacing.lg,
  },
  large: {
    height: theme.components.button.height.large,
    paddingHorizontal: theme.spacing.xl,
  },

  // Variants
  primary: {
    backgroundColor: theme.colors.primary.main,
  },
  secondary: {
    backgroundColor: theme.colors.secondary.main,
  },
  outline: {
    backgroundColor: theme.colors.transparent,
    borderWidth: 2,
    borderColor: theme.colors.primary.main,
  },
  ghost: {
    backgroundColor: theme.colors.transparent,
  },
  danger: {
    backgroundColor: theme.colors.error,
  },

  // Text styles
  text: {
    ...theme.typography.styles.button,
  },
  smallText: {
    ...theme.typography.styles.buttonSmall,
  },
  mediumText: {
    ...theme.typography.styles.button,
  },
  largeText: {
    ...theme.typography.styles.button,
    fontSize: 18,
  },

  // Text colors by variant
  primaryText: {
    color: theme.colors.white,
  },
  secondaryText: {
    color: theme.colors.white,
  },
  outlineText: {
    color: theme.colors.primary.main,
  },
  ghostText: {
    color: theme.colors.primary.main,
  },
  dangerText: {
    color: theme.colors.white,
  },

  // States
  disabled: {
    opacity: 0.6,
  },

  // Layout
  fullWidth: {
    width: '100%',
  },

  // Icon spacing
  textWithIconLeft: {
    marginLeft: theme.spacing.sm,
  },
  textWithIconRight: {
    marginRight: theme.spacing.sm,
  },
});
