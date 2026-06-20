export type ElementCategory =
  | 'nonmetal'
  | 'noble-gas'
  | 'alkali-metal'
  | 'alkaline-earth-metal'
  | 'metalloid'
  | 'halogen'
  | 'post-transition-metal'
  | 'transition-metal'
  | 'lanthanide'
  | 'actinide'

export interface ElementData {
  atomicNumber: number
  symbol: string
  name: string
  atomicMass: number
  category: ElementCategory
  group: number | null
  period: number
  block: 's' | 'p' | 'd' | 'f'
  shells: number[]
  electronegativity: number | null
  gridRow: number
  gridCol: number
}

export const CATEGORY_COLORS: Record<ElementCategory, string> = {
  'nonmetal': '#22c55e',
  'noble-gas': '#a855f7',
  'alkali-metal': '#ef4444',
  'alkaline-earth-metal': '#f97316',
  'metalloid': '#06b6d4',
  'halogen': '#3b82f6',
  'post-transition-metal': '#64748b',
  'transition-metal': '#eab308',
  'lanthanide': '#ec4899',
  'actinide': '#d946ef',
}

export const CATEGORY_LABELS: Record<ElementCategory, string> = {
  'nonmetal': 'Nonmetal',
  'noble-gas': 'Noble Gas',
  'alkali-metal': 'Alkali Metal',
  'alkaline-earth-metal': 'Alkaline Earth Metal',
  'metalloid': 'Metalloid',
  'halogen': 'Halogen',
  'post-transition-metal': 'Post-Transition Metal',
  'transition-metal': 'Transition Metal',
  'lanthanide': 'Lanthanide',
  'actinide': 'Actinide',
}

export const SHELL_LABELS = ['K', 'L', 'M', 'N', 'O', 'P', 'Q']
export const SHELL_CAPACITIES = [2, 8, 18, 32, 32, 18, 8]

export function getValenceElectrons(shells: number[]): number {
  return shells[shells.length - 1] ?? 0
}

export function getValenceCapacity(shellIndex: number): number {
  return SHELL_CAPACITIES[shellIndex] ?? 0
}

export function getElectronsToFill(shells: number[]): number {
  const lastIdx = shells.length - 1
  const capacity = getValenceCapacity(lastIdx)
  const electrons = getValenceElectrons(shells)
  return capacity - electrons
}

export function getReactivityLabel(shells: number[], electronegativity: number | null): string {
  const toFill = getElectronsToFill(shells)
  if (toFill === 0) return 'Inert'
  const enBoost = electronegativity !== null && (electronegativity >= 3.5 || electronegativity <= 1.0) ? 1 : 0
  const adjusted = toFill - enBoost
  if (adjusted <= 1) return 'Highly Reactive'
  if (adjusted <= 3) return 'Reactive'
  if (adjusted <= 5) return 'Moderately Reactive'
  return 'Slightly Reactive'
}

