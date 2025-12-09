/**
 * CarConnect Border Radius System
 */

export const radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,

  // Component-specific
  component: {
    button: 12,
    input: 12,
    card: 12,
    cardLarge: 16,
    modal: 16,
    bottomSheet: 16,
    avatar: 9999,
    badge: 9999,
    pill: 9999,
  },
};

export type Radius = typeof radius;
