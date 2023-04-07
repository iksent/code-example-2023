import { createContext, useContext } from 'react'
import {
  HAS_SYSTEM_THEME_DEFAULT,
  THEMES,
  THEMES_LIST,
  ThemesList,
} from 'Core/store/theming/utils'
import { ThemedColors } from 'Core/utils/theming'

export type ResultTheme = 'base' | 'dark' | string
export type Theme = 'auto' | ResultTheme

export type ThemingContextValue = {
  themesList: ThemesList
  customThemedColors: ThemedColors | undefined
  isSystemTheme: boolean
  resultTheme: ResultTheme
  onChangeTheme: (newTheme: Theme) => void
  hasSystemTheme: boolean
}

export const ThemingContext = createContext<ThemingContextValue>({
  themesList: THEMES_LIST,
  customThemedColors: {},
  isSystemTheme: true,
  resultTheme: THEMES.base,
  onChangeTheme: () => undefined,
  hasSystemTheme: HAS_SYSTEM_THEME_DEFAULT,
})

export function useThemingContext() {
  const context = useContext(ThemingContext)

  if (!context) {
    throw new Error('useThemingContext must be used within a ThemingProvider')
  }

  return context
}
