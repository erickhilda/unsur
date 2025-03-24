import { ChemicalElement } from '@/types/global';
export const categories = [
  'actinide',
  'alkali metal',
  'alkaline earth metal',
  'lanthanide',
  'metalloid',
  'noble gas',
  'diatomic nonmetal',
  'polyatomic nonmetal',
  'post-transition metal',
  'transition metal',
  // added for data-v2 compatibility
  'reactive nonmetal',
  'unknown',
] as const;

export const lantinideAndAntinide: Partial<ChemicalElement>[] = [
  {
    name: 'Lanthanide',
    row: 6,
    column: 3,
    category: 'lanthanide',
    number: '57-71',
  },
  {
    name: 'Actinide',
    row: 7,
    column: 3,
    category: 'actinide',
    number: '89-103',
  },
];

export const detailsPropertyLabels: Partial<
  Record<keyof ChemicalElement, [string, string]>
> = {
  category: ['Category', ''],
  atomic_mass: ['Atomic Mass', 'u'],
  atomic_radius: ['Atomic Radius', 'pm'],
  boiling_point: ['Boiling Point', 'K'],
  covalent_radius: ['Covalent Radius', 'pm'],
  density: ['Density', 'g/cm³'],
  electronegativity: ['Electronegativity', ''],
  electron_affinity: ['Electron Affinity', 'kJ/mol'],
  first_ionization: ['First Ionization', 'kJ/mol'],
  melting_point: ['Melting Point', 'K'],
  molar_heat: ['Molar Heat', 'J/(mol·K)'],
  n_valence: ['Electron valency', ''],
  shells: ['Shells ocupation', ''],
  specific_heat: ['Specific Heat', 'J/(g·K)'],
  discoverer: ['Discover by', ''],
  year: ['Year of Discovery', ''],
  image: ['Image', ''],
};
