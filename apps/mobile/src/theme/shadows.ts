/**
 * CarConnect Shadow System
 * Subtle depth for iOS and Android
 */

import { Platform } from 'react-native';

const createShadow = (elevation: number) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: elevation,
      },
      shadowOpacity: 0.1 + (elevation * 0.01),
      shadowRadius: elevation * 1.5,
    };
  }
  return {
    elevation,
  };
};

export const shadows = {
  none: {},

  sm: {
    ...createShadow(2),
    // shadowOpacity: 0.05 on iOS
  },

  md: {
    ...createShadow(4),
    // shadowOpacity: 0.1 on iOS
  },

  lg: {
    ...createShadow(8),
    // shadowOpacity: 0.15 on iOS
  },

  xl: {
    ...createShadow(12),
    // shadowOpacity: 0.2 on iOS
  },

  '2xl': {
    ...createShadow(16),
    // shadowOpacity: 0.25 on iOS
  },
};

export type Shadows = typeof shadows;
