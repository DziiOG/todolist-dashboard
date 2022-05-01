import React from 'react'
import CustomButton from 'components/Button'
import useComponent from 'context/useComponent'
import { useFormik } from 'formik'
import { TaskSchema } from 'helpers/validation'
import { Grid, GridItem } from '@chakra-ui/react'
import { FormInput, FormSelect, FormTextarea } from 'components/Form'
import { CalendarFeather, FeatherRepeat, Priority } from 'theme/custom-icons'
import { rem } from 'helpers/misc'
import { isEmpty } from 'lodash'
import useAuth from 'context/useAuth'
import ModalWrapper from './ModalWrapper'

const TaskModal = () => {
  const { isOpen, onClose, modalData } = useComponent()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const formik = useFormik({
    initialValues: {
      user: user?._id,
      category: modalData?.category ? modalData.category._id : '',
      name: modalData?.name || '',
      dueDate: modalData?.dueDate || '',
      priority: modalData?.priority || '',
      frequency: modalData?.frequency || '',
      description: modalData?.description || ''
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
    setFieldValue,
    handleSubmit,
    dirty,
    isSubmitting
  } = formik
  return (
    <ModalWrapper
      title={modalData ? 'Edit Task' : 'Add Task'}
      showHeader
      isCentered
      size='2xl'
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Grid mb={{ md: 5 }} w='100%' gap={5} templateColumns='repeat(2, 1fr)'>
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
              type='datetime-local'
              required
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
              required
              leftIcon={FeatherRepeat}
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
        <Grid w='100%' gap={5} mb={{ md: 5 }} templateColumns='repeat(2, 1fr)'>
          <GridItem h='100%'>
            <FormTextarea
              label='Description'
              placeholder='Add description'
              h={{ ...rem(140) }}
              required
              id='description'
              name='description'
              value={values.description}
              error={errors.description}
              touched={touched.description}
              onBlur={handleBlur}
              onChange={handleChange}
              setFieldTouched={setFieldTouched}
            />
          </GridItem>
          <GridItem>
            <Grid gap={5} w='100%' templateColumns='repeat(1,1fr)'>
              <GridItem>
                <FormSelect
                  required
                  leftIcon={Priority}
                  label='Priority'
                  hasSpan
                  spanInfo='(Optional)'
                  placeholder='Select priority'
                  id='priority'
                  name='priority'
                  options={[]}
                  h={{ ...rem(45) }}
                  value={values.priority}
                  error={errors.priority}
                  touched={touched.priority}
                  setFieldValue={(id, e) => {
                    setFieldValue(id, e)
                  }}
                  setFieldTouched={setFieldTouched}
                />
              </GridItem>
              <GridItem>
                <FormSelect
                  required
                  leftIcon={FeatherRepeat}
                  label='Status'
                  placeholder='Select task status'
                  id='status'
                  name='status'
                  options={[]}
                  h={{ ...rem(45) }}
                  value={values.status}
                  error={errors.status}
                  touched={touched.status}
                  setFieldValue={(id, e) => {
                    setFieldValue(id, e)
                  }}
                  setFieldTouched={setFieldTouched}
                />
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <CustomButton
          type='submit'
          w='100%'
          isLoading={isSubmitting}
          isDisabled={isSubmitting || !isEmpty(errors) || !dirty}
          title={modalData ? 'Edit Task' : 'Add Task'}
        />
      </form>
    </ModalWrapper>
  )
}

TaskModal.propTypes = {}

export default TaskModal
