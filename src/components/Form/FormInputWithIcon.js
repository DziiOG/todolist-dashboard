import React from 'react'
import {
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const FormInputWithIcon = ({ label, icon, required, ...rest }) => (
  <FormControl isRequired={required}>
    <FormLabel color='gray.500'>{label}</FormLabel>
    <InputGroup size='sm'>
      <Input size='lg' {...rest} />
      <InputRightElement
        bg='brand.blue.200'
        w={12}
        h={12}
        roundedTopRight='md'
        roundedBottomRight='md'
      >
        <Icon as={icon} size={8} color='white' />
      </InputRightElement>
    </InputGroup>
  </FormControl>
)

FormInputWithIcon.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.any,
  required: PropTypes.bool
}

export default FormInputWithIcon
