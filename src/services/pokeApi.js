
const BASE_URL = 'https://pokeapi.co/api/v2';


const ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';


export const PAGE_SIZE = 20;


const getIdFromUrl = (url) => {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
};


const getArtworkUrl = (id) => `${ARTWORK_URL}/${id}.png`;

const mapPokemonListItem = (item) => {
  const id = getIdFromUrl(item.url);

  return {
    id,
    name: item.name,
    image: getArtworkUrl(id),
  };
};


const mapPokemonDetail = (row) => {
  return {
    id: row.id,
    name: row.name,

    image: row.sprites?.other?.['official-artwork']?.front_default ?? getArtworkUrl(row.id),
    height: row.height / 10, 
    weight: row.weight / 10, 
    types: row.types.map((item) => item.type.name), // ['electric']
    stats: row.stats.map((item) => ({
      name: item.stat.name, // 'hp', 'attack'...
      value: item.base_stat, // 35
    })),
  };
};


export const getPokemonList = async (offset = 0, signal) => {
  const url = `${BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  const data = await response.json();

  return {
    items: data.results.map(mapPokemonListItem),
    hasMore: data.next !== null, 
  };
};


export const getPokemonDetail = async (nameOrId, signal) => {
  
  const query = String(nameOrId).trim().toLowerCase();
  const isNumber = /^\d+$/.test(query);


  const path = isNumber ? String(Number(query)) : encodeURIComponent(query);
  const url = `${BASE_URL}/pokemon/${path}`;
  const response = await fetch(url, { signal });


  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  const data = await response.json();
  return mapPokemonDetail(data);
};