import { View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';


const ICONS = {
  error: '⚠️',
  empty: '🔍',
};

export default function StatusView({ type = 'loading', title, message, actionLabel, onAction }) {
  return (
    <View style={styles.container}>
      {/* Concepto: renderizado condicional. Cargando muestra el indicador; los demás, un ícono */}
      {type === 'loading' ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <Text style={styles.icon}>{ICONS[type]}</Text>
      )}

      {title ? <Text style={[typography.subtitle, styles.title]}>{title}</Text> : null}

      {message ? <Text style={[typography.caption, styles.message]}>{message}</Text> : null}

      {/* El botón solo aparece si se le pasa una acción */}
      {onAction ? (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  icon: {
    fontSize: 44,
  },
  title: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
  message: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.sm,
  },
  buttonPressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
  },
});