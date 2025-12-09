/**
 * CarConnect Color Palette
 * Professional & Trustworthy Design System
 */

export const colors = {
  // Primary Colors - Trust & Reliability
  primary: {
    main: '#2563EB',      // Primary Blue
    dark: '#1E40AF',      // Primary Blue Dark (hover/press states)
    light: '#3B82F6',     // Primary Blue Light
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    600: '#2563EB',
    700: '#1D4ED8',
    900: '#1E3A8A',
  },

  // Secondary Colors
  secondary: {
    main: '#10B981',      // Success Green
    dark: '#059669',
    light: '#34D399',
  },

  // Status Colors
  success: '#10B981',     // Green
  warning: '#F59E0B',     // Orange
  error: '#EF4444',       // Red
  info: '#3B82F6',        // Blue

  // Neutral Grays
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Semantic Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },

  text: {
    primary: '#111827',     // Gray 900
    secondary: '#4B5563',   // Gray 600
    tertiary: '#9CA3AF',    // Gray 400
    disabled: '#D1D5DB',    // Gray 300
    inverse: '#FFFFFF',
  },

  border: {
    light: '#E5E7EB',       // Gray 200
    main: '#D1D5DB',        // Gray 300
    dark: '#9CA3AF',        // Gray 400
    focus: '#2563EB',       // Primary Blue
  },

  // Status-specific backgrounds
  statusBg: {
    available: '#D1FAE5',   // Light green
    busy: '#FEF3C7',        // Light orange
    offline: '#F3F4F6',     // Light gray
    verified: '#DBEAFE',    // Light blue
  },

  // Gradient backgrounds
  gradients: {
    emergency: ['#FEF2F2', '#FEE2E2'],  // Red gradient
    premium: ['#EFF6FF', '#DBEAFE'],    // Blue gradient
    success: ['#D1FAE5', '#A7F3D0'],    // Green gradient
  },

  // Special
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export type Colors = typeof colors;
