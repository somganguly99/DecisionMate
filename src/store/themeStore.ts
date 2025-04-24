import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage',
      skipHydration: true,
    }
  )
);

// Initialize theme on load
const initializeTheme = () => {
  const isDark = useThemeStore.getState().isDarkMode;
  document.documentElement.classList.toggle('dark', isDark);
};

if (typeof window !== 'undefined') {
  initializeTheme();
}
