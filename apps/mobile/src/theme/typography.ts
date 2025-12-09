/**
 * CarConnect Typography System
 * Based on Inter font family (System fonts on iOS/Android)
 */

export const typography = {
  // Font Families
  fonts: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },

  // Font Weights
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },

  // Font Sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
  },

  // Line Heights
  lineHeights: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 26,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
    '5xl': 48,
  },

  // Pre-defined Text Styles
  styles: {
    // Headings
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700' as const,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600' as const,
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600' as const,
      letterSpacing: -0.2,
    },
    h4: {
      fontSize: 18,
      lineHeight: 26,
      fontWeight: '600' as const,
    },

    // Body Text
    bodyLarge: {
      fontSize: 18,
      lineHeight: 26,
      fontWeight: '400' as const,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400' as const,
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400' as const,
    },

    // Labels & Captions
    label: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500' as const,
    },
    labelSmall: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500' as const,
      letterSpacing: 0.5,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400' as const,
    },

    // Buttons
    button: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600' as const,
      letterSpacing: 0.3,
    },
    buttonSmall: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '600' as const,
    },

    // Special
    overline: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '600' as const,
      letterSpacing: 1,
      textTransform: 'uppercase' as const,
    },
  },
};

export type Typography = typeof typography;
