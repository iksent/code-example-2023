import React, { ReactNode, useMemo } from 'react'
import classNames from 'classnames'
import cn from 'classnames/bind'
import Spinner from 'Core/components/spinners/Spinner'
import Touchable, { TouchableProps } from 'Core/components/Touchable/Touchable'
import SvgIcon, { SvgIconType } from 'Core/components/SvgIcon/SvgIcon'
import lodashSize from 'lodash/size'
import styles from './Button.module.scss'

const cx = cn.bind(styles)

export const ButtonVariants = [
  'base',
  'light',
  'light-alt',
  'alt',
  'flat',
  'flat-alt',
] as const
export type ButtonVariant = typeof ButtonVariants[number]

export const ButtonSizes = ['large', 'medium', 'small'] as const
export type ButtonSize = typeof ButtonSizes[number]

export type ButtonProps = {
  className?: string
  titleClassName?: string
  iconClassName?: string
  size?: ButtonSize
  title?: ReactNode | null
  disabled?: boolean
  isFetching?: boolean
  theming?: 'negative' | 'positive'
  variant?: ButtonVariant
  iconStart?: SvgIconType
  iconEnd?: SvgIconType
  renderAtEnd?: (() => ReactNode) | null
  isAdaptiveHeight?: boolean
} & TouchableProps

const Button = (props: ButtonProps) => {
  const {
    className = '',
    titleClassName = '',
    iconClassName = '',
    size = 'medium',
    title = null,
    disabled = false,
    isFetching = false,
    iconStart = null,
    iconEnd = null,
    variant = 'base',
    renderAtEnd = null,
    isAdaptiveHeight,
    ...other
  } = props
  const touchableProps = other as TouchableProps

  const _className = useMemo(() => {
    return classNames([
      styles.root,
      className,
      cx(variant),
      cx(size),
      {
        [styles.disabled]: disabled,
        [styles.fetching]: isFetching,
        [styles.withTitle]: lodashSize(title) > 0,
        [styles.isAdaptiveHeight]: isAdaptiveHeight,
      },
    ])
  }, [className, disabled, isFetching, variant, size, title, isAdaptiveHeight])

  return (
    <Touchable
      {...touchableProps}
      className={_className}
      disabled={disabled || isFetching}
    >
      {isFetching && (
        <div className={styles.spinnerBox}>
          <Spinner className={styles.spinner} size={20} />
        </div>
      )}

      {iconStart && (
        <SvgIcon
          className={classNames([styles.icon, styles.iconStart, iconClassName])}
          Icon={iconStart}
        />
      )}
      {title && (
        <span className={classNames([styles.title, titleClassName])}>{title}</span>
      )}
      {iconEnd && (
        <SvgIcon
          className={classNames([styles.icon, styles.iconEnd, iconClassName])}
          Icon={iconEnd}
        />
      )}
      {renderAtEnd && renderAtEnd()}
    </Touchable>
  )
}

export default Button
