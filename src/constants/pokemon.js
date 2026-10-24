
export const MAX_STAT_VALUE = 255;


export const STAT_LABELS = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. especial',
  'special-defense': 'Def. especial',
  speed: 'Velocidad',
};


export const TYPE_INFO = {
  normal: { label: 'Normal', color: '#A8A77A' },
  fire: { label: 'Fuego', color: '#EE8130' },
  water: { label: 'Agua', color: '#6390F0' },
  grass: { label: 'Planta', color: '#7AC74C' },
  electric: { label: 'Eléctrico', color: '#F7D02C', textColor: '#1F2937' },
  ice: { label: 'Hielo', color: '#96D9D6', textColor: '#1F2937' },
  fighting: { label: 'Lucha', color: '#C22E28' },
  poison: { label: 'Veneno', color: '#A33EA1' },
  ground: { label: 'Tierra', color: '#E2BF65', textColor: '#1F2937' },
  flying: { label: 'Volador', color: '#A98FF3' },
  psychic: { label: 'Psíquico', color: '#F95587' },
  bug: { label: 'Bicho', color: '#A6B91A' },
  rock: { label: 'Roca', color: '#B6A136' },
  ghost: { label: 'Fantasma', color: '#735797' },
  dragon: { label: 'Dragón', color: '#6F35FC' },
  dark: { label: 'Siniestro', color: '#705746' },
  steel: { label: 'Acero', color: '#B7B7CE', textColor: '#1F2937' },
  fairy: { label: 'Hada', color: '#D685AD' },
};


export const getTypeInfo = (type) => {
  const info = TYPE_INFO[type];

  return {
    label: info?.label ?? type,
    color: info?.color ?? '#9CA3AF',
    textColor: info?.textColor ?? '#FFFFFF',
  };
};