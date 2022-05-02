import React from 'react'
import CustomButton from 'components/Button'
import useComponent from 'context/useComponent'
import { useFormik } from 'formik'
import { TaskSchema } from 'helpers/validation'
import { Grid, GridItem, useToast } from '@chakra-ui/react'
import { FormInput, FormSelect, FormTextarea } from 'components/Form'
import { CalendarFeather, FeatherRepeat, Priority } from 'theme/custom-icons'
import { rem, toastError, toastSuccess } from 'helpers/misc'
import { isEmpty } from 'lodash'
import useAuth from 'context/useAuth'
import useApi from 'context/useApi'
import { useQuery, useQueryClient } from 'react-query'
import Spinner from 'components/FetchCard/Spinner'
import { FaCircle } from 'react-icons/fa'
import ModalWrapper from './ModalWrapper'

export const frq = [
  {
    id: 'never',
    name: 'never repeats'
  },
  { id: 'daily', name: 'repeats daily' },
  { id: 'weekly', name: 'repeats weekly' },
  { id: 'monthly', name: 'repeats monthly' },
  { id: 'customize', name: 'customize' }
]

export const prs = [
  {
    id: 1,
    name: 'None',
    textColor: '#29325A'
  },
  { id: 2, name: 'Low', textColor: '#6fc9d9' },
  { id: 3, name: 'Medium', textColor: '#cb9134' },
  { id: 4, name: 'High', textColor: '#b93909' }
]

export const statuses = [
  { id: 'PENDING', name: 'Pending' },
  { id: 'IN_PROGRESS', name: 'In progress' },
  { id: 'COMPLETED', name: 'Completed' },
  { id: 'RESCHEDULED', name: 'Rescheduled' }
]

const TaskModal = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { isOpen, onClose, modalData } = useComponent()
  const { updateTask, createTask, getCategories } = useApi()
  const { isAuthenticated, setSession } = useAuth()
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
    onSubmit: async (
      values,
      { setSubmitting, setErrors, setStatus, resetForm }
    ) => {
      try {
        setSubmitting(true)
        const res = modalData
          ? await updateTask(modalData?._id, values)
          : await createTask(values)
        await queryClient.invalidateQueries([`tasks_user${user?._id}`])
        toastSuccess(
          modalData ? 'Successfully updated task' : 'Successfully created task',
          res,
          toast
        )
        resetForm({})
        setStatus({ success: true })
        onClose()
      } catch (error) {
        setStatus({ success: false })
        toastError(error, toast, setSession)
        setErrors({ submit: error?.data?.message })
      } finally {
        setSubmitting(false)
      }
    }
  })

  const { data, isLoading, error, refetch } = useQuery(
    [`categories_user${user?._id}`],
    async () => {
      if (user?._id) {
        return await getCategories({ user: user?._id })
      }
    },
    {
      staleTime: 90000
    }
  )

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
      <Spinner
        w='100%'
        h='md'
        hook={{
          loading: isLoading,
          error,
          triggerReload: () => refetch()
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid
            mb={{ md: 5 }}
            w='100%'
            gap={5}
            templateColumns='repeat(2, 1fr)'
          >
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
                iconColor={
                  data?.data?.find(item => item._id === values.category)?.color
                }
                required
                label='Category'
                leftIcon={
                  data?.data?.find(item => item._id === values.category)?.color
                    ? FaCircle
                    : undefined
                }
                placeholder='Select category'
                id='category'
                name='category'
                options={data?.data?.map(item => ({
                  name: item.name,
                  id: item?._id
                }))}
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
                options={frq}
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
          <Grid
            w='100%'
            gap={5}
            mb={{ md: 5 }}
            templateColumns='repeat(2, 1fr)'
          >
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
                    options={prs}
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
                    options={statuses}
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
      </Spinner>
    </ModalWrapper>
  )
}

TaskModal.propTypes = {}

export default TaskModal
