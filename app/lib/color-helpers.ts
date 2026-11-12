export function generateColorBasedOnCategory(category: string) {
  switch (category) {
    case 'alkali metal':
      return 'bg-red-400 dark:bg-red-600';
    case 'alkaline earth metal':
      return 'bg-pink-200 dark:bg-pink-500';
    case 'transition metal':
      return 'bg-yellow-200 dark:bg-yellow-600';
    case 'post-transition metal':
      return 'bg-orange-200 dark:bg-orange-400';
    case 'metalloid':
      return 'bg-green-200 dark:bg-green-600';
    case 'diatomic nonmetal':
      return 'bg-green-200';
    case 'polyatomic nonmetal':
    // added for data-v2 compatibility
    case 'reactive nonmetal':
      return 'bg-blue-300 dark:bg-blue-700';
    case 'noble gas':
      return 'bg-violet-400 dark:bg-violet-600';
    case 'lanthanide':
      return 'bg-emerald-400 dark:bg-emerald-700';
    case 'actinide':
      return 'bg-teal-200 dark:bg-teal-500';
    case 'unknown':
    default:
      return 'bg-zinc-300 dark:bg-zinc-600';
  }
}
