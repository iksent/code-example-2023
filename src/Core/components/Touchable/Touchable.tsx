import { CSSProperties, MouseEvent, ReactNode, Ref } from 'react'
import React, { useCallback } from 'react'
import Link, { LinkProps } from 'next/link'
import { isFunction } from 'lodash'
import classNames from 'classnames'
import { TooltipProps } from 'Core/components/popups/Tooltip'
import Tooltip from 'Core/components/popups/Tooltip'
import styles from './Touchable.module.scss'

export type TouchableProps = {
  className?: string
  id?: string | number
  onClick?: ((event: MouseEvent<HTMLDivElement>) => void) | null
  disabled?: boolean
  link?: string | null
  linkProps?: Partial<
    LinkProps & {
      target: '_blank' | '_self'
    }
  > | null
  href?: string | null
  target?: string
  children?: ReactNode
  tabIndex?: number
  innerRef?: Ref<any>
  tooltip?: ReactNode
  tooltipProps?: Partial<TooltipProps>
  style?: CSSProperties
  download?: boolean
}

const Touchable = (props: TouchableProps) => {
  const {
    className = '',
    id,
    onClick = null,
    disabled = false,
    link = null,
    linkProps = null,
    href = null,
    target = '_blank',
    children = null,
    tabIndex = 0,
    innerRef = null,
    tooltip,
    tooltipProps,
    style,
    download,
  } = props

  const _className = classNames(styles.root, className, {
    [styles.disabled]: disabled,
  })

  const _onClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()

      if (!disabled && onClick && isFunction(onClick)) {
        onClick(e)
      }

      return true
    },
    [disabled, onClick],
  )

  const render = () => {
    if (href) {
      return (
        <a
          ref={innerRef}
          className={_className}
          id={id?.toString()}
          tabIndex={tabIndex}
          href={!disabled ? href : undefined}
          target={target}
          style={style}
          download={download}
          onClick={_onClick}
        >
          {children}
        </a>
      )
    }

    if (link && !disabled) {
      return (
        <Link prefetch={false} {...linkProps} href={link}>
          <a
            ref={innerRef}
            id={id?.toString()}
            className={_className}
            style={style}
            href={link}
            target={linkProps?.target}
            onClick={_onClick}
          >
            {children}
          </a>
        </Link>
      )
    }

    return (
      <div
        ref={innerRef}
        id={id?.toString()}
        role="link"
        tabIndex={tabIndex}
        className={_className}
        onClick={_onClick}
        style={style}
      >
        {children}
      </div>
    )
  }

  if (tooltip) {
    return (
      <Tooltip title={tooltip} {...tooltipProps}>
        {render()}
      </Tooltip>
    )
  }

  return render()
}

export default Touchable
