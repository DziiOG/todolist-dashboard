import PropTypes from 'prop-types'
import React from 'react'
import CustomButton from 'components/Button'
import useComponent from 'context/useComponent'
import { useFormik } from 'formik'
import { CategorySchema } from 'helpers/validation'
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Text,
  useToast
} from '@chakra-ui/react'
import { FormInput } from 'components/Form'
import { rem, toastError, toastSuccess } from 'helpers/misc'
import { isEmpty } from 'lodash'
import useAuth from 'context/useAuth'
import FormErrorHandler from 'components/Form/FormErrorHandler'
import useApi from 'context/useApi'
import { useQueryClient } from 'react-query'
import ModalWrapper from './ModalWrapper'

const ColorPickerForm = ({
  required,
  display,
  fontWeight,
  label,
  direction,
  hasSpan,
  spanInfo,
  helper,
  error,
  touched,
  setFieldTouched,
  id,
  colors,
  handleChange,
  value,
  name,
  setFieldValue,
  ...rest
}) => (
  <FormControl
    id={rest.id || rest.name}
    isRequired={required}
    d={display}
    flexDirection={direction}
  >
    {label ? (
      <Flex color='gray.500'>
        <FormLabel
          fontSize='lg'
          fontFamily='Avenir'
          color='#29325a'
          fontWeight={fontWeight || 500}
          fontStyle={'normal'}
        >
          {label}
        </FormLabel>
        {hasSpan && (
          <Text fontSize='xs' mt={0.5} ml={-2}>
            {spanInfo}{' '}
          </Text>
        )}
      </Flex>
    ) : (
      <Box mt={7} />
    )}
    {helper && (
      <FormHelperText mt={-2} mb={2} fontSize='xs' color='gray.400'>
        {helper}
      </FormHelperText>
    )}

    <Flex w='100%' align='center'>
      {colors.map(color => (
        <Box
          cursor='pointer'
          key={color.id}
          rounded='full'
          border={value === color.color ? '2px solid #29325A' : undefined}
          bg={`${color.color} 0% 0% no-repeat padding-box`}
          w={{ ...rem(20) }}
          h={{ ...rem(20) }}
          mr={{ ...rem(15) }}
          onClick={() => setFieldValue(id || name, color.color)}
        />
      ))}
    </Flex>

    <FormErrorHandler
      error={error}
      touched={touched}
      onClear={() => setFieldTouched(rest.id || rest.name || '', false)}
    />
  </FormControl>
)

ColorPickerForm.propTypes = {
  colors: PropTypes.shape({
    map: PropTypes.func
  }),
  direction: PropTypes.any,
  display: PropTypes.any,
  error: PropTypes.any,
  fontWeight: PropTypes.number,
  handleChange: PropTypes.func,
  hasSpan: PropTypes.any,
  helper: PropTypes.any,
  id: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  required: PropTypes.any,
  setFieldTouched: PropTypes.func,
  setFieldValue: PropTypes.func,
  spanInfo: PropTypes.any,
  touched: PropTypes.any,
  value: PropTypes.any
}

const CategoryModal = () => {
  const { isOpen, onClose, modalData } = useComponent()
  const queryClient = useQueryClient()
  const { isAuthenticated, setSession } = useAuth()
  const { updateCategory, createCategory } = useApi()
  const toast = useToast()
  const { user } = isAuthenticated()
  const colors = [
    { color: '#E58D8D', id: 1 },
    { color: '#CB9167', id: 2 },
    { color: '#8A9048', id: 3 },
    { color: '#7367CB', id: 4 },
    { total: 4, color: '#67CBAC', id: 5 },
    { total: 3, color: '#A867CB', id: 6 }
  ]

  const formik = useFormik({
    initialValues: {
      user: user?._id,
      name: modalData?.name ? modalData?.name : '',
      color: modalData?.color || colors[0].color
    },
    enableReinitialize: true,
    validationSchema: CategorySchema,
    onSubmit: async (
      values,
      { setSubmitting, setErrors, setStatus, resetForm }
    ) => {
      try {
        setSubmitting(true)
        const res = modalData
          ? await updateCategory(modalData?._id, values)
          : await createCategory(values)
        await queryClient.invalidateQueries([`categories_user${user?._id}`])
        toastSuccess(
          modalData
            ? 'Successfully updated category'
            : 'Successfully created category',
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

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldTouched,
    handleSubmit,
    dirty,
    isSubmitting,
    setFieldValue
  } = formik

  return (
    <ModalWrapper
      title={modalData ? 'Edit Category' : 'Add Category'}
      showHeader
      isCentered
      size='2xl'
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Grid mb={{ md: 5 }} w='100%' gap={5} templateColumns='repeat(1, 1fr)'>
          <GridItem>
            <FormInput
              label='Category name'
              required
              placeholder='Category name'
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
            <Box mt={5} w='100%'>
              <ColorPickerForm
                label='Pick color'
                required
                id='color'
                name='color'
                h={{ ...rem(45) }}
                value={values.color}
                error={errors.color}
                touched={touched.color}
                onBlur={handleBlur}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                colors={colors}
              />
            </Box>
          </GridItem>
        </Grid>
        <CustomButton
          type='submit'
          w='100%'
          isLoading={isSubmitting}
          isDisabled={isSubmitting || !isEmpty(errors) || !dirty}
          title={modalData ? 'Edit Category' : 'Add Category'}
        />
      </form>
    </ModalWrapper>
  )
}

CategoryModal.propTypes = {}

export default CategoryModal
