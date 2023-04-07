import { useCallback, useMemo } from 'react'
import _useTranslation from 'next-translate/useTranslation'
import { Translate, TranslationQuery } from 'next-translate'
import setLanguage from 'next-translate/setLanguage'
import moment from 'moment'

export type TranslateOptions = {
  returnObjects?: boolean
  fallback?: string | string[]
}

export const useTranslation = (defaultNs = 'common'): [Translate, string] => {
  const { t, lang } = _useTranslation(defaultNs)
  const T = useMemo(() => t, [lang]) // Bug: https://github.com/vinissimus/next-translate/issues/447
  return [T, lang]
}

export const useInnerTranslation = (ns: string, parentKey: string): Translate => {
  const [t] = useTranslation(ns)

  return useCallback(
    (
      key: string | TemplateStringsArray,
      query?: TranslationQuery | null,
      options?: TranslateOptions,
    ) => {
      return t(`${parentKey}.${typeof key === 'string' ? key : ''}`, query, options)
    },
    [t, parentKey],
  )
}

export const setLocale = (newLocale: string) => {
  moment.locale(newLocale)
  void setLanguage(newLocale)
}

export const useMomentClientInitialization = (locale: string | undefined) => {
  if (locale && moment.locale() !== locale) {
    moment.locale(locale)
  }
}
