import { ChemicalElement } from '@/types/global';
export const categories = [
  'actinide',
  'alkali metal',
  'alkaline earth metal',
  'diatomic nonmetal',
  'lanthanide',
  'metalloid',
  'noble gas',
  'polyatomic nonmetal',
  'post-transition metal',
  'transition metal',
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

export const briefPropertyLabels: Partial<
  Record<keyof ChemicalElement, [string, string]>
> = {
  atomic_mass: ['Atomic Mass', 'u'],
  atomic_radius: ['Atomic Radius', 'pm'],
  density: ['Density', 'g/cm³'],
};

export const detailsPropertyLabels: Partial<
  Record<keyof ChemicalElement, [string, string]>
> = {
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
};
