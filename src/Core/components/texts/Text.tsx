import React, { ElementType, forwardRef, HTMLAttributes, ReactNode, Ref } from 'react'
import classNames from 'classnames'
import { useColoring, Coloring } from 'Core/utils/Coloring'
import styles from './Text.module.scss'

export type TextVariants = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TextWeight = 'normal' | 'medium' | 'bold'

export type TextProps = {
  className?: string
  id?: string
  children?: ReactNode
  variant?: TextVariants | null
  weight?: TextWeight
  Component?: ElementType
  isLinkText?: boolean
  color?: Coloring
} & HTMLAttributes<HTMLElement>

const Text = (props: TextProps, ref: Ref<HTMLDivElement>) => {
  const {
    className = '',
    id,
    children = null,
    variant = null,
    weight = 'normal',
    Component = 'div',
    isLinkText = false,
    color,
    ...other
  } = props
  const coloring = useColoring(color)

  return (
    <Component
      {...other}
      ref={ref}
      id={id}
      className={classNames(
        className,
        coloring,
        variant ? `text-${variant}` : '',
        `weight-${weight}`,
        { [styles.isLinkText]: isLinkText },
      )}
    >
      {children}
    </Component>
  )
}

export default forwardRef(Text)
