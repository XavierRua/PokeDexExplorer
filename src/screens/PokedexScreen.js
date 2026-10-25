

import { useState, useEffect, useCallback } from 'react';
import { View, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonListView from './PokemonListView';
import PokemonDetailView from './PokemonDetailView';
import { colors } from '../theme';

export default function PokedexScreen() {
  
  const [selectedQuery, setSelectedQuery] = useState(null);

  const isDetailVisible = selectedQuery !== null;

  
  const handleSelectPokemon = useCallback((pokemon) => {
    setSelectedQuery(pokemon.id);
  }, []);

  
  const handleSearch = useCallback((text) => {
    setSelectedQuery(text);
  }, []);

  
  const handleBack = useCallback(() => {
    setSelectedQuery(null);
  }, []);

  
  
  useEffect(() => {
    if (!isDetailVisible) return;

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      handleBack();
      return true; // true = "ya lo manejé", la app no se cierra
    });

 
    return () => subscription.remove();
  }, [isDetailVisible, handleBack]);

  return (
    
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* La lista NO se desmonta al abrir la ficha: solo se oculta.
          Así conserva los Pokémon cargados y la posición del scroll al volver */}
      <View style={[styles.view, isDetailVisible && styles.hidden]}>
        <PokemonListView onSelectPokemon={handleSelectPokemon} onSearch={handleSearch} />
      </View>

      {/* Concepto: renderizado condicional. La ficha solo existe mientras se ve */}
      {isDetailVisible ? (
        <View style={styles.view}>
          <PokemonDetailView query={selectedQuery} onBack={handleBack} />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  view: {
    flex: 1,
  },
  hidden: {
    display: 'none', // oculta la vista sin desmontarla
  },
});