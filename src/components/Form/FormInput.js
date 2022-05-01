import React from 'react'
import {
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Box,
  Flex,
  Text
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FormErrorHandler from './FormErrorHandler'

const FormInput = ({
  label,
  error,
  touched,
  required,
  setFieldTouched,
  helper,
  display,
  direction,
  rightIcon,
  leftIcon,
  fontWeight,
  hasSpan,
  spanInfo,
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
    <InputGroup>
      {leftIcon && (
        <InputLeftElement pointerEvents='none' color='gray.400' pt={4}>
          <Icon as={leftIcon} boxSize={6} color='#29325a' />
        </InputLeftElement>
      )}
      <Input
        size='lg'
        {...rest}
        _placeholder={{ fontSize: 'sm' }}
        _focus={{ borderColor: 'null' }}
        fontSize={{ md: 'sm' }}
      />
      {rightIcon && (
        <InputRightElement pointerEvents='none' color='gray.400' pt={1}>
          <Icon as={rightIcon} boxSize={6} />
        </InputRightElement>
      )}
    </InputGroup>
    <FormErrorHandler
      error={error}
      touched={touched}
      onClear={() => setFieldTouched(rest.id || rest.name || '', false)}
    />
  </FormControl>
)

FormInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  touched: PropTypes.bool,
  required: PropTypes.bool,
  setFieldTouched: PropTypes.func,
  helper: PropTypes.string,
  display: PropTypes.any,
  direction: PropTypes.any,
  rightIcon: PropTypes.any,
  fontWeight: PropTypes.any,
  leftIcon: PropTypes.any,
  hasSpan: PropTypes.bool,
  spanInfo: PropTypes.string
}

export default FormInput
