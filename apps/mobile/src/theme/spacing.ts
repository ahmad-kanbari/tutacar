/**
 * CarConnect Spacing System
 * Based on 8px grid
 */

export const spacing = {
  // Base unit: 8px
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,

  // Component-specific spacing
  component: {
    // Card padding
    cardPadding: 16,
    cardPaddingLarge: 20,

    // Screen padding
    screenPadding: 16,
    screenPaddingLarge: 24,

    // Button padding
    buttonPaddingVertical: 12,
    buttonPaddingHorizontal: 24,
    buttonPaddingSmall: 8,

    // Input padding
    inputPadding: 16,
    inputPaddingVertical: 14,

    // Icon sizes
    iconSmall: 16,
    iconMedium: 20,
    iconLarge: 24,
    iconXLarge: 32,

    // Avatar sizes
    avatarSmall: 32,
    avatarMedium: 48,
    avatarLarge: 64,
    avatarXLarge: 96,

    // Gaps
    gapTiny: 4,
    gapSmall: 8,
    gapMedium: 12,
    gapLarge: 16,
    gapXLarge: 24,
  },
};

export type Spacing = typeof spacing;
