/**
 * CarConnect Theme
 * Complete Design System Export
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,

  // Component variants
  components: {
    button: {
      height: {
        small: 36,
        medium: 48,
        large: 56,
      },
    },
    input: {
      height: {
        small: 40,
        medium: 56,
        large: 64,
      },
    },
    bottomTab: {
      height: 65,
    },
    header: {
      height: 56,
    },
  },
};

export type Theme = typeof theme;

// Re-export individual modules
export { colors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';
export { radius } from './radius';
export { shadows } from './shadows';

export default theme;
