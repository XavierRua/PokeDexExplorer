

import { View, Text, StyleSheet } from 'react-native';
import { STAT_LABELS, MAX_STAT_VALUE } from '../constants/pokemon';
import { colors, spacing, radius, typography } from '../theme';


export default function StatBar({ name, value }) {

  const label = STAT_LABELS[name] ?? name;


  const percent = Math.min(value / MAX_STAT_VALUE, 1) * 100;

  return (
    <View style={styles.row}>
      <Text style={[typography.caption, styles.label]}>{label}</Text>
      <Text style={[typography.body, styles.value]}>{value}</Text>

      {/* Fondo gris de la barra (el 100 %) */}
      <View style={styles.track}>
        {/* Concepto: ancho en porcentaje calculado con el dato */}
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    width: 100, // ancho fijo para que todas las barras empiecen en el mismo punto
  },
  value: {
    width: 40,
    textAlign: 'right',
    marginRight: spacing.md,
    fontWeight: '700',
  },
  track: {
    flex: 1, // la barra ocupa el resto de la fila
    height: 8,
    backgroundColor: colors.border,
    borderRadius: radius.full,
    overflow: 'hidden', // recorta el relleno para que respete los bordes redondos
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
});