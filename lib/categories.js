// Category colours: muted, survey-map tones. Deliberately quieter than the
// magenta midpoint (#C51162) — they identify, they don't compete.
export const CATEGORIES = [
  { id: 'restaurant', label: 'Restaurants', color: '#B0563A', osm: [['amenity', 'restaurant']] },
  { id: 'cafe',       label: 'Cafés',       color: '#8C6D46', osm: [['amenity', 'cafe'], ['amenity', 'ice_cream']] },
  { id: 'bar',        label: 'Bars & pubs', color: '#6E4F8C', osm: [['amenity', 'bar'], ['amenity', 'pub'], ['amenity', 'biergarten']] },
  { id: 'fastfood',   label: 'Quick bites', color: '#C0913C', osm: [['amenity', 'fast_food'], ['amenity', 'food_court']] },
  { id: 'park',       label: 'Parks',       color: '#4E8A5A', osm: [['leisure', 'park'], ['leisure', 'garden']] },
  { id: 'sport',      label: 'Sports',      color: '#3E7FA6', osm: [['leisure', 'sports_centre'], ['leisure', 'fitness_centre'], ['leisure', 'swimming_pool']] },
  { id: 'culture',    label: 'Culture',     color: '#925C8B', osm: [['amenity', 'cinema'], ['amenity', 'theatre'], ['tourism', 'museum'], ['tourism', 'gallery']] },
  { id: 'games',      label: 'Games',       color: '#4FA08B', osm: [['leisure', 'bowling_alley'], ['leisure', 'escape_game'], ['leisure', 'amusement_arcade']] },
  { id: 'shopping',   label: 'Shopping',    color: '#8A8FBF', osm: [['shop', 'mall'], ['shop', 'department_store'], ['amenity', 'marketplace']] },
];

export const CATEGORY_COLORS = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.color]));

export const CATEGORY_IDS = new Set(CATEGORIES.map((c) => c.id));
