import React, { ElementType, ReactNode } from 'react'
import classNames from 'classnames'
import Touchable, { TouchableProps } from 'Core/components/Touchable/Touchable'
import ButtonRemove from 'Core/components/Button/ButtonRemove'
import styles from './Card.module.scss'

export const CardVariants = ['base', 'base-error', 'alt', 'third', 'clear'] as const
export type CardVariant = typeof CardVariants[number]

export const CardRadiusVariants = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const
export type CardRadiusVariant = typeof CardRadiusVariants[number]

export const CardPaddings = ['none', 'xxs', 'xs', 'sm', 'md', 'lg'] as const
export type CardPadding = typeof CardPaddings[number]

export type CardProps = {
  className?: string
  id?: string | number
  padding?: CardPadding
  children: ReactNode
  isActive?: boolean | null
  onRemove?: (() => void) | null
  variant?: CardVariant
  activeVariant?: 'base'
  hoverVariant?: 'scale' | 'border' | 'border-alt'
  disabledVariant?: 'base' | 'clear'
  borderRadius?: CardRadiusVariant
} & TouchableProps

const Card = (props: CardProps) => {
  const {
    className = '',
    id,
    children,
    padding = 'none',
    isActive = null,
    onRemove = null,
    style,
    variant = 'base',
    activeVariant = 'base',
    hoverVariant = 'border',
    disabledVariant = 'base',
    borderRadius = 'sm',
    disabled,
    ...other
  } = props

  const clickable =
    Boolean(other.onClick || other.link || other.href) && !disabled && !isActive
  const Container = (clickable ? Touchable : 'div') as ElementType

  return (
    <Container
      {...(clickable ? other : {})}
      id={id}
      style={style}
      disabled={disabled}
      className={classNames([
        styles.root,
        className,
        styles[`padding-${padding}`],
        styles[variant],
        styles[`hover-${hoverVariant}`],
        styles[`radius-${borderRadius}`],
        {
          [styles.clickable]: clickable,
          [styles.isActive]: isActive,
          [styles[`active-${activeVariant}`]]: isActive,
          [styles.disabled]: disabled,
          [styles[`disabled-${disabledVariant}`]]: disabled,
        },
      ])}
    >
      {children}
      {onRemove && <ButtonRemove className={styles.remover} onClick={onRemove} />}
    </Container>
  )
}

export default Card
