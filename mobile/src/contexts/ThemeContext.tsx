import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useColorScheme as useRNColorScheme } from 'react-native'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  isDark: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = '@clockio_theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useRNColorScheme()
  const [theme, setThemeState] = useState<Theme>('light') // Default to light mode for FounderOps

  // Determine if dark mode is active
  const isDark = theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark')

  // Load saved theme preference
  useEffect(() => {
    loadTheme()
  }, [])

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY)
      if (
        savedTheme &&
        (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')
      ) {
        setThemeState(savedTheme as Theme)
      }
    } catch (error) {
      console.error('Failed to load theme:', error)
    }
  }

  const setTheme = async (newTheme: Theme) => {
    try {
      setThemeState(newTheme)
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme)
    } catch (error) {
      console.error('Failed to save theme:', error)
    }
  }

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
