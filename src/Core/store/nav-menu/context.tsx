import { createContext, useContext } from 'react'
import { NavMenuContextValue } from './provider'

export const NavMenuContext = createContext<NavMenuContextValue>({
  navMenuOpen: false,
  setNavMenuOpen: () => null,
  toggleNavMenu: () => undefined,
})

export function useNavMenuContext() {
  const context = useContext(NavMenuContext)

  if (!context) {
    throw new Error('useNavMenuContext must be used within a NavMenuProvider')
  }

  return context
}
