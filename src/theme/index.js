

import { Platform } from 'react-native';

export const colors = {
  background: '#F6F7FB', 
  surface: '#FFFFFF', 
  primary: '#E3350D', 
  primaryDark: '#B32A0A', 
  primarySoft: '#FDECE7', 
  success: '#0E9F6E',
  danger: '#E11D48', 
  text: '#111827',
  textMuted: '#6B7280', 
  border: '#E5E7EB', 
  white: '#FFFFFF',
};


export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  full: 999, 
};

export const typography = {
  title: { fontSize: 26, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  body: { fontSize: 15, color: colors.text },
  caption: { fontSize: 13, color: colors.textMuted },
  label: { fontSize: 12, fontWeight: '600' },
};


export const shadow = Platform.select({
  ios: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
});

export default { colors, spacing, radius, typography, shadow };