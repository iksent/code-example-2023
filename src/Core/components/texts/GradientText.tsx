import React, { forwardRef, ReactNode, Ref } from 'react'
import classNames from 'classnames'
import cn from 'classnames/bind'
import styles from './GradientText.module.scss'

const cx = cn.bind(styles)

export type GradientTextProps = {
  className?: string
  variant?: 'base' | 'alt'
  children?: ReactNode
}

const GradientText = (props: GradientTextProps, ref: Ref<any>) => {
  const { className = '', variant = 'base', children, ...other } = props

  return (
    <div
      ref={ref}
      className={classNames([styles.root, className, cx(variant)])}
      {...other}
    >
      {children}
    </div>
  )
}

export default forwardRef(GradientText)
