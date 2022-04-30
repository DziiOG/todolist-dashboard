import React from 'react'
import {
  Box,
  Checkbox,
  FormControl,
  HStack,
  Input,
  Text
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const FormCheckbox = ({ title, text, ...rest }) => (
  <FormControl>
    <HStack
      spacing='1rem'
      my={8}
      justify='space-between'
      flexDirection={{ base: 'column', sm: 'row' }}
    >
      <HStack spacing='1rem'>
        <Checkbox colorScheme='brandGreen'>{title}</Checkbox>
        <Text fontSize={{ base: 'sm', xl: 'md' }}>{text}</Text>
      </HStack>
      <Box w={{ xl: 117 }}>
        <Input size='lg' bg='white' {...rest} />
      </Box>
    </HStack>
  </FormControl>
)

FormCheckbox.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
}

export default FormCheckbox
