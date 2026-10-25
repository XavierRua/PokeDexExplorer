

import { memo } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadow } from '../theme';
import { formatPokemonNumber, capitalize } from '../utils/formatters';

function PokemonCard({ pokemon, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(pokemon)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.imageContainer}>
        {/* Concepto: Image con URL remota. Necesita width y height explícitos o no se ve */}
        <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
      </View>

      {/* Número con 3 dígitos: #025 */}
      <Text style={typography.caption}>{formatPokemonNumber(pokemon.id)}</Text>

      {/* Nombre con la primera letra en mayúscula */}
      <Text style={[typography.body, styles.name]} numberOfLines={1}>
        {capitalize(pokemon.name)}
      </Text>
    </Pressable>
  );
}


export default memo(PokemonCard);

const styles = StyleSheet.create({
  card: {
    flex: 1, 
    margin: spacing.sm,
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadow,
  },
  cardPressed: {
    opacity: 0.7,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.sm,
  },
  image: {
    width: 96,
    height: 96,
  },
  name: {
    marginTop: spacing.xs,
    fontWeight: '700',
  },
});