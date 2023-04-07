import React, { CSSProperties, ElementType, forwardRef, ReactNode, Ref } from 'react'
import classNames from 'classnames'
import { useColoring, Coloring } from 'Core/utils/Coloring'

export const AllCaptionVariants = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
export type CaptionVariants = typeof AllCaptionVariants[number]

export type CaptionProps = {
  className?: string
  id?: string
  children?: ReactNode
  variant?: CaptionVariants | null
  Component?: ElementType
  style?: CSSProperties
  color?: Coloring
}

const Caption = (props: CaptionProps, ref: Ref<HTMLDivElement>) => {
  const {
    className = '',
    id,
    children = null,
    variant = null,
    Component = 'div',
    style,
    color,
    ...other
  } = props
  const coloring = useColoring(color)

  return (
    <Component
      {...other}
      ref={ref}
      id={id}
      className={classNames(className, coloring, variant ? `caption-${variant}` : '')}
      style={style}
    >
      {children}
    </Component>
  )
}

export default forwardRef(Caption)
