

import { View, Text, StyleSheet } from 'react-native';
import { getTypeInfo } from '../constants/pokemon';
import { spacing, radius, typography } from '../theme';


export default function TypeBadge({ type }) {
  const { label, color, textColor } = getTypeInfo(type);

  return (

    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={[typography.label, styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full, 
  },
  text: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});