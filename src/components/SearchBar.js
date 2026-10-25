import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

   
export default function SearchBar({ onSearch }) {
 
  const [text, setText] = useState('');

 
  const isEmpty = text.trim() === '';

  const handleSearch = () => {
    if (isEmpty) return;
    onSearch(text); 
  };

  return (
    <View style={styles.container}>
      {/* Concepto: TextInput. autoCapitalize y autoCorrect apagados (pista del taller) */}
      <TextInput
        style={[typography.body, styles.input]}
        value={text}
        onChangeText={setText}
        placeholder="Busca por nombre o número..."
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />

      {/* El botón se ve apagado y no responde mientras el campo esté vacío */}
      <Pressable
        onPress={handleSearch}
        disabled={isEmpty}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          isEmpty && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // campo y botón en la misma fila
    alignItems: 'center',
    gap: spacing.sm,
  },
  input: {
    flex: 1, 
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
  },
  buttonPressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
  },
});