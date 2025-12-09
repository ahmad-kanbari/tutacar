import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import { theme } from '../../theme';

interface CardProps extends TouchableOpacityProps {
  variant?: 'standard' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'none' | 'small' | 'medium' | 'large';
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'standard',
  padding = 'medium',
  children,
  style,
  onPress,
  ...props
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[
        styles.base,
        styles[variant],
        styles[`padding${capitalizeFirst(padding)}`],
        style,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.98 : 1}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

const capitalizeFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.component.card,
    overflow: 'hidden',
  },

  // Variants
  standard: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
    ...theme.shadows.sm,
  },

  elevated: {
    backgroundColor: theme.colors.white,
    ...theme.shadows.md,
  },

  outlined: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },

  gradient: {
    backgroundColor: theme.colors.primary[50],
    ...theme.shadows.sm,
  },

  // Padding
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: theme.spacing.sm,
  },
  paddingMedium: {
    padding: theme.spacing.md,
  },
  paddingLarge: {
    padding: theme.spacing.component.cardPaddingLarge,
  },
});
