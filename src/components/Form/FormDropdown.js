import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'
import FormErrorHandler from './FormErrorHandler'

const FormDropdown = ({
  label,
  error,
  touched,
  isRequired,
  setFieldTouched,
  helper,
  items,
  mappedItem,
  onChange,
  id,
  fontSize,
  placeholder,
  titleText,
  width,
  selectedItem,
  initialSelectedItem,
  ...rest
}) => (
  <FormControl id={rest.id || rest.name} isRequired={isRequired}>
    <FormLabel fontSize='sm' color='gray.500'>
      {label}
    </FormLabel>
    <FormHelperText mt={-2} mb={4} fontSize='xs' color='gray.400'>
      {helper}
    </FormHelperText>
    {/* <ComboBox */}
    {/*  {...rest} */}
    {/*  id={id} */}
    {/*  name={id} */}
    {/*  items={items} */}
    {/*  placeholder={placeholder} */}
    {/*  titleText={titleText} */}
    {/*  onChange={onChange} */}
    {/*  itemToString={mappedItem} */}
    {/*  selectedItem={selectedItem} */}
    {/*  initialSelectedItem={initialSelectedItem} */}
    {/*  light */}
    {/* /> */}
    <FormErrorHandler
      error={error}
      touched={touched}
      onClear={() => setFieldTouched(rest.id || rest.name || '', false)}
    />
  </FormControl>
)

FormDropdown.propTypes = {
  titleText: PropTypes.any,
  label: PropTypes.any,
  items: PropTypes.any,
  mappedItem: PropTypes.any,
  placeholder: PropTypes.any,
  onChange: PropTypes.any,
  marginTop: PropTypes.any,
  helper: PropTypes.any,
  setFieldTouched: PropTypes.any,
  fontSize: PropTypes.any,
  id: PropTypes.any,
  width: PropTypes.any,
  error: PropTypes.any,
  touched: PropTypes.any,
  selectedItem: PropTypes.any,
  isRequired: PropTypes.any,
  initialSelectedItem: PropTypes.any
}

export default FormDropdown
