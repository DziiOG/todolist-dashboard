import React from 'react'
import CustomButton from 'components/Button'
import useComponent from 'context/useComponent'
import { useFormik } from 'formik'
import { TaskSchema } from 'helpers/validation'
import { Grid, GridItem } from '@chakra-ui/react'
import { FormInput, FormSelect } from 'components/Form'
import { CalendarFeather, FeatherRepeat } from 'theme/custom-icons'
import { rem } from 'helpers/misc'
import ModalWrapper from './ModalWrapper'

const TaskModal = () => {
  const { isOpen, onClose } = useComponent()
  const formik = useFormik({
    initialValues: {
      user: '',
      category: '',
      name: '',
      dueDate: '',
      priority: '',
      frequency: ''
    },
    enableReinitialize: true,
    validationSchema: TaskSchema,
    onSubmit: () => {}
  })

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldTouched,
    setFieldValue
  } = formik
  return (
    <ModalWrapper
      title='Add Task'
      showHeader
      isCentered
      size='2xl'
      isOpen={isOpen}
      onClose={onClose}
    >
      <Grid w='100%' gap={5} templateColumns='repeat(2, 1fr)'>
        <GridItem>
          <FormInput
            label='Title'
            required
            placeholder='Name your task'
            id='name'
            name='name'
            h={{ ...rem(45) }}
            value={values.name}
            error={errors.name}
            touched={touched.name}
            onBlur={handleBlur}
            onChange={handleChange}
            setFieldTouched={setFieldTouched}
          />
        </GridItem>
        <GridItem>
          <FormInput
            required
            type='datetime-local'
            id='dueDate'
            name='dueDate'
            label='Schedule'
            h={{ ...rem(45) }}
            leftIcon={CalendarFeather}
            placeholder='Select date and time'
            value={values.dueDate}
            error={errors.dueDate}
            touched={touched.dueDate}
            onBlur={handleBlur}
            onChange={handleChange}
            setFieldTouched={setFieldTouched}
          />
        </GridItem>
        <GridItem>
          <FormSelect
            required
            label='Category'
            placeholder='Select category'
            id='category'
            name='category'
            options={[]}
            h={{ ...rem(45) }}
            value={values.category}
            error={errors.category}
            touched={touched.category}
            setFieldValue={(id, e) => {
              setFieldValue(id, e)
            }}
            setFieldTouched={setFieldTouched}
          />
        </GridItem>
        <GridItem>
          <FormSelect
            leftIcon={FeatherRepeat}
            hasSpan
            spanInfo={'(Optional)'}
            label='Frequency'
            placeholder='Select task frequency'
            id='frequency'
            name='frequency'
            options={[]}
            h={{ ...rem(45) }}
            value={values.frequency}
            error={errors.frequency}
            touched={touched.frequency}
            setFieldValue={(id, e) => {
              setFieldValue(id, e)
            }}
            setFieldTouched={setFieldTouched}
          />
        </GridItem>
      </Grid>
      <CustomButton w='100%' />
    </ModalWrapper>
  )
}

TaskModal.propTypes = {}

export default TaskModal
