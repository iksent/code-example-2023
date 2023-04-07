import { useCallback, useEffect, useMemo, useState } from 'react'
import { Moon, Sun } from 'react-feather'
import { NextPageContext } from 'next'
import { isNil } from 'lodash'
import { COOKIES } from 'Core/utils/cookies'
import { useTranslation } from 'Core/config/i18n/i18n'
import { ResultTheme, Theme } from 'Core/store/theming/context'
import { SvgIconType } from 'Core/components/SvgIcon/SvgIcon'

export const THEMES: Record<string, Theme> = {
  auto: 'auto',
  base: 'base',
  dark: 'dark',
}

export type ThemeListItem = {
  id: Theme
  title?: boolean
  isDefaultBase?: boolean
  isDefaultDark?: boolean
  tooltip?: boolean
  Icon?: SvgIconType
}

export type ThemesList = Array<ThemeListItem>

export const THEMES_LIST: ThemesList = [
  {
    id: THEMES.auto,
    title: true,
  },
  {
    id: THEMES.base,
    tooltip: true,
    isDefaultBase: true,
    Icon: Sun,
  },
  {
    id: THEMES.dark,
    tooltip: true,
    isDefaultDark: true,
    Icon: Moon,
  },
]

export const useThemesList = (themesList?: ThemesList) => {
  const [t] = useTranslation()
  return useMemo(
    () =>
      (themesList ?? THEMES_LIST).map((i) => ({
        ...i,
        title: i.title ? t(`themes.${i.id}`) : '',
        tooltip: i.tooltip ? t(`themes.${i.id}`) : '',
      })),
    [t, themesList],
  )
}

export const isCorrectTheme = (
  theme: string | null | undefined,
  themesList?: ThemesList,
) => {
  return theme
    ? (themesList || THEMES_LIST).some((i) => i.id === theme && i.id !== THEMES.auto)
    : false
}

export const getDefaultTheme = (themesList: ThemesList) => {
  return themesList.filter((i) => i.id !== THEMES.auto)?.[0]?.id
}

export const withDefaultTheme = (
  theme: string | null | undefined,
  themesList?: ThemesList,
): Theme => {
  if (isCorrectTheme(theme, themesList)) {
    return theme ?? THEMES.base
  } else {
    const defaultTheme = themesList ? getDefaultTheme(themesList) : undefined
    return defaultTheme ?? THEMES.base
  }
}

export const getSavedTheme = (ctx: NextPageContext, themesList?: ThemesList) => {
  return withDefaultTheme(COOKIES.theme.get(ctx), themesList)
}

export const getInitialIsSystem = (ctx: NextPageContext) => {
  const value = COOKIES.isSystemTheme.get(ctx)
  return value === true || isNil(value)
}

export const getInitialIsEditorAuthorized = (ctx: NextPageContext) => {
  const value = COOKIES.custom.get('isAuthEditor', ctx)
  return Boolean(value)
}

export const getThemeClassName = (theme: string) => `theme-${theme}`

export const HAS_SYSTEM_THEME_DEFAULT = true

export const useSystemTheme = (initialTheme: ResultTheme, themesList: ThemesList) => {
  const [systemTheme, setSystemTheme] = useState<ResultTheme>(initialTheme)
  const [hasSystemTheme, setHasSystemTheme] = useState(HAS_SYSTEM_THEME_DEFAULT)

  const getMatchMedia = useCallback(
    () => window.matchMedia?.('(prefers-color-scheme: dark)'),
    [],
  )

  const getValue = useCallback(
    (matches: boolean) => {
      return (
        (matches
          ? themesList.find((i) => i.isDefaultDark)?.id
          : themesList.find((i) => i.isDefaultBase)?.id) || getDefaultTheme(themesList)
      )
    },
    [themesList],
  )

  useEffect(() => {
    const matchMedia = getMatchMedia()
    setHasSystemTheme(Boolean(matchMedia))
    if (matchMedia) {
      setSystemTheme(getValue(matchMedia.matches))

      const mediaChangeHandler = (e: MediaQueryListEvent) => {
        setSystemTheme(getValue(e.matches))
      }

      if (matchMedia.addEventListener) {
        matchMedia.addEventListener('change', mediaChangeHandler)
      } else {
        matchMedia.addListener(mediaChangeHandler)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { systemTheme, hasSystemTheme }
}
