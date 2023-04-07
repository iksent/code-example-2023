import React, { useCallback } from 'react'
import classNames from 'classnames'
import SvgIcon from 'Core/components/SvgIcon/SvgIcon'
import Text, { TextVariants } from 'Core/components/texts/Text'
import Touchable from 'Core/components/Touchable/Touchable'
import CheckIcon from './check.svg'
import styles from './Checkbox.module.scss'

export const INDETERMINATE = 'indeterminate'

export type CheckboxEvent = React.MouseEvent<HTMLDivElement>

export type CheckboxCallbackData = {
  name?: string
  event?: CheckboxEvent
  value: boolean
}

export type CheckboxValue = boolean | typeof INDETERMINATE

export type CheckboxProps = {
  className?: string
  labelClassName?: string
  value: CheckboxValue
  name?: string
  disabled?: boolean
  onChange?: ((data: CheckboxCallbackData) => void) | null
  tabIndex?: number
  label?: string
  labelVariant?: TextVariants
}

const Checkbox = (props: CheckboxProps) => {
  const {
    className = '',
    labelClassName = '',
    value,
    name,
    disabled = false,
    onChange = null,
    tabIndex = 0,
    label = '',
    labelVariant = 'sm',
  } = props
  const isChecked = value === true

  const onClick = useCallback(
    (event: CheckboxEvent) => {
      if (!disabled && onChange) {
        event.stopPropagation()
        const newValue = value === INDETERMINATE ? true : !value
        onChange({
          name,
          event,
          value: newValue,
        })
      }
    },
    [disabled, onChange, name, value],
  )

  return (
    <div
      className={classNames([
        styles.root,
        className,
        {
          [styles.checked]: isChecked,
          [styles.disabled]: disabled,
          [styles.indeterminate]: value === INDETERMINATE,
        },
      ])}
    >
      <div
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={tabIndex}
        className={styles.checkbox}
        onClick={onClick}
      >
        {isChecked && <SvgIcon className={styles.icon} Icon={CheckIcon} />}
        {value === INDETERMINATE && <div className={styles.line} />}
      </div>
      {label && (
        <Touchable onClick={onClick}>
          <Text
            className={classNames([styles.label, labelClassName])}
            variant={labelVariant}
          >
            {label}
          </Text>
        </Touchable>
      )}
    </div>
  )
}

export default Checkbox
