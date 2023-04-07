import * as Yup from 'yup'
import { UniFile } from 'Core/utils/network/types'
import { isBasicImageType } from 'Core/utils/files'

Yup.setLocale({
  mixed: {
    typeError: 'incorrect_value',
    required: 'required_value',
  },
  string: {
    email: 'email',
    min: ({ min }) => ({ key: 'minimum_length', options: { count: min } }),
    max: ({ max }) => ({ key: 'maximum_length', options: { count: max } }),
    required: 'required_value',
  },
  number: {
    positive: 'value_must_be_positive',
    min: ({ min }) => (min === 1 ? 'value_must_be_positive' : 'value_is_too_small'),
    max: ({ max }) => 'value_is_too_big',
  },
})

export const usernameValidator = Yup.string().matches(
  /^@?[A-z][A-z0-9_]{1,31}$/,
  'invalid_username',
)

export const YupBaseValidators = {
  email: Yup.string().email(),
  phone: Yup.string().matches(
    /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
    'invalid_phone',
  ),
  amount: Yup.number().min(0).max(1000000),
  password: Yup.string().min(6).max(32),
  rating: Yup.number().min(1).max(5).nullable(),
  input: Yup.string(),
  dateTime: Yup.string(),
  username: usernameValidator,
  getImageResource: (isRequired = false) => {
    const mixed = isRequired ? Yup.mixed().required() : Yup.mixed()
    return mixed.test('resource_type', 'invalid_image_type', (value) => {
      const _value = value as UniFile
      if (!isRequired && !_value) {
        return true // .test() also called for not required fields, so validate it manually
      } else {
        return isBasicImageType(_value)
      }
    })
  },
  firstName: Yup.string().max(64),
  lastName: Yup.string().max(64),
}

export default Yup
