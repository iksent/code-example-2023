import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import { UseStateFn } from 'Core/utils/types'
import { NavMenuContext } from './context'

export type NavMenuProviderProps = {
  children: ReactNode
}

export type NavMenuContextValue = {
  navMenuOpen: boolean
  setNavMenuOpen: UseStateFn<boolean>
  toggleNavMenu: () => void
}

export function NavMenuProvider(props: NavMenuProviderProps) {
  const [navMenuOpen, setNavMenuOpen] = useState(false)

  const toggleNavMenu = useCallback(() => setNavMenuOpen((p) => !p), [])

  const value = useMemo<NavMenuContextValue>(
    () => ({
      navMenuOpen,
      setNavMenuOpen,
      toggleNavMenu,
    }),
    [navMenuOpen, toggleNavMenu],
  )

  return <NavMenuContext.Provider {...props} value={value} />
}
