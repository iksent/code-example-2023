import React, { useCallback, useState } from 'react'
import Button, { ButtonProps } from 'Core/components/Button/Button'
import { TelegramCircleInverseIconSvg } from 'Core/components/SvgIcon/TelegramIcon'
import { useInnerTranslation } from 'Core/config/i18n/i18n'
import { makeAuthorizedRedirect, useAuthData, useAuthDialog } from 'Api/hooks/auth'
import { OpenAPI, UsersService } from 'Api'
import { useRouter } from 'next/router'
import { COOKIES } from 'Core/utils/cookies'

export type LoginButtonProps = ButtonProps

const LoginButton = (props: LoginButtonProps) => {
  const T = useInnerTranslation('main', 'auth')
  const { isFetching, login } = useLogin()

  return (
    <Button
      title={T('login')}
      {...props}
      isFetching={isFetching}
      onClick={login}
      iconEnd={TelegramCircleInverseIconSvg}
    />
  )
}

export const useLogin = () => {
  const authDialog = useAuthDialog()
  const { notAuthorized } = useAuthData()
  const [isFetching, setIsFetching] = useState(false)
  const { pathname } = useRouter()
  const isHomepage = pathname === '/'

  const login = useCallback(async () => {
    let isAuthorized = !notAuthorized

    if (isHomepage) {
      try {
        // We need to override server side caching
        setIsFetching(true)
        OpenAPI.TOKEN = COOKIES.apiKey.get()
        const result = await UsersService.getMeApiPublicUsersMeGet()
        setIsFetching(false)
        if (result?.id) {
          isAuthorized = true
        }
      } catch (e) {
        setIsFetching(false)
      }
    }

    if (isAuthorized) {
      makeAuthorizedRedirect(true)
    } else {
      authDialog()
    }
  }, [authDialog, isHomepage, notAuthorized])

  return { login, isFetching }
}

export default LoginButton
