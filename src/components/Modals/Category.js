import React from 'react'
import CustomButton from 'components/Button'
import useComponent from 'context/useComponent'
import { useFormik } from 'formik'
import { CategorySchema } from 'helpers/validation'
import { Grid, GridItem } from '@chakra-ui/react'
import { FormInput } from 'components/Form'
import { rem } from 'helpers/misc'
import { isEmpty } from 'lodash'
import useAuth from 'context/useAuth'
import ModalWrapper from './ModalWrapper'

const CategoryModal = () => {
  const { isOpen, onClose, modalData } = useComponent()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const formik = useFormik({
    initialValues: {
      user: user?._id,
      name: modalData?.name ? modalData?.name : '',
      color: modalData?.color || ''
    },
    enableReinitialize: true,
    validationSchema: CategorySchema,
    onSubmit: () => {}
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
    isSubmitting
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
