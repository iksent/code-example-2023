import React, {
  forwardRef,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { isNil, size } from 'lodash'
import { Eye, EyeOff } from 'react-feather'
import InputLabel from 'Core/components/inputs/InputLabel'
import InputErrors, {
  InputErrorsType,
} from 'Core/components/inputs/InputErrors/InputErrors'
import SvgIcon, { SvgIconType } from 'Core/components/SvgIcon/SvgIcon'
import { HintProps } from 'Core/components/Hint/Hint'
import { UseRefReturnType } from 'Core/utils/types'
import styles from './Input.module.scss'

export const INPUT_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  PASSWORD: 'password',
  EMAIL: 'email',
  NUMBER: 'number',
  PHONE: 'tel',
}

export type InputCallbackData = {
  name?: string
  event?:
    | null
    | React.SyntheticEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLInputElement>
  value: string
}

export type InputHandles = {
  focus: () => void
}

export type InputProps = {
  name?: string
  value: string | number
  label?: ReactNode
  labelHintProps?: HintProps | null
  variant?: 'base' | 'alt'
  autoFocus?: boolean
  selectTextOnFocus?: boolean
  disabled?: boolean | 'clear'
  className?: string
  inputClassName?: string
  containerClassName?: string
  iconClassName?: string
  placeholder?: string
  inputType?: HTMLInputTypeAttribute
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  autocomplete?: 'on' | 'off'
  onChange?: (data: InputCallbackData) => void
  onFocus?: (data: InputCallbackData) => void
  onBlur?: (data: InputCallbackData) => void
  onKeyPress?: (data: InputCallbackData) => void
  iconStart?: SvgIconType
  errors?: InputErrorsType
  hasError?: boolean
  hideErrors?: boolean
  renderAtEnd?: () => ReactNode
  tabIndex?: number
}

const Input = (props: InputProps, ref: Ref<any>) => {
  const {
    name = '',
    value,
    label = null,
    labelHintProps = null,
    disabled = false,
    className = '',
    inputClassName = '',
    containerClassName = '',
    iconClassName = '',
    variant = 'base',
    inputType = 'text',
    inputMode,
    autocomplete,
    onChange,
    autoFocus = false,
    selectTextOnFocus = false,
    placeholder = '',
    onFocus = null,
    onBlur = null,
    onKeyPress = null,
    iconStart = null,
    errors = null,
    hasError = false,
    hideErrors = false,
    renderAtEnd,
    tabIndex = 0,
  } = props

  const [passwordVisible, setPasswordVisible] = useReducer((p) => !p, false)

  const isTextarea = inputType === INPUT_TYPES.TEXTAREA
  const InputComponent = isTextarea ? 'textarea' : 'input'

  const inputRef = useRef(null)
  const [focused, setFocused] = useState(false)

  const _onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      !disabled && onChange && onChange({ name, event, value: event.target.value })
    },
    [disabled, onChange, name],
  )

  const _onFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (!disabled) {
        setFocused(true)
        onFocus && onFocus({ name, event, value: event.target.value })
        selectTextOnFocus && event.target.select()
      }
    },
    [onFocus, selectTextOnFocus, name, disabled],
  )

  const _onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      onBlur && onBlur({ name, event, value: event.target.value })
    },
    [onBlur, name],
  )

  const _onKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyPress && onKeyPress({ name, event, value: event.target.value as string })
    },
    [onKeyPress, name],
  )

  const focus = useCallback(() => {
    const _ref = inputRef as UseRefReturnType<HTMLInputElement>
    _ref.current && _ref.current.focus()
  }, [])

  useEffect(() => {
    if (autoFocus && inputRef && !disabled) {
      focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      focus,
    }),
    [focus],
  )

  return (
    <div
      className={classNames(styles.container, className, {
        [styles.disabled]: disabled && disabled !== 'clear',
        [styles.focused]: focused,
        [styles.filled]: !isNil(value) && value !== '',
        [styles.invalid]: hasError || size(errors) > 0,
        [styles['is-textarea']]: isTextarea,
        [styles.base]: variant === 'base',
        [styles.alt]: variant === 'alt',
        [styles.withIconStart]: Boolean(iconStart),
      })}
    >
      {Boolean(label) && <InputLabel hintProps={labelHintProps}>{label}</InputLabel>}
      <div className={classNames([styles.inner, containerClassName])}>
        {iconStart && (
          <SvgIcon
            className={classNames([styles.icon, styles.iconStart, iconClassName])}
            Icon={iconStart}
          />
        )}
        <InputComponent
          ref={inputRef}
          name={name}
          className={classNames(styles.input, inputClassName)}
          disabled={Boolean(disabled)}
          value={value}
          placeholder={placeholder}
          type={passwordVisible ? INPUT_TYPES.TEXT : inputType}
          inputMode={inputMode}
          autocomplete={autocomplete}
          onChange={_onChange}
          onFocus={_onFocus}
          onBlur={_onBlur}
          onKeyPress={_onKeyPress}
          size={1}
          tabIndex={tabIndex}
        />
        {inputType === INPUT_TYPES.PASSWORD && (
          <SvgIcon
            className={classNames([styles.icon, styles.iconEnd])}
            Icon={passwordVisible ? EyeOff : Eye}
            onClick={setPasswordVisible}
          />
        )}
        {renderAtEnd && renderAtEnd()}
      </div>
      {!hideErrors && <InputErrors errors={errors} />}
    </div>
  )
}

export default forwardRef(Input)
