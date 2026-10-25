
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PokedexScreen from './src/screens/PokedexScreen';

export default function App() {
  return (
    // Concepto: SafeAreaProvider. Mide las zonas seguras del celular (notch, barras)
    // una sola vez; los SafeAreaView de adentro usan esas medidas
    <SafeAreaProvider>
      {/* Textos de la barra de estado (hora, batería) en oscuro, sobre el fondo claro */}
      <StatusBar style="dark" />
      <PokedexScreen />
    </SafeAreaProvider>
  );
}