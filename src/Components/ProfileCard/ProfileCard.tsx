import React from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { ArrowRight } from 'react-feather'
import Caption from 'Core/components/texts/Caption'
import Card from 'Core/components/Card/Card'
import Text from 'Core/components/texts/Text'
import { ROUTE_LINKS } from 'Core/utils/routes'
import Separator from 'Core/components/Separator/Separator'
import Button from 'Core/components/Button/Button'
import Row from 'Core/components/layout/Row'
import Price from 'Core/components/Price/Price'
import { useRouter } from 'next/router'
import PageSpinner from 'Core/components/spinners/PageSpinner'
import SvgIcon from 'Core/components/SvgIcon/SvgIcon'
import { useAuthData, useUserNames } from 'Api/hooks/auth'
import LoginButton from 'Components/LoginButton/LoginButton'
import styles from './ProfileCard.module.scss'

export type ProfileCardProps = {
  className?: string
  isCompact?: boolean
}

const ProfileCard = (props: ProfileCardProps) => {
  const { className, isCompact = false } = props
  const { asPath } = useRouter()
  const { data: user, notAuthorized } = useAuthData()
  const { name, username } = useUserNames(user)

  if (notAuthorized) {
    return <LoginButton className={classNames(styles.loginButton, className)} />
  }

  return (
    <Card
      className={classNames(styles.root, className, { [styles.isCompact]: isCompact })}
      borderRadius="xs"
      isActive={asPath === ROUTE_LINKS.main.getProfile()}
      link={ROUTE_LINKS.main.getProfile()}
    >
      {!user ? (
        <PageSpinner />
      ) : (
        <>
          <Row className={styles.user}>
            {user.avatar && <Image width="40" height="40" src={user.avatar} />}
            <div className={styles.userTexts}>
              {name && (
                <Caption variant="xs" color="primary">
                  {name}
                </Caption>
              )}
              {username && (
                <Text variant="xs" color="neutral-300">
                  {username}
                </Text>
              )}
            </div>
          </Row>
          <Separator isVertical />
          <Price value={user.balance || 0} size="sm" color="neutral-300" />
          {isCompact ? (
            <SvgIcon
              className={styles.icon}
              Icon={ArrowRight}
              color="primary"
              size="xs"
            />
          ) : (
            <Button
              className={styles.button}
              iconStart={ArrowRight}
              variant="alt"
              size="small"
            />
          )}
        </>
      )}
    </Card>
  )
}

export default ProfileCard
