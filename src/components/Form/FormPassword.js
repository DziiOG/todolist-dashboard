import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Input,
  FormLabel,
  InputGroup,
  FormControl,
  InputRightElement,
  Icon
} from '@chakra-ui/react'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import FormErrorHandler from './FormErrorHandler'

const FormPassword = ({
  error,
  touched,
  label,
  isDisabled,
  isRequired,
  setFieldTouched,
  ...rest
}) => {
  const [show, setShow] = React.useState(false)
  const handleClick = e => {
    e.preventDefault()
    setShow(prev => !prev)
  }

  return (
    <FormControl
      id={rest.id || rest.name}
      isDisabled={isDisabled}
      isRequired={isRequired}
    >
      <FormLabel
        fontSize='lg'
        fontFamily='Avenir'
        color='#29325a'
        fontStyle={'normal'}
      >
        {label}
      </FormLabel>
      <InputGroup size='md' h={12}>
        <Input
          h={14}
          pr='4.5rem'
          fontSize='sm'
          placeholder='Enter password'
          type={show ? 'text' : 'password'}
          _placeholder={{ fontSize: 'sm', color: '#29325A66 ' }}
          {...rest}
        />
        <InputRightElement width='4.5rem' h={14}>
          <Box
            as='button'
            role='button'
            aria-label='password'
            onClick={handleClick}
            color='cf.400'
          >
            {show ? (
              <Icon as={BsEyeFill} boxSize={5} />
            ) : (
              <Icon as={BsEyeSlashFill} boxSize={5} />
            )}
          </Box>
        </InputRightElement>
      </InputGroup>
      <FormErrorHandler
        error={error}
        touched={touched}
        onClear={() => setFieldTouched(rest.id || rest.name || '', false)}
      />
    </FormControl>
  )
}

FormPassword.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  setFieldTouched: PropTypes.func
}

export default FormPassword
