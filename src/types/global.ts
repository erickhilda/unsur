import { categories } from '@/data/label';

export type Category = (typeof categories)[number];

export type ChemicalElement = {
  'cpk-hex': string | null;
  appearance: string | null;
  atomic_mass: number;
  atomic_radius: number | null;
  boiling_point: number | null;
  category: Category;
  column: number; // aka group, in range 1 - 18
  covalent_radius: number | null;
  density: number;
  discoverer: string;
  electron_affinity: number | null;
  electron_configuration_semantic: string;
  electron_configuration: string;
  electronegativity_pauling: number | null;
  electronegativity: number | null;
  first_ionization: number | null;
  ionization_energies: number[];
  jmol_color: string | null;
  melting_point: number | null;
  metal: boolean | null;
  metalloid: boolean | null;
  molar_heat: number | null;
  electrons: number;
  neutrons: number;
  protons: number;
  n_shells: number;
  n_valence: number | null;
  name: string;
  natural: boolean | null;
  nonmetal: boolean | null;
  number_of_isotopes: number | null;
  number: number | string;
  period: number;
  phase: 'Gas' | 'Liquid' | 'Solid';
  radioactive: boolean | null;
  row: number; // != period for lanthanides and actinides
  shells: number[];
  specific_heat: number | null;
  spectral_img: string | null;
  summary: string;
  symbol: string;
  year: number | string;
  image: {
    title: string;
    url: string;
    attribution: string;
  };
  bohr_model_3d: string;
  bohr_model_image: string;
  source: string;
  block: 's' | 'p' | 'd' | 'f';
};
