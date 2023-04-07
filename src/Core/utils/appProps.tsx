import { ReactNode } from 'react'
import App, { AppContext, AppProps } from 'next/app'
import { DehydratedState } from 'react-query/types/hydration/hydration'
import {
  getInitialIsEditorAuthorized,
  getInitialIsSystem,
  getSavedTheme,
  ThemesList,
} from 'Core/store/theming/utils'
import { ResultTheme } from 'Core/store/theming/context'
import { EmotionCache } from '@emotion/cache'

export type ResultAppProps = Override<
  AppProps,
  {
    pageProps: {
      dehydratedState: DehydratedState
      children: ReactNode
    }
    appState: DehydratedState
    userAgent: string
    initialTheme: ResultTheme
    initialIsSystem: boolean
    initialIsEditorAuthorized: boolean
    emotionCache?: EmotionCache
  }
>

export async function getAppProps(appContext: AppContext, themesList?: ThemesList) {
  const {
    ctx,
    ctx: { req },
    router: { locale, defaultLocale },
  } = appContext

  let userAgent
  if (req) {
    userAgent = req.headers['user-agent']
  } else {
    userAgent = navigator?.userAgent
  }

  const initialTheme = getSavedTheme(ctx, themesList)
  const initialIsSystem = getInitialIsSystem(ctx)
  const initialIsEditorAuthorized = getInitialIsEditorAuthorized(ctx)

  const appProps = await App.getInitialProps({
    ...appContext,
    ctx: {
      ...ctx,
      // @ts-ignore Locale is required for pages' getInitialProps
      locale,
      defaultLocale,
    },
  })

  return {
    ...appProps,
    userAgent,
    initialTheme,
    initialIsSystem,
    initialIsEditorAuthorized,
  }
}
