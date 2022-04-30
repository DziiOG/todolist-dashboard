import * as Yup from 'yup'

export const CategorySchema = Yup.object().shape({
  name: Yup.string().required(' Name is required.'),
  description: Yup.string().required('Category description  is required.'),
  user: Yup.string().required('User is required')
})

export const TaskSchema = Yup.object().shape({
  user: Yup.string().required('User is required'),
  name: Yup.string().required('Name is required'),
  frequency: Yup.string(),
  priority: Yup.string(),
  dueDate: Yup.date().required('Due Date is required'),
  category: Yup.string().required()
})
