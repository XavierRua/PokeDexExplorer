# PokéDex Explorer

Aplicación móvil hecha con **React Native y Expo** que consume la [PokéAPI](https://pokeapi.co/): lista Pokémon en una cuadrícula con scroll infinito, permite buscarlos por nombre o número y muestra su ficha con imagen, tipos, medidas y estadísticas.

Taller de **Consumo de API con React Native y Expo** — asignatura Desarrollo Móvil.
Autor: **Xavier Rua**.

---

## Funcionalidades

**Vista de lista**
- Encabezado "PokéDex Explorer".
- Búsqueda por nombre o número; ignora mayúsculas y espacios al inicio o al final.
- Cuadrícula de 2 columnas con imagen, número de 3 dígitos (`#025`) y nombre con mayúscula inicial.
- Carga 20 Pokémon al abrir y 20 más al llegar al final (scroll infinito), con indicador mientras carga.
- Al tocar una tarjeta se abre la ficha.

**Vista de detalle**
- Imagen grande, nombre y número.
- Un distintivo de color por cada tipo (Fuego, Agua, Planta...).
- Altura en metros y peso en kilogramos.
- Las 6 estadísticas base con barra de ancho proporcional (máximo 255).
- Botón "Volver a la lista" (y botón atrás de Android). Al volver, la lista conserva lo cargado y la posición.

**Estados de la interfaz** (en todas las peticiones)

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador de carga con texto |
| Error | Mensaje en español y botón "Reintentar" |
| Sin resultados | Mensaje cuando el nombre o número buscado no existe |
| Éxito | La lista o la ficha |

---

## Tecnologías

- React Native + Expo **SDK 58** (plantilla `blank`, sin Expo Router)
- JavaScript
- `fetch` con `async/await` (incluido, sin librerías HTTP)
- `react-native-safe-area-context` (única librería instalada, la que indica el taller)

No se usan React Navigation, AsyncStorage ni Firebase: el taller no los pide. Las dos vistas se manejan con un estado, y los datos viven en la PokéAPI, así que basta con guardarlos en memoria con `useState` mientras la app está abierta.

---

## Cómo ejecutar

Requisitos: Node.js y la app **Expo Go** (para SDK 58) en el celular.

```bash
git clone https://github.com/XavierRua/PokeDexExplorer.git
cd PokeDexExplorer
npm install
npx expo start
```

Escanear el código QR con Expo Go. El celular y el computador deben estar en la misma red WiFi.

> Algunas redes institucionales bloquean la PokéAPI. Si la app muestra error de conexión, probar con datos móviles u otra red.

---

## API utilizada

Todas las rutas parten de `https://pokeapi.co/api/v2` y responden JSON (no requiere API key).

| Endpoint | Uso en la app |
|---|---|
| `GET /pokemon?limit=20&offset={n}` | Lista paginada |
| `GET /pokemon/{nombre o id}` | Ficha de un Pokémon (responde 404 en texto plano si no existe) |

Las imágenes de la lista se arman con el id, sin pedir la ficha completa:
`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`

---

## Estructura de carpetas

```
PokeDexExplorer/
├── App.js
├── docs/
│   └── REFLEXION.md
└── src/
    ├── services/
    │   └── pokeApi.js
    ├── hooks/
    │   ├── usePokemonList.js
    │   └── usePokemonDetail.js
    ├── screens/
    │   ├── PokedexScreen.js
    │   ├── PokemonListView.js
    │   └── PokemonDetailView.js
    ├── components/
    │   ├── PokemonCard.js
    │   ├── SearchBar.js
    │   ├── StatusView.js
    │   ├── TypeBadge.js
    │   └── StatBar.js
    ├── constants/
    │   └── pokemon.js
    ├── utils/
    │   └── formatters.js
    └── theme/
        └── index.js
```

## Responsabilidad de cada archivo

| Archivo | Responsabilidad |
|---|---|
| `App.js` | Punto de entrada. Envuelve la app en `SafeAreaProvider`, configura la barra de estado y muestra `PokedexScreen`. |
| **services** | |
| `pokeApi.js` | **Única capa que habla con la API.** Contiene la `BASE_URL`, hace los `fetch`, revisa `response.ok` y el 404, y convierte el JSON en objetos simples con funciones de mapeo (extrae el id de la URL, arma la imagen, pasa altura y peso a m y kg). |
| **hooks** | |
| `usePokemonList.js` | Estados de la lista (`loading`, `loadingMore`, `error`), carga inicial, scroll infinito (`loadMore`), "Reintentar" y cancelación de peticiones. |
| `usePokemonDetail.js` | Estados de la ficha (`loading`, `error`, `notFound`, `pokemon`). Vuelve a pedir solo cuando cambia la búsqueda o se pulsa "Reintentar". |
| **screens** | |
| `PokedexScreen.js` | Pantalla principal. Un estado (`selectedQuery`) decide si se ve la lista o la ficha. Oculta la lista sin desmontarla y maneja el botón atrás de Android. |
| `PokemonListView.js` | Vista de lista: encabezado, búsqueda y `FlatList` de 2 columnas. Decide qué mostrar según el estado de la lista. |
| `PokemonDetailView.js` | Vista de detalle: la ficha completa y sus estados, con el botón "Volver a la lista". |
| **components** | |
| `PokemonCard.js` | Tarjeta de la cuadrícula: imagen remota, número y nombre. |
| `SearchBar.js` | Campo de búsqueda y botón "Buscar". Solo entrega el texto; no llama a la API. |
| `StatusView.js` | Componente reutilizable para los estados cargando, error y sin resultados. |
| `TypeBadge.js` | Distintivo de un tipo con su nombre en español y su color. |
| `StatBar.js` | Fila de una estadística con su valor y barra proporcional sobre 255. |
| **otros** | |
| `constants/pokemon.js` | Datos fijos: nombre en español y color de los 18 tipos, nombres de las estadísticas y el máximo de 255. |
| `utils/formatters.js` | Funciones de formato: número `#025`, mayúscula inicial, altura y peso con coma decimal. |
| `theme/index.js` | Colores, espaciado, bordes, tipografía y sombra compartidos (adaptado de mi proyecto anterior, ReservaClasesIngles). |

## ¿Por qué esta organización?

1. **La red está separada de la interfaz.** Solo `services/pokeApi.js` usa `fetch`. Los componentes y pantallas no saben de URLs ni de JSON: reciben objetos ya listos. Es la regla del taller, y además, si la API cambia, solo se modifica el servicio y sus funciones de mapeo.
2. **Los hooks manejan los estados.** Cada petición tiene su hook, que decide cuándo pedir datos (array de dependencias de `useEffect`) y en qué estado está. Las pantallas solo leen esos estados y deciden qué mostrar.
3. **Componentes pequeños y reutilizables.** `StatusView` se usa en la lista y en la ficha; `TypeBadge` y `StatBar` se repiten por cada tipo y estadística.
4. **Datos fijos, formato y estilos en su propio lugar** (`constants`, `utils`, `theme`), para no repetirlos en cada componente.

### Flujo de datos

```
pokeApi.js  →  hooks  →  screens  →  components
(fetch y mapeo)  (estados)  (qué mostrar)  (cómo se ve)
```

Ejemplo de la lista: `getPokemonList` pide la página a la API y la mapea → `usePokemonList` la agrega al estado → `PokemonListView` la pasa a la `FlatList` → `PokemonCard` la dibuja y `Image` descarga la imagen.

---

## Conceptos aplicados

| Concepto | Dónde |
|---|---|
| `fetch` + `async/await`, `response.ok`, códigos HTTP | `services/pokeApi.js` |
| Funciones de mapeo | `services/pokeApi.js` |
| `useState` | hooks, `SearchBar.js`, `PokedexScreen.js` |
| `useEffect` con array de dependencias y limpieza | `usePokemonList.js`, `usePokemonDetail.js`, `PokedexScreen.js` |
| `AbortController` para cancelar peticiones | hooks |
| `FlatList` (`numColumns`, `keyExtractor`, `onEndReached`) | `PokemonListView.js` |
| `Image` con URL remota (`width` y `height` explícitos) | `PokemonCard.js`, `PokemonDetailView.js` |
| `TextInput` controlado (`autoCapitalize`, `autoCorrect`) | `SearchBar.js` |
| `SafeAreaView` / `SafeAreaProvider` | `PokedexScreen.js`, `App.js` |
| `StyleSheet` | todos los componentes y vistas |

Cada concepto está marcado en el código con un comentario `// Concepto: ...` (o `{/* */}` dentro del JSX).

---

## Capturas y video

Las capturas de cada estado (lista, cargando más, ficha, cargando, error y sin resultados) y el video de demostración se entregan en la plataforma de la universidad.

---

## Reflexión

Las respuestas de reflexión del taller están en [docs/REFLEXION.md](docs/REFLEXION.md).