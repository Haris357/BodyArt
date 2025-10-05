export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  gradient: string;
  gradientHover: string;
}

export const predefinedThemes: ColorTheme[] = [
  {
    id: 'orange-red',
    name: 'Orange & Red (Default)',
    primary: '#f97316', // orange-500
    primaryHover: '#ea580c', // orange-600
    primaryLight: '#fed7aa', // orange-200
    primaryDark: '#c2410c', // orange-700
    gradient: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
    gradientHover: 'linear-gradient(135deg, #ea580c 0%, #b91c1c 100%)'
  },
  {
    id: 'blue-purple',
    name: 'Blue & Purple',
    primary: '#3b82f6', // blue-500
    primaryHover: '#2563eb', // blue-600
    primaryLight: '#bfdbfe', // blue-200
    primaryDark: '#1d4ed8', // blue-700
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    gradientHover: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
  },
  {
    id: 'green-teal',
    name: 'Green & Teal',
    primary: '#10b981', // emerald-500
    primaryHover: '#059669', // emerald-600
    primaryLight: '#a7f3d0', // emerald-200
    primaryDark: '#047857', // emerald-700
    gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
    gradientHover: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)'
  },
  {
    id: 'purple-pink',
    name: 'Purple & Pink',
    primary: '#8b5cf6', // violet-500
    primaryHover: '#7c3aed', // violet-600
    primaryLight: '#ddd6fe', // violet-200
    primaryDark: '#6d28d9', // violet-700
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    gradientHover: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)'
  },
  {
    id: 'red-rose',
    name: 'Red & Rose',
    primary: '#ef4444', // red-500
    primaryHover: '#dc2626', // red-600
    primaryLight: '#fecaca', // red-200
    primaryDark: '#b91c1c', // red-700
    gradient: 'linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)',
    gradientHover: 'linear-gradient(135deg, #dc2626 0%, #e11d48 100%)'
  },
  {
    id: 'indigo-blue',
    name: 'Indigo & Blue',
    primary: '#6366f1', // indigo-500
    primaryHover: '#4f46e5', // indigo-600
    primaryLight: '#c7d2fe', // indigo-200
    primaryDark: '#4338ca', // indigo-700
    gradient: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
    gradientHover: 'linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)'
  },
  {
    id: 'cyan-blue',
    name: 'Cyan & Blue',
    primary: '#06b6d4', // cyan-500
    primaryHover: '#0891b2', // cyan-600
    primaryLight: '#a5f3fc', // cyan-200
    primaryDark: '#0e7490', // cyan-700
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    gradientHover: 'linear-gradient(135deg, #0891b2 0%, #2563eb 100%)'
  },
  {
    id: 'amber-orange',
    name: 'Amber & Orange',
    primary: '#f59e0b', // amber-500
    primaryHover: '#d97706', // amber-600
    primaryLight: '#fde68a', // amber-200
    primaryDark: '#b45309', // amber-700
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    gradientHover: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)'
  },
  {
    id: 'lime-green',
    name: 'Lime & Green',
    primary: '#84cc16', // lime-500
    primaryHover: '#65a30d', // lime-600
    primaryLight: '#d9f99d', // lime-200
    primaryDark: '#4d7c0f', // lime-700
    gradient: 'linear-gradient(135deg, #84cc16 0%, #22c55e 100%)',
    gradientHover: 'linear-gradient(135deg, #65a30d 0%, #16a34a 100%)'
  },
  {
    id: 'pink-rose',
    name: 'Pink & Rose',
    primary: '#ec4899', // pink-500
    primaryHover: '#db2777', // pink-600
    primaryLight: '#fbcfe8', // pink-200
    primaryDark: '#be185d', // pink-700
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    gradientHover: 'linear-gradient(135deg, #db2777 0%, #e11d48 100%)'
  },
  {
    id: 'slate-gray',
    name: 'Slate & Gray',
    primary: '#64748b', // slate-500
    primaryHover: '#475569', // slate-600
    primaryLight: '#cbd5e1', // slate-200
    primaryDark: '#334155', // slate-700
    gradient: 'linear-gradient(135deg, #64748b 0%, #6b7280 100%)',
    gradientHover: 'linear-gradient(135deg, #475569 0%, #4b5563 100%)'
  },
  {
    id: 'emerald-mint',
    name: 'Emerald & Mint',
    primary: '#10b981', // emerald-500
    primaryHover: '#059669', // emerald-600
    primaryLight: '#a7f3d0', // emerald-200
    primaryDark: '#047857', // emerald-700
    gradient: 'linear-gradient(135deg, #10b981 0%, #06d6a0 100%)',
    gradientHover: 'linear-gradient(135deg, #059669 0%, #05c085 100%)'
  },
  {
    id: 'violet-purple',
    name: 'Violet & Purple',
    primary: '#8b5cf6', // violet-500
    primaryHover: '#7c3aed', // violet-600
    primaryLight: '#ddd6fe', // violet-200
    primaryDark: '#6d28d9', // violet-700
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
    gradientHover: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)'
  },
  {
    id: 'teal-cyan',
    name: 'Teal & Cyan',
    primary: '#14b8a6', // teal-500
    primaryHover: '#0d9488', // teal-600
    primaryLight: '#99f6e4', // teal-200
    primaryDark: '#0f766e', // teal-700
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
    gradientHover: 'linear-gradient(135deg, #0d9488 0%, #0891b2 100%)'
  },
  {
    id: 'yellow-amber',
    name: 'Yellow & Amber',
    primary: '#eab308', // yellow-500
    primaryHover: '#ca8a04', // yellow-600
    primaryLight: '#fef08a', // yellow-200
    primaryDark: '#a16207', // yellow-700
    gradient: 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)',
    gradientHover: 'linear-gradient(135deg, #ca8a04 0%, #d97706 100%)'
  },
  {
    id: 'sky-blue',
    name: 'Sky & Blue',
    primary: '#0ea5e9', // sky-500
    primaryHover: '#0284c7', // sky-600
    primaryLight: '#bae6fd', // sky-200
    primaryDark: '#0369a1', // sky-700
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
    gradientHover: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)'
  },
  {
    id: 'fuchsia-pink',
    name: 'Fuchsia & Pink',
    primary: '#d946ef', // fuchsia-500
    primaryHover: '#c026d3', // fuchsia-600
    primaryLight: '#f5d0fe', // fuchsia-200
    primaryDark: '#a21caf', // fuchsia-700
    gradient: 'linear-gradient(135deg, #d946ef 0%, #ec4899 100%)',
    gradientHover: 'linear-gradient(135deg, #c026d3 0%, #db2777 100%)'
  },
  {
    id: 'rose-red',
    name: 'Rose & Red',
    primary: '#f43f5e', // rose-500
    primaryHover: '#e11d48', // rose-600
    primaryLight: '#fecdd3', // rose-200
    primaryDark: '#be123c', // rose-700
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #ef4444 100%)',
    gradientHover: 'linear-gradient(135deg, #e11d48 0%, #dc2626 100%)'
  },
  {
    id: 'stone-neutral',
    name: 'Stone & Neutral',
    primary: '#78716c', // stone-500
    primaryHover: '#57534e', // stone-600
    primaryLight: '#d6d3d1', // stone-200
    primaryDark: '#44403c', // stone-700
    gradient: 'linear-gradient(135deg, #78716c 0%, #737373 100%)',
    gradientHover: 'linear-gradient(135deg, #57534e 0%, #525252 100%)'
  },
  {
    id: 'zinc-gray',
    name: 'Zinc & Gray',
    primary: '#71717a', // zinc-500
    primaryHover: '#52525b', // zinc-600
    primaryLight: '#d4d4d8', // zinc-200
    primaryDark: '#3f3f46', // zinc-700
    gradient: 'linear-gradient(135deg, #71717a 0%, #6b7280 100%)',
    gradientHover: 'linear-gradient(135deg, #52525b 0%, #4b5563 100%)'
  }
];

export const getThemeById = (id: string): ColorTheme => {
  return predefinedThemes.find(theme => theme.id === id) || predefinedThemes[0];
};

export const applyThemeToDocument = (theme: ColorTheme) => {
  const root = document.documentElement;
  
  // Apply CSS custom properties
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-primary-hover', theme.primaryHover);
  root.style.setProperty('--theme-primary-light', theme.primaryLight);
  root.style.setProperty('--theme-primary-dark', theme.primaryDark);
  root.style.setProperty('--theme-gradient', theme.gradient);
  root.style.setProperty('--theme-gradient-hover', theme.gradientHover);
};