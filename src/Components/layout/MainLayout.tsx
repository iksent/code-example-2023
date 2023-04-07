import React, { ReactChild, useCallback } from 'react'
import LangsMenu from 'Core/components/LangsMenu/LangsMenu'
import SideLayout from 'Core/components/SideLayout/SideLayout'
import Touchable from 'Core/components/Touchable/Touchable'
import { ROUTE_LINKS } from 'Core/utils/routes'
import Logo from 'Core/components/Logo/Logo'
import { useProject } from 'Utils/project'
import { useInnerTranslation } from 'Core/config/i18n/i18n'
import ProfileCard from 'Components/ProfileCard/ProfileCard'
import GlobalNotice from 'Components/GlobalNotice/GlobalNotice'
import styles from './MainLayout.module.scss'

export type MainLayoutPageProps = {
  noLayout?: boolean
}

export type MainLayoutProps = {
  className?: string
  children: ReactChild
} & MainLayoutPageProps

const MainLayout = (props: MainLayoutProps) => {
  const { className = '', children, noLayout = false } = props
  const project = useProject()
  const T = useInnerTranslation('main', 'layout')

  const renderAtMenuTopMobile = useCallback(() => {
    return <ProfileCard isCompact />
  }, [])

  if (noLayout) {
    return children
  }

  return (
    <>
      <GlobalNotice />
      <SideLayout
        className={className}
        mobileMenuBreakpoint={1100}
        logo={
          <Touchable
            className={styles.logoTouchable}
            link={ROUTE_LINKS.main.getModules()}
          >
            <Logo className={styles.logo} height={32} />
          </Touchable>
        }
        menu={project.menu}
        footerLinks={project.subLinks}
        footerText={<span>{T('footer.text')}</span>}
        renderAtMenuTopMobile={renderAtMenuTopMobile}
      >
        {children}
      </SideLayout>
      <LangsMenu />
    </>
  )
}

export default MainLayout
