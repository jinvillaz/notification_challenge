import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  category: yup.string().required('Select category'),
  message: yup.string().required('Message is required'),
})
