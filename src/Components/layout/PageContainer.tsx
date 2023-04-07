import React, { ReactNode } from 'react'
import classNames from 'classnames'
import Row from 'Core/components/layout/Row'
import Caption from 'Core/components/texts/Caption'
import ProfileCard from 'Components/ProfileCard/ProfileCard'
import Text from 'Core/components/texts/Text'
import { useRouter } from 'next/router'
import PageSpinner from 'Core/components/spinners/PageSpinner'
import SvgIcon from 'Core/components/SvgIcon/SvgIcon'
import { ChevronLeft } from 'react-feather'
import Spacer from 'Core/components/Spacer/Spacer'
import Touchable from 'Core/components/Touchable/Touchable'
import styles from './PageContainer.module.scss'

export type PageContainerProps = {
  className?: string
  mainClassName?: string
  title?: ReactNode
  subTitle?: string
  children: ReactNode
  sidebar?: ReactNode
  isFetching?: boolean
  breadcrumbs?: Array<{
    title: string
    link: string
  }>
  reverseMobileLayout?: boolean
  hideProfileCard?: boolean
}

const PageContainer = (props: PageContainerProps) => {
  const {
    className = '',
    mainClassName = '',
    title,
    subTitle,
    children,
    sidebar,
    isFetching = false,
    breadcrumbs,
    reverseMobileLayout = false,
    hideProfileCard = false,
  } = props

  const { asPath } = useRouter()

  return (
    <div
      className={classNames(styles.root, className, {
        [styles.reverseMobileLayout]: reverseMobileLayout,
      })}
    >
      {isFetching ? (
        <PageSpinner withSpacing />
      ) : (
        <>
          <Row className={styles.top} horizontal="between">
            {title && (
              <Row className={styles.titles} vertical="line" wrap>
                {breadcrumbs && (
                  <Row className={styles.breadcrumbs} wrap>
                    {breadcrumbs.map((i) => (
                      <Touchable key={i.title} link={i.link}>
                        <Row>
                          <SvgIcon Icon={ChevronLeft} size="sm" color="neutral-400" />
                          <Spacer width={1} />
                          <Text variant="sm" color="neutral-400">
                            {i.title}
                          </Text>
                        </Row>
                      </Touchable>
                    ))}
                  </Row>
                )}
                <Caption variant="xl" Component="h1">
                  {title}
                </Caption>
                {subTitle && (
                  <Text variant="md" color="neutral-400" Component="h2">
                    {subTitle}
                  </Text>
                )}
              </Row>
            )}
            {!hideProfileCard && <ProfileCard className={styles.profileCard} />}
          </Row>
          <div key={asPath} className={styles.content}>
            <div className={classNames(styles.main, mainClassName)}>{children}</div>
            {sidebar && <div className={styles.sidebar}>{sidebar}</div>}
          </div>
        </>
      )}
    </div>
  )
}

export default PageContainer
