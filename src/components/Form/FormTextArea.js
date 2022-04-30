import { Flex, FormControl, FormLabel, Text, Textarea } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FormErrorHandler from './FormErrorHandler'

const FormTextArea = ({
  label,
  error,
  touched,
  required,
  setFieldTouched,
  hasSpan,
  spanInfo,
  ...rest
}) => (
  <FormControl id={rest.id || rest.name} isRequired={required}>
    <Flex color='gray.500'>
      <FormLabel
        fontSize='lg'
        fontFamily='Avenir'
        color='#29325a'
        fontWeight={500}
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
    <Textarea
      rounded='md'
      size='sm'
      _focus={{ borderColor: 'cf.400' }}
      {...rest}
    />
    <FormErrorHandler
      error={error}
      touched={touched}
      onClear={() => setFieldTouched(rest.id || rest.name || '', false)}
    />
  </FormControl>
)

FormTextArea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.any,
  touched: PropTypes.bool,
  required: PropTypes.bool,
  setFieldTouched: PropTypes.func,
  hasSpan: PropTypes.bool,
  spanInfo: PropTypes.string
}

export default FormTextArea
