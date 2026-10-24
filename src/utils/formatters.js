
export const formatPokemonNumber = (id) => `#${String(id).padStart(3, '0')}`;

export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};


const formatDecimal = (value) => value.toFixed(1).replace('.', ',');


export const formatHeight = (meters) => `${formatDecimal(meters)} m`;


export const formatWeight = (kilograms) => `${formatDecimal(kilograms)} kg`;