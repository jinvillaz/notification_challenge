import * as yup from 'yup'

export const schema = yup.object().shape({
  message: yup.string().required(),
  category: yup.string().required(),
})
