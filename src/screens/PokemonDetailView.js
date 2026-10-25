

import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import usePokemonDetail from '../hooks/usePokemonDetail';
import StatusView from '../components/StatusView';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';
import { getTypeInfo } from '../constants/pokemon';
import { formatPokemonNumber, capitalize, formatHeight, formatWeight } from '../utils/formatters';
import { colors, spacing, radius, typography, shadow } from '../theme';


export default function PokemonDetailView({ query, onBack }) {
  const { pokemon, loading, error, notFound, retry } = usePokemonDetail(query);

  const renderContent = () => {
   
    if (loading) {
      return <StatusView type="loading" message="Cargando ficha..." />;
    }

 
    if (error) {
      return (
        <StatusView
          type="error"
          title="Algo salió mal"
          message={error}
          actionLabel="Reintentar"
          onAction={retry}
        />
      );
    }

  
    if (notFound) {
      return (
        <StatusView
          type="empty"
          title="Sin resultados"
          message={`No encontramos ningún Pokémon con el nombre o número "${String(query).trim()}".`}
        />
      );
    }


    if (!pokemon) {
      return null;
    }

    const mainColor = getTypeInfo(pokemon.types[0]).color;

   
    return (
      <ScrollView contentContainerStyle={styles.content}>
        {/* Imagen grande sobre el color del tipo principal */}
        <View style={[styles.imageContainer, { backgroundColor: mainColor }]}>
          {/* Concepto: Image remota con width y height explícitos */}
          <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
        </View>

        {/* Número y nombre */}
        <Text style={[typography.caption, styles.number]}>{formatPokemonNumber(pokemon.id)}</Text>
        <Text style={[typography.title, styles.name]}>{capitalize(pokemon.name)}</Text>

        {/* Un distintivo por cada tipo */}
        <View style={styles.typesRow}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>

        {/* Altura y peso (ya convertidos a m y kg en el servicio) */}
        <View style={styles.measuresRow}>
          <View style={styles.measureBox}>
            <Text style={typography.subtitle}>{formatHeight(pokemon.height)}</Text>
            <Text style={typography.caption}>Altura</Text>
          </View>
          <View style={styles.measureBox}>
            <Text style={typography.subtitle}>{formatWeight(pokemon.weight)}</Text>
            <Text style={typography.caption}>Peso</Text>
          </View>
        </View>

        {/* Las 6 estadísticas base con barra proporcional */}
        <View style={styles.statsCard}>
          <Text style={[typography.subtitle, styles.statsTitle]}>Estadísticas base</Text>
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.name} name={stat.name} value={stat.value} />
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Barra superior con el botón "Volver a la lista" (visible en todos los estados) */}
      <View style={styles.topBar}>
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
        >
          <Text style={styles.backButtonText}>← Volver a la lista</Text>
        </Pressable>
      </View>

      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
  },
  backButtonPressed: {
    backgroundColor: colors.primaryDark,
  },
  backButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  content: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  imageContainer: {
    width: 240,
    height: 240,
    borderRadius: 120, // la mitad del ancho: círculo
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  number: {
    marginTop: spacing.lg,
  },
  name: {
    marginTop: spacing.xs,
  },
  typesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  measuresRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
    width: '100%',
  },
  measureBox: {
    flex: 1, // las dos cajas miden lo mismo
    alignItems: 'center',
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadow,
  },
  statsCard: {
    width: '100%',
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadow,
  },
  statsTitle: {
    marginBottom: spacing.md,
  },
});