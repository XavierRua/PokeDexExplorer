

import { useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import usePokemonList from '../hooks/usePokemonList';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import StatusView from '../components/StatusView';
import { colors, spacing, radius, typography } from '../theme';


export default function PokemonListView({ onSelectPokemon, onSearch }) {
  const { pokemonList, loading, loadingMore, error, loadMore, retry } = usePokemonList();

  
  const renderItem = useCallback(
    ({ item }) => <PokemonCard pokemon={item} onPress={onSelectPokemon} />,
    [onSelectPokemon]
  );

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator color={colors.primary} />
          <Text style={[typography.caption, styles.footerText]}>Cargando más Pokémon...</Text>
        </View>
      );
    }

  
    if (error && pokemonList.length > 0) {
      return (
        <View style={styles.footer}>
          <Text style={[typography.caption, styles.footerError]}>{error}</Text>
          <Pressable
            onPress={retry}
            style={({ pressed }) => [styles.footerButton, pressed && styles.footerButtonPressed]}
          >
            <Text style={styles.footerButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }

    return null;
  };


  const renderContent = () => {
  
    if (loading && pokemonList.length === 0) {
      return <StatusView type="loading" message="Cargando Pokémon..." />;
    }

    
    if (error && pokemonList.length === 0) {
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

 
    return (
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        keyboardShouldPersistTaps="handled"
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con el título y la búsqueda */}
      <View style={styles.header}>
        <Text style={[typography.title, styles.title]}>PokéDex Explorer</Text>
        <SearchBar onSearch={onSearch} />
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
  header: {
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    color: colors.primary,
  },
  listContent: {
    padding: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  footerText: {
    marginTop: spacing.sm,
  },
  footerError: {
    color: colors.danger,
    textAlign: 'center',
    marginHorizontal: spacing.lg,
  },
  footerButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
  },
  footerButtonPressed: {
    backgroundColor: colors.primaryDark,
  },
  footerButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
});