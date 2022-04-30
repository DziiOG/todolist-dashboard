import React from 'react'
import { FieldArray } from 'formik'
import PropTypes from 'prop-types'
import { Flex, Grid, HStack, Icon, Text } from '@chakra-ui/react'
import Button from 'components/Button'
import { BsTrash } from 'react-icons/bs'
import { HiOutlinePlusSm } from 'react-icons/hi'
import FormFieldElement from './FormFieldElement'

const FormField = ({
  fieldName,
  fieldObj,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldTouched,
  setFieldValue,
  label,
  title,
  noMore
}) => (
  <FieldArray name={fieldName}>
    {({ push, remove }) => (
      <>
        <Grid templateColumns={{ md: 'repeat(1, 1fr)' }} gap={4}>
          {values?.map((value, i) => {
            const indexItem = i
            return (
              <FormFieldElement
                key={(i => i)(indexItem)}
                name={`${fieldName}.${i}.`}
                reference={value}
                label={label}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                title={title}
                errors={errors?.thirdPartyRef?.[i]}
                touched={touched?.thirdPartyRef?.[i]}
              />
            )
          })}
        </Grid>
        {!noMore && (
          <Flex mt={6} h={10} align='center' justify='space-between'>
            {values?.length >= 1 ? (
              <HStack
                onClick={() => push(fieldObj)}
                disabled={values?.length === 20}
                role='button'
                aria-label='add button'
                h={{ md: 12 }}
                color='cf.900'
              >
                <Icon as={HiOutlinePlusSm} />
                <Text fontWeight='bold'>Add another</Text>
              </HStack>
            ) : (
              <Button
                colorScheme='gray'
                title='Add new metric'
                h={12}
                leftIcon={<Icon as={HiOutlinePlusSm} />}
                w={{ md: 48 }}
                onClick={() => push(fieldObj)}
              />
            )}

            {values?.length > 1 && (
              <HStack
                h={{ md: 12 }}
                onClick={() => remove(values?.length - 1)}
                role='button'
                aria-label='remove button'
                color='red.600'
              >
                <Icon as={BsTrash} />
                <Text fontWeight='bold'>Remove {label}</Text>
              </HStack>
            )}
          </Flex>
        )}
      </>
    )}
  </FieldArray>
)

FormField.propTypes = {
  errors: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldObj: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.any,
  setFieldTouched: PropTypes.func,
  setFieldValue: PropTypes.func,
  title: PropTypes.any,
  touched: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  noMore: PropTypes.bool
}

export default FormField