export const ELEMENTS: ElementData[] = [
  { atomicNumber: 1, symbol: 'H', name: 'Hydrogen', atomicMass: 1.008, category: 'nonmetal', group: 1, period: 1, block: 's', shells: [1], electronegativity: 2.20, gridRow: 1, gridCol: 1 },
  { atomicNumber: 2, symbol: 'He', name: 'Helium', atomicMass: 4.003, category: 'noble-gas', group: 18, period: 1, block: 's', shells: [2], electronegativity: null, gridRow: 1, gridCol: 18 },
  { atomicNumber: 3, symbol: 'Li', name: 'Lithium', atomicMass: 6.94, category: 'alkali-metal', group: 1, period: 2, block: 's', shells: [2, 1], electronegativity: 0.98, gridRow: 2, gridCol: 1 },
  { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', atomicMass: 9.012, category: 'alkaline-earth-metal', group: 2, period: 2, block: 's', shells: [2, 2], electronegativity: 1.57, gridRow: 2, gridCol: 2 },
  { atomicNumber: 5, symbol: 'B', name: 'Boron', atomicMass: 10.81, category: 'metalloid', group: 13, period: 2, block: 'p', shells: [2, 3], electronegativity: 2.04, gridRow: 2, gridCol: 13 },
  { atomicNumber: 6, symbol: 'C', name: 'Carbon', atomicMass: 12.011, category: 'nonmetal', group: 14, period: 2, block: 'p', shells: [2, 4], electronegativity: 2.55, gridRow: 2, gridCol: 14 },
  { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', atomicMass: 14.007, category: 'nonmetal', group: 15, period: 2, block: 'p', shells: [2, 5], electronegativity: 3.04, gridRow: 2, gridCol: 15 },
  { atomicNumber: 8, symbol: 'O', name: 'Oxygen', atomicMass: 15.999, category: 'nonmetal', group: 16, period: 2, block: 'p', shells: [2, 6], electronegativity: 3.44, gridRow: 2, gridCol: 16 },
  { atomicNumber: 9, symbol: 'F', name: 'Fluorine', atomicMass: 18.998, category: 'halogen', group: 17, period: 2, block: 'p', shells: [2, 7], electronegativity: 3.98, gridRow: 2, gridCol: 17 },
  { atomicNumber: 10, symbol: 'Ne', name: 'Neon', atomicMass: 20.180, category: 'noble-gas', group: 18, period: 2, block: 'p', shells: [2, 8], electronegativity: null, gridRow: 2, gridCol: 18 },
  { atomicNumber: 11, symbol: 'Na', name: 'Sodium', atomicMass: 22.990, category: 'alkali-metal', group: 1, period: 3, block: 's', shells: [2, 8, 1], electronegativity: 0.93, gridRow: 3, gridCol: 1 },
  { atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', atomicMass: 24.305, category: 'alkaline-earth-metal', group: 2, period: 3, block: 's', shells: [2, 8, 2], electronegativity: 1.31, gridRow: 3, gridCol: 2 },
  { atomicNumber: 13, symbol: 'Al', name: 'Aluminium', atomicMass: 26.982, category: 'post-transition-metal', group: 13, period: 3, block: 'p', shells: [2, 8, 3], electronegativity: 1.61, gridRow: 3, gridCol: 13 },
  { atomicNumber: 14, symbol: 'Si', name: 'Silicon', atomicMass: 28.085, category: 'metalloid', group: 14, period: 3, block: 'p', shells: [2, 8, 4], electronegativity: 1.90, gridRow: 3, gridCol: 14 },
  { atomicNumber: 15, symbol: 'P', name: 'Phosphorus', atomicMass: 30.974, category: 'nonmetal', group: 15, period: 3, block: 'p', shells: [2, 8, 5], electronegativity: 2.19, gridRow: 3, gridCol: 15 },
  { atomicNumber: 16, symbol: 'S', name: 'Sulfur', atomicMass: 32.06, category: 'nonmetal', group: 16, period: 3, block: 'p', shells: [2, 8, 6], electronegativity: 2.58, gridRow: 3, gridCol: 16 },
  { atomicNumber: 17, symbol: 'Cl', name: 'Chlorine', atomicMass: 35.45, category: 'halogen', group: 17, period: 3, block: 'p', shells: [2, 8, 7], electronegativity: 3.16, gridRow: 3, gridCol: 17 },
  { atomicNumber: 18, symbol: 'Ar', name: 'Argon', atomicMass: 39.948, category: 'noble-gas', group: 18, period: 3, block: 'p', shells: [2, 8, 8], electronegativity: null, gridRow: 3, gridCol: 18 },
  { atomicNumber: 19, symbol: 'K', name: 'Potassium', atomicMass: 39.098, category: 'alkali-metal', group: 1, period: 4, block: 's', shells: [2, 8, 8, 1], electronegativity: 0.82, gridRow: 4, gridCol: 1 },
  { atomicNumber: 20, symbol: 'Ca', name: 'Calcium', atomicMass: 40.078, category: 'alkaline-earth-metal', group: 2, period: 4, block: 's', shells: [2, 8, 8, 2], electronegativity: 1.00, gridRow: 4, gridCol: 2 },
  { atomicNumber: 21, symbol: 'Sc', name: 'Scandium', atomicMass: 44.956, category: 'transition-metal', group: 3, period: 4, block: 'd', shells: [2, 8, 9, 2], electronegativity: 1.36, gridRow: 4, gridCol: 3 },
  { atomicNumber: 22, symbol: 'Ti', name: 'Titanium', atomicMass: 47.867, category: 'transition-metal', group: 4, period: 4, block: 'd', shells: [2, 8, 10, 2], electronegativity: 1.54, gridRow: 4, gridCol: 4 },
  { atomicNumber: 23, symbol: 'V', name: 'Vanadium', atomicMass: 50.942, category: 'transition-metal', group: 5, period: 4, block: 'd', shells: [2, 8, 11, 2], electronegativity: 1.63, gridRow: 4, gridCol: 5 },
  { atomicNumber: 24, symbol: 'Cr', name: 'Chromium', atomicMass: 51.996, category: 'transition-metal', group: 6, period: 4, block: 'd', shells: [2, 8, 13, 1], electronegativity: 1.66, gridRow: 4, gridCol: 6 },
  { atomicNumber: 25, symbol: 'Mn', name: 'Manganese', atomicMass: 54.938, category: 'transition-metal', group: 7, period: 4, block: 'd', shells: [2, 8, 13, 2], electronegativity: 1.55, gridRow: 4, gridCol: 7 },
  { atomicNumber: 26, symbol: 'Fe', name: 'Iron', atomicMass: 55.845, category: 'transition-metal', group: 8, period: 4, block: 'd', shells: [2, 8, 14, 2], electronegativity: 1.83, gridRow: 4, gridCol: 8 },
  { atomicNumber: 27, symbol: 'Co', name: 'Cobalt', atomicMass: 58.933, category: 'transition-metal', group: 9, period: 4, block: 'd', shells: [2, 8, 15, 2], electronegativity: 1.88, gridRow: 4, gridCol: 9 },
  { atomicNumber: 28, symbol: 'Ni', name: 'Nickel', atomicMass: 58.693, category: 'transition-metal', group: 10, period: 4, block: 'd', shells: [2, 8, 16, 2], electronegativity: 1.91, gridRow: 4, gridCol: 10 },
  { atomicNumber: 29, symbol: 'Cu', name: 'Copper', atomicMass: 63.546, category: 'transition-metal', group: 11, period: 4, block: 'd', shells: [2, 8, 18, 1], electronegativity: 1.90, gridRow: 4, gridCol: 11 },
  { atomicNumber: 30, symbol: 'Zn', name: 'Zinc', atomicMass: 65.38, category: 'transition-metal', group: 12, period: 4, block: 'd', shells: [2, 8, 18, 2], electronegativity: 1.65, gridRow: 4, gridCol: 12 },
  { atomicNumber: 31, symbol: 'Ga', name: 'Gallium', atomicMass: 69.723, category: 'post-transition-metal', group: 13, period: 4, block: 'p', shells: [2, 8, 18, 3], electronegativity: 1.81, gridRow: 4, gridCol: 13 },
  { atomicNumber: 32, symbol: 'Ge', name: 'Germanium', atomicMass: 72.630, category: 'metalloid', group: 14, period: 4, block: 'p', shells: [2, 8, 18, 4], electronegativity: 2.01, gridRow: 4, gridCol: 14 },
  { atomicNumber: 33, symbol: 'As', name: 'Arsenic', atomicMass: 74.922, category: 'metalloid', group: 15, period: 4, block: 'p', shells: [2, 8, 18, 5], electronegativity: 2.18, gridRow: 4, gridCol: 15 },
  { atomicNumber: 34, symbol: 'Se', name: 'Selenium', atomicMass: 78.971, category: 'nonmetal', group: 16, period: 4, block: 'p', shells: [2, 8, 18, 6], electronegativity: 2.55, gridRow: 4, gridCol: 16 },
  { atomicNumber: 35, symbol: 'Br', name: 'Bromine', atomicMass: 79.904, category: 'halogen', group: 17, period: 4, block: 'p', shells: [2, 8, 18, 7], electronegativity: 2.96, gridRow: 4, gridCol: 17 },
  { atomicNumber: 36, symbol: 'Kr', name: 'Krypton', atomicMass: 83.798, category: 'noble-gas', group: 18, period: 4, block: 'p', shells: [2, 8, 18, 8], electronegativity: 3.00, gridRow: 4, gridCol: 18 },
  { atomicNumber: 37, symbol: 'Rb', name: 'Rubidium', atomicMass: 85.468, category: 'alkali-metal', group: 1, period: 5, block: 's', shells: [2, 8, 18, 8, 1], electronegativity: 0.82, gridRow: 5, gridCol: 1 },
  { atomicNumber: 38, symbol: 'Sr', name: 'Strontium', atomicMass: 87.62, category: 'alkaline-earth-metal', group: 2, period: 5, block: 's', shells: [2, 8, 18, 8, 2], electronegativity: 0.95, gridRow: 5, gridCol: 2 },
  { atomicNumber: 39, symbol: 'Y', name: 'Yttrium', atomicMass: 88.906, category: 'transition-metal', group: 3, period: 5, block: 'd', shells: [2, 8, 18, 9, 2], electronegativity: 1.22, gridRow: 5, gridCol: 3 },
  { atomicNumber: 40, symbol: 'Zr', name: 'Zirconium', atomicMass: 91.224, category: 'transition-metal', group: 4, period: 5, block: 'd', shells: [2, 8, 18, 10, 2], electronegativity: 1.33, gridRow: 5, gridCol: 4 },
  { atomicNumber: 41, symbol: 'Nb', name: 'Niobium', atomicMass: 92.906, category: 'transition-metal', group: 5, period: 5, block: 'd', shells: [2, 8, 18, 12, 1], electronegativity: 1.60, gridRow: 5, gridCol: 5 },
  { atomicNumber: 42, symbol: 'Mo', name: 'Molybdenum', atomicMass: 95.95, category: 'transition-metal', group: 6, period: 5, block: 'd', shells: [2, 8, 18, 13, 1], electronegativity: 2.16, gridRow: 5, gridCol: 6 },
  { atomicNumber: 43, symbol: 'Tc', name: 'Technetium', atomicMass: 98, category: 'transition-metal', group: 7, period: 5, block: 'd', shells: [2, 8, 18, 13, 2], electronegativity: 1.90, gridRow: 5, gridCol: 7 },
  { atomicNumber: 44, symbol: 'Ru', name: 'Ruthenium', atomicMass: 101.07, category: 'transition-metal', group: 8, period: 5, block: 'd', shells: [2, 8, 18, 15, 1], electronegativity: 2.20, gridRow: 5, gridCol: 8 },
  { atomicNumber: 45, symbol: 'Rh', name: 'Rhodium', atomicMass: 102.906, category: 'transition-metal', group: 9, period: 5, block: 'd', shells: [2, 8, 18, 16, 1], electronegativity: 2.28, gridRow: 5, gridCol: 9 },
  { atomicNumber: 46, symbol: 'Pd', name: 'Palladium', atomicMass: 106.42, category: 'transition-metal', group: 10, period: 5, block: 'd', shells: [2, 8, 18, 18], electronegativity: 2.20, gridRow: 5, gridCol: 10 },
  { atomicNumber: 47, symbol: 'Ag', name: 'Silver', atomicMass: 107.868, category: 'transition-metal', group: 11, period: 5, block: 'd', shells: [2, 8, 18, 18, 1], electronegativity: 1.93, gridRow: 5, gridCol: 11 },
  { atomicNumber: 48, symbol: 'Cd', name: 'Cadmium', atomicMass: 112.414, category: 'transition-metal', group: 12, period: 5, block: 'd', shells: [2, 8, 18, 18, 2], electronegativity: 1.69, gridRow: 5, gridCol: 12 },
  { atomicNumber: 49, symbol: 'In', name: 'Indium', atomicMass: 114.818, category: 'post-transition-metal', group: 13, period: 5, block: 'p', shells: [2, 8, 18, 18, 3], electronegativity: 1.78, gridRow: 5, gridCol: 13 },
  { atomicNumber: 50, symbol: 'Sn', name: 'Tin', atomicMass: 118.710, category: 'post-transition-metal', group: 14, period: 5, block: 'p', shells: [2, 8, 18, 18, 4], electronegativity: 1.96, gridRow: 5, gridCol: 14 },
  { atomicNumber: 51, symbol: 'Sb', name: 'Antimony', atomicMass: 121.760, category: 'metalloid', group: 15, period: 5, block: 'p', shells: [2, 8, 18, 18, 5], electronegativity: 2.05, gridRow: 5, gridCol: 15 },
  { atomicNumber: 52, symbol: 'Te', name: 'Tellurium', atomicMass: 127.60, category: 'metalloid', group: 16, period: 5, block: 'p', shells: [2, 8, 18, 18, 6], electronegativity: 2.10, gridRow: 5, gridCol: 16 },
  { atomicNumber: 53, symbol: 'I', name: 'Iodine', atomicMass: 126.904, category: 'halogen', group: 17, period: 5, block: 'p', shells: [2, 8, 18, 18, 7], electronegativity: 2.66, gridRow: 5, gridCol: 17 },
  { atomicNumber: 54, symbol: 'Xe', name: 'Xenon', atomicMass: 131.293, category: 'noble-gas', group: 18, period: 5, block: 'p', shells: [2, 8, 18, 18, 8], electronegativity: 2.60, gridRow: 5, gridCol: 18 },
  { atomicNumber: 55, symbol: 'Cs', name: 'Caesium', atomicMass: 132.905, category: 'alkali-metal', group: 1, period: 6, block: 's', shells: [2, 8, 18, 18, 8, 1], electronegativity: 0.79, gridRow: 6, gridCol: 1 },
  { atomicNumber: 56, symbol: 'Ba', name: 'Barium', atomicMass: 137.327, category: 'alkaline-earth-metal', group: 2, period: 6, block: 's', shells: [2, 8, 18, 18, 8, 2], electronegativity: 0.89, gridRow: 6, gridCol: 2 },
  { atomicNumber: 57, symbol: 'La', name: 'Lanthanum', atomicMass: 138.905, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 18, 9, 2], electronegativity: 1.10, gridRow: 8, gridCol: 3 },
  { atomicNumber: 58, symbol: 'Ce', name: 'Cerium', atomicMass: 140.116, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 19, 9, 2], electronegativity: 1.12, gridRow: 8, gridCol: 4 },
  { atomicNumber: 59, symbol: 'Pr', name: 'Praseodymium', atomicMass: 140.908, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 21, 8, 2], electronegativity: 1.13, gridRow: 8, gridCol: 5 },
  { atomicNumber: 60, symbol: 'Nd', name: 'Neodymium', atomicMass: 144.243, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 22, 8, 2], electronegativity: 1.14, gridRow: 8, gridCol: 6 },
  { atomicNumber: 61, symbol: 'Pm', name: 'Promethium', atomicMass: 145, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 23, 8, 2], electronegativity: 1.13, gridRow: 8, gridCol: 7 },
  { atomicNumber: 62, symbol: 'Sm', name: 'Samarium', atomicMass: 150.36, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 24, 8, 2], electronegativity: 1.17, gridRow: 8, gridCol: 8 },
  { atomicNumber: 63, symbol: 'Eu', name: 'Europium', atomicMass: 151.964, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 25, 8, 2], electronegativity: 1.20, gridRow: 8, gridCol: 9 },
  { atomicNumber: 64, symbol: 'Gd', name: 'Gadolinium', atomicMass: 157.25, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 25, 9, 2], electronegativity: 1.20, gridRow: 8, gridCol: 10 },
  { atomicNumber: 65, symbol: 'Tb', name: 'Terbium', atomicMass: 158.925, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 27, 8, 2], electronegativity: 1.20, gridRow: 8, gridCol: 11 },
  { atomicNumber: 66, symbol: 'Dy', name: 'Dysprosium', atomicMass: 162.500, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 28, 8, 2], electronegativity: 1.22, gridRow: 8, gridCol: 12 },
  { atomicNumber: 67, symbol: 'Ho', name: 'Holmium', atomicMass: 164.930, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 29, 8, 2], electronegativity: 1.23, gridRow: 8, gridCol: 13 },
  { atomicNumber: 68, symbol: 'Er', name: 'Erbium', atomicMass: 167.259, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 30, 8, 2], electronegativity: 1.24, gridRow: 8, gridCol: 14 },
  { atomicNumber: 69, symbol: 'Tm', name: 'Thulium', atomicMass: 168.934, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 31, 8, 2], electronegativity: 1.25, gridRow: 8, gridCol: 15 },
  { atomicNumber: 70, symbol: 'Yb', name: 'Ytterbium', atomicMass: 173.045, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 32, 8, 2], electronegativity: 1.10, gridRow: 8, gridCol: 16 },
  { atomicNumber: 71, symbol: 'Lu', name: 'Lutetium', atomicMass: 174.967, category: 'lanthanide', group: null, period: 8, block: 'f', shells: [2, 8, 18, 32, 9, 2], electronegativity: 1.27, gridRow: 8, gridCol: 17 },
  { atomicNumber: 72, symbol: 'Hf', name: 'Hafnium', atomicMass: 178.49, category: 'transition-metal', group: 4, period: 6, block: 'd', shells: [2, 8, 18, 32, 10, 2], electronegativity: 1.30, gridRow: 6, gridCol: 4 },
  { atomicNumber: 73, symbol: 'Ta', name: 'Tantalum', atomicMass: 180.948, category: 'transition-metal', group: 5, period: 6, block: 'd', shells: [2, 8, 18, 32, 11, 2], electronegativity: 1.50, gridRow: 6, gridCol: 5 },
  { atomicNumber: 74, symbol: 'W', name: 'Tungsten', atomicMass: 183.84, category: 'transition-metal', group: 6, period: 6, block: 'd', shells: [2, 8, 18, 32, 12, 2], electronegativity: 2.36, gridRow: 6, gridCol: 6 },
  { atomicNumber: 75, symbol: 'Re', name: 'Rhenium', atomicMass: 186.207, category: 'transition-metal', group: 7, period: 6, block: 'd', shells: [2, 8, 18, 32, 13, 2], electronegativity: 1.90, gridRow: 6, gridCol: 7 },
  { atomicNumber: 76, symbol: 'Os', name: 'Osmium', atomicMass: 190.23, category: 'transition-metal', group: 8, period: 6, block: 'd', shells: [2, 8, 18, 32, 14, 2], electronegativity: 2.20, gridRow: 6, gridCol: 8 },
  { atomicNumber: 77, symbol: 'Ir', name: 'Iridium', atomicMass: 192.217, category: 'transition-metal', group: 9, period: 6, block: 'd', shells: [2, 8, 18, 32, 15, 2], electronegativity: 2.20, gridRow: 6, gridCol: 9 },
  { atomicNumber: 78, symbol: 'Pt', name: 'Platinum', atomicMass: 195.084, category: 'transition-metal', group: 10, period: 6, block: 'd', shells: [2, 8, 18, 32, 17, 1], electronegativity: 2.28, gridRow: 6, gridCol: 10 },
  { atomicNumber: 79, symbol: 'Au', name: 'Gold', atomicMass: 196.967, category: 'transition-metal', group: 11, period: 6, block: 'd', shells: [2, 8, 18, 32, 18, 1], electronegativity: 2.54, gridRow: 6, gridCol: 11 },
  { atomicNumber: 80, symbol: 'Hg', name: 'Mercury', atomicMass: 200.592, category: 'transition-metal', group: 12, period: 6, block: 'd', shells: [2, 8, 18, 32, 18, 2], electronegativity: 2.00, gridRow: 6, gridCol: 12 },
  { atomicNumber: 81, symbol: 'Tl', name: 'Thallium', atomicMass: 204.38, category: 'post-transition-metal', group: 13, period: 6, block: 'p', shells: [2, 8, 18, 32, 18, 3], electronegativity: 1.80, gridRow: 6, gridCol: 13 },
  { atomicNumber: 82, symbol: 'Pb', name: 'Lead', atomicMass: 207.2, category: 'post-transition-metal', group: 14, period: 6, block: 'p', shells: [2, 8, 18, 32, 18, 4], electronegativity: 2.33, gridRow: 6, gridCol: 14 },
  { atomicNumber: 83, symbol: 'Bi', name: 'Bismuth', atomicMass: 208.980, category: 'post-transition-metal', group: 15, period: 6, block: 'p', shells: [2, 8, 18, 32, 18, 5], electronegativity: 2.02, gridRow: 6, gridCol: 15 },
  { atomicNumber: 84, symbol: 'Po', name: 'Polonium', atomicMass: 209, category: 'post-transition-metal', group: 16, period: 6, block: 'p', shells: [2, 8, 18, 32, 18, 6], electronegativity: 2.00, gridRow: 6, gridCol: 16 },
  { atomicNumber: 85, symbol: 'At', name: 'Astatine', atomicMass: 210, category: 'halogen', group: 17, period: 6, block: 'p', shells: [2, 8, 18, 32, 18, 7], electronegativity: 2.20, gridRow: 6, gridCol: 17 },
  { atomicNumber: 86, symbol: 'Rn', name: 'Radon', atomicMass: 222, category: 'noble-gas', group: 18, period: 6, block: 'p', shells: [2, 8, 18, 32, 18, 8], electronegativity: null, gridRow: 6, gridCol: 18 },
  { atomicNumber: 87, symbol: 'Fr', name: 'Francium', atomicMass: 223, category: 'alkali-metal', group: 1, period: 7, block: 's', shells: [2, 8, 18, 32, 18, 8, 1], electronegativity: 0.70, gridRow: 7, gridCol: 1 },
  { atomicNumber: 88, symbol: 'Ra', name: 'Radium', atomicMass: 226, category: 'alkaline-earth-metal', group: 2, period: 7, block: 's', shells: [2, 8, 18, 32, 18, 8, 2], electronegativity: 0.90, gridRow: 7, gridCol: 2 },
  { atomicNumber: 89, symbol: 'Ac', name: 'Actinium', atomicMass: 227, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 18, 9, 2], electronegativity: 1.10, gridRow: 9, gridCol: 3 },
  { atomicNumber: 90, symbol: 'Th', name: 'Thorium', atomicMass: 232.038, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 18, 10, 2], electronegativity: 1.30, gridRow: 9, gridCol: 4 },
  { atomicNumber: 91, symbol: 'Pa', name: 'Protactinium', atomicMass: 231.036, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 20, 9, 2], electronegativity: 1.50, gridRow: 9, gridCol: 5 },
  { atomicNumber: 92, symbol: 'U', name: 'Uranium', atomicMass: 238.029, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 21, 9, 2], electronegativity: 1.38, gridRow: 9, gridCol: 6 },
  { atomicNumber: 93, symbol: 'Np', name: 'Neptunium', atomicMass: 237, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 22, 9, 2], electronegativity: 1.36, gridRow: 9, gridCol: 7 },
  { atomicNumber: 94, symbol: 'Pu', name: 'Plutonium', atomicMass: 244, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 24, 8, 2], electronegativity: 1.28, gridRow: 9, gridCol: 8 },
  { atomicNumber: 95, symbol: 'Am', name: 'Americium', atomicMass: 243, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 25, 8, 2], electronegativity: 1.30, gridRow: 9, gridCol: 9 },
  { atomicNumber: 96, symbol: 'Cm', name: 'Curium', atomicMass: 247, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 25, 9, 2], electronegativity: 1.30, gridRow: 9, gridCol: 10 },
  { atomicNumber: 97, symbol: 'Bk', name: 'Berkelium', atomicMass: 247, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 27, 8, 2], electronegativity: 1.30, gridRow: 9, gridCol: 11 },
  { atomicNumber: 98, symbol: 'Cf', name: 'Californium', atomicMass: 251, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 28, 8, 2], electronegativity: 1.30, gridRow: 9, gridCol: 12 },
  { atomicNumber: 99, symbol: 'Es', name: 'Einsteinium', atomicMass: 252, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 29, 8, 2], electronegativity: 1.30, gridRow: 9, gridCol: 13 },
  { atomicNumber: 100, symbol: 'Fm', name: 'Fermium', atomicMass: 257, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 30, 8, 2], electronegativity: 1.30, gridRow: 9, gridCol: 14 },
  { atomicNumber: 101, symbol: 'Md', name: 'Mendelevium', atomicMass: 258, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 31, 8, 2], electronegativity: 1.30, gridRow: 9, gridCol: 15 },
  { atomicNumber: 102, symbol: 'No', name: 'Nobelium', atomicMass: 259, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 32, 8, 2], electronegativity: 1.30, gridRow: 9, gridCol: 16 },
  { atomicNumber: 103, symbol: 'Lr', name: 'Lawrencium', atomicMass: 266, category: 'actinide', group: null, period: 9, block: 'f', shells: [2, 8, 18, 32, 32, 8, 3], electronegativity: 1.30, gridRow: 9, gridCol: 17 },
  { atomicNumber: 104, symbol: 'Rf', name: 'Rutherfordium', atomicMass: 267, category: 'transition-metal', group: 4, period: 7, block: 'd', shells: [2, 8, 18, 32, 32, 10, 2], electronegativity: null, gridRow: 7, gridCol: 4 },
  { atomicNumber: 105, symbol: 'Db', name: 'Dubnium', atomicMass: 268, category: 'transition-metal', group: 5, period: 7, block: 'd', shells: [2, 8, 18, 32, 32, 11, 2], electronegativity: null, gridRow: 7, gridCol: 5 },
  { atomicNumber: 106, symbol: 'Sg', name: 'Seaborgium', atomicMass: 269, category: 'transition-metal', group: 6, period: 7, block: 'd', shells: [2, 8, 18, 32, 32, 12, 2], electronegativity: null, gridRow: 7, gridCol: 6 },
  { atomicNumber: 107, symbol: 'Bh', name: 'Bohrium', atomicMass: 270, category: 'transition-metal', group: 7, period: 7, block: 'd', shells: [2, 8, 18, 32, 32, 13, 2], electronegativity: null, gridRow: 7, gridCol: 7 },
  { atomicNumber: 108, symbol: 'Hs', name: 'Hassium', atomicMass: 277, category: 'transition-metal', group: 8, period: 7, block: 'd', shells: [2, 8, 18, 32, 32, 14, 2], electronegativity: null, gridRow: 7, gridCol: 8 },
  { atomicNumber: 109, symbol: 'Mt', name: 'Meitnerium', atomicMass: 278, category: 'transition-metal', group: 9, period: 7, block: 'd', shells: [2, 8, 18, 32, 32, 15, 2], electronegativity: null, gridRow: 7, gridCol: 9 },
  { atomicNumber: 110, symbol: 'Ds', name: 'Darmstadtium', atomicMass: 281, category: 'transition-metal', group: 10, period: 7, block: 'd', shells: [2, 8, 18, 32, 32, 16, 2], electronegativity: null, gridRow: 7, gridCol: 10 },
  { atomicNumber: 111, symbol: 'Rg', name: 'Roentgenium', atomicMass: 282, category: 'transition-metal', group: 11, period: 7, block: 'd', shells: [2, 8, 18, 32, 32, 17, 2], electronegativity: null, gridRow: 7, gridCol: 11 },
  { atomicNumber: 112, symbol: 'Cn', name: 'Copernicium', atomicMass: 285, category: 'transition-metal', group: 12, period: 7, block: 'd', shells: [2, 8, 18, 32, 32, 18, 2], electronegativity: null, gridRow: 7, gridCol: 12 },
  { atomicNumber: 113, symbol: 'Nh', name: 'Nihonium', atomicMass: 286, category: 'post-transition-metal', group: 13, period: 7, block: 'p', shells: [2, 8, 18, 32, 32, 18, 3], electronegativity: null, gridRow: 7, gridCol: 13 },
  { atomicNumber: 114, symbol: 'Fl', name: 'Flerovium', atomicMass: 289, category: 'post-transition-metal', group: 14, period: 7, block: 'p', shells: [2, 8, 18, 32, 32, 18, 4], electronegativity: null, gridRow: 7, gridCol: 14 },
  { atomicNumber: 115, symbol: 'Mc', name: 'Moscovium', atomicMass: 290, category: 'post-transition-metal', group: 15, period: 7, block: 'p', shells: [2, 8, 18, 32, 32, 18, 5], electronegativity: null, gridRow: 7, gridCol: 15 },
  { atomicNumber: 116, symbol: 'Lv', name: 'Livermorium', atomicMass: 293, category: 'post-transition-metal', group: 16, period: 7, block: 'p', shells: [2, 8, 18, 32, 32, 18, 6], electronegativity: null, gridRow: 7, gridCol: 16 },
  { atomicNumber: 117, symbol: 'Ts', name: 'Tennessine', atomicMass: 294, category: 'halogen', group: 17, period: 7, block: 'p', shells: [2, 8, 18, 32, 32, 18, 7], electronegativity: null, gridRow: 7, gridCol: 17 },
  { atomicNumber: 118, symbol: 'Og', name: 'Oganesson', atomicMass: 294, category: 'noble-gas', group: 18, period: 7, block: 'p', shells: [2, 8, 18, 32, 32, 18, 8], electronegativity: null, gridRow: 7, gridCol: 18 },
]
