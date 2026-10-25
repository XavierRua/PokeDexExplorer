1. ¿Cómo consumí la API REST con fetch y async/await, y cómo manejé la respuesta, el error y la carga?

Todas las peticiones están en src/services/pokeApi.js. Cada función es async, arma la URL a partir de una BASE_URL y espera la respuesta con await fetch(url, { signal }). Antes de leer el cuerpo con response.json() reviso response.ok, porque si la API responde con error no siempre envía JSON. En el caso de un nombre inexistente, la PokéAPI responde 404 con texto plano, así que primero reviso response.status === 404 y devuelvo null. Esto me permite distinguir “el Pokémon no existe” de “falló la conexión”. Cualquier otro error lo lanzo con throw new Error(...), y los hooks lo atrapan con try/catch para mostrar el mensaje y el botón “Reintentar”. La carga la controlo con estados (loading, loadingMore) que se encienden antes de la petición y se apagan en el bloque finally, para que se apaguen tanto si salió bien como si falló.

2. ¿Cómo organicé la arquitectura y por qué?

Separé el proyecto por responsabilidades, para que cada archivo haga una sola cosa:

services solo habla con la API y convierte el JSON en objetos simples, con funciones de mapeo.
hooks manejan los estados de cada petición.
components son piezas visuales reutilizables.
screens deciden qué mostrar según el estado.
utils, constants y theme guardan formato, datos fijos y estilos compartidos.

Así se cumple la regla del taller de no mezclar las llamadas a la API con los estilos y el JSX. Además, si mañana cambia la API, solo tengo que modificar el servicio y los mappers, mientras la interfaz sigue igual. La estructura la adapté de mi proyecto anterior, ReservaClasesIngles, pero sin las librerías que este taller no necesita (React Navigation, AsyncStorage, Firebase), porque aquí el usuario solo consulta datos y no genera información que deba guardarse.

3. ¿Cómo controlé cuándo se ejecuta cada petición con el array de dependencias de useEffect?

En la lista, el efecto depende de fetchPage, una función creada con useCallback y dependencias vacías, que por eso nunca cambia. El efecto corre una sola vez y carga los primeros 20 al abrir la app. En la ficha, el efecto depende de [query, retryCount]: solo vuelve a pedir datos cuando cambia el Pokémon buscado o cuando el usuario pulsa “Reintentar”, que suma 1 a retryCount. Si dejara el efecto sin array, se ejecutaría en cada render y la petición se repetiría sin parar. También usé la función de limpieza del efecto para cancelar con AbortController la petición pendiente cuando el usuario vuelve a la lista o busca otro Pokémon antes de que llegue la respuesta.

4. ¿Por qué usé FlatList y qué tuve en cuenta con las imágenes remotas?

FlatList solo pinta los elementos visibles en pantalla y recicla los demás, mientras que un ScrollView con map pintaría todos los Pokémon cargados a la vez y la app se volvería lenta a medida que crece la lista. Usé numColumns={2} para la cuadrícula, keyExtractor con el id como clave única y onEndReached para el scroll infinito. Además, una bandera con useRef evita pedir la misma página dos veces cuando onEndReached se dispara seguido. Envolví la tarjeta con memo para que, al agregar 20 nuevos, no se repinten las anteriores. En las imágenes remotas, Image necesita width y height explícitos, porque React Native no conoce su tamaño hasta descargarlas y sin ellos no se ven. Para la lista armo la URL de la imagen con el id, así no tengo que pedir la ficha completa de cada Pokémon.

5. ¿Cómo diseñé los estados de la interfaz?

Cada petición pasa por cuatro estados: cargando, error, sin resultados y éxito. Las vistas los revisan siempre en ese orden, para que nunca se vean dos al mismo tiempo. Creé un componente reutilizable, StatusView, que muestra el indicador de carga con texto, el mensaje de error en español con “Reintentar” o el mensaje de sin resultados. Para las páginas siguientes de la lista, el indicador y el error aparecen al final, sin borrar los Pokémon ya cargados. El botón “Volver a la lista” está visible en todos los estados de la ficha, para que el usuario nunca quede atrapado si algo falla.

6. ¿Qué dificultades tuve y qué aprendí?

Al crear el proyecto descubrí que había un repositorio de Git en una carpeta superior. Lo detecté con git rev-parse --show-toplevel y lo resolví con git init dentro del proyecto. Aprendí a verificar dónde está el repositorio antes del primer commit.
Durante el desarrollo, Expo Go se actualizó solo a la versión para SDK 58 y dejó de abrir el proyecto en SDK 57. Lo actualicé con npx expo install expo@^58.0.0 y npx expo install --fix, y aprendí que expo install elige las versiones compatibles con el SDK, a diferencia de npm install.
La red de la universidad bloquea la PokéAPI, así que tuve que probar con datos móviles.
Aprendí que la API no siempre responde JSON y que por eso hay que revisar el estado antes de leer el cuerpo.