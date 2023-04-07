import React from 'react'
import { useTranslation } from 'Core/config/i18n/i18n'
import classNames from 'classnames'
import { map, size } from 'lodash'
import Text from 'Core/components/texts/Text'
import Row from 'Core/components/layout/Row'
import SvgIcon from 'Core/components/SvgIcon/SvgIcon'
import { ErrorOutline } from '@mui/icons-material'
import styles from './InputErrors.module.scss'

export type InputErrorsType =
  | null
  | undefined
  | Record<
      string,
      | string
      | {
          key: string
          options?: Record<string, any>
        }
    >

export type InputErrorsProps = {
  className?: string
  errors: undefined | InputErrorsType
}

const InputErrors = (props: InputErrorsProps) => {
  const { className = '', errors } = props
  const [t] = useTranslation('validation')

  if (!size(errors)) {
    return null
  }

  return (
    <div className={classNames([styles.root, className])}>
      {map(errors, (value, id) =>
        !value ? null : (
          <Row key={`Error_${id}`} className={styles.error}>
            <SvgIcon className={styles.icon} Icon={ErrorOutline} />
            <Text className={styles.text} variant="xxs">
              {typeof value === 'object' && value.key
                ? t(value.key, value.options)
                : typeof value === 'string'
                ? value
                : '???'}
            </Text>
          </Row>
        ),
      )}
    </div>
  )
}

export default InputErrors
