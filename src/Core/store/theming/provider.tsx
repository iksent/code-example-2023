import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { StringParam, useQueryParam } from 'next-query-params'
import { useHtmlClassName } from 'Core/utils/useHtmlClassName'
import { COOKIES } from 'Core/utils/cookies'
import { ThemedColors } from 'Core/utils/theming'
import {
  getDefaultTheme,
  getThemeClassName,
  isCorrectTheme,
  THEMES,
  THEMES_LIST,
  ThemesList,
  useSystemTheme,
} from './utils'
import { ResultTheme, Theme, ThemingContext } from './context'

export type ThemingProviderProps = {
  children: ReactNode
  initialIsSystem: boolean
  initialTheme: ResultTheme
  themesList?: ThemesList
  customThemedColors?: ThemedColors
}

export function ThemingProvider(props: ThemingProviderProps) {
  const {
    initialIsSystem,
    initialTheme,
    themesList = THEMES_LIST,
    customThemedColors,
  } = props
  const { systemTheme, hasSystemTheme } = useSystemTheme(initialTheme, themesList)
  const [isSystemTheme, setIsSystemTheme] = useState<boolean>(initialIsSystem)
  const [currentTheme, setCurrentTheme] = useState<ResultTheme>(initialTheme)
  const [initialThemeParam, setInitialThemeParam] = useQueryParam(
    'use_theme',
    StringParam,
  )

  const resultTheme = isSystemTheme && hasSystemTheme ? systemTheme : currentTheme
  useHtmlClassName(getThemeClassName(resultTheme))

  const onChangeTheme = useCallback((newTheme: Theme) => {
    if (newTheme === THEMES.auto) {
      setIsSystemTheme(true)
    } else {
      setIsSystemTheme(false)
      setCurrentTheme(newTheme)
    }
  }, [])

  useEffect(() => {
    COOKIES.theme.set(resultTheme)
  }, [resultTheme])

  useEffect(() => {
    COOKIES.isSystemTheme.set(isSystemTheme)
  }, [isSystemTheme])

  useEffect(() => {
    if (!hasSystemTheme && isSystemTheme) {
      onChangeTheme(getDefaultTheme(themesList))
    }
  }, [hasSystemTheme, isSystemTheme, onChangeTheme, themesList])

  useEffect(() => {
    if (initialThemeParam) {
      if (isCorrectTheme(initialThemeParam)) {
        setTimeout(() => {
          onChangeTheme(initialThemeParam)
        }, 1000)
      }
      setInitialThemeParam(undefined, 'replaceIn')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(
    () => ({
      isSystemTheme,
      resultTheme,
      onChangeTheme,
      hasSystemTheme,
      themesList,
      customThemedColors,
    }),
    [
      isSystemTheme,
      resultTheme,
      onChangeTheme,
      hasSystemTheme,
      themesList,
      customThemedColors,
    ],
  )

  return <ThemingContext.Provider {...props} value={value} />
}
