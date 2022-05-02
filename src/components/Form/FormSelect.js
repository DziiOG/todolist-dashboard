import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  Flex
} from '@chakra-ui/react'

import PropTypes from 'prop-types'
import ListBoxButton from './ListBox/ListBoxButton'
import ListBoxOptions from './ListBox/ListBoxOptions'
import FormErrorHandler from './FormErrorHandler'

const FormSelect = ({
  id,
  bg,
  label,
  error,
  value,
  helper,
  touched,
  iconColor,
  options,
  required,
  placeholder,
  setFieldValue,
  setFieldTouched,
  borderWidth,
  fontWeight,
  focusState,
  selector,
  _placeholder,
  hasSpan,
  spanInfo,
  leftIcon,
  ...rest
}) => {
  const [isTouched, setTouched] = useState(false)

  return (
    <FormControl
      isRequired={required}
      onMouseLeave={() => isTouched && setFieldTouched(id, true)}
    >
      <Flex align='center'>
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
          <Text
            font='oblique normal 300 16px/22px Avenir'
            fontSize='xs'
            mb={1}
            ml={-2}
          >
            {spanInfo}{' '}
          </Text>
        )}
      </Flex>
      {helper && (
        <FormHelperText mt={-2} mb={2} fontSize='xs' color='gray.400'>
          {helper}
        </FormHelperText>
      )}
      <Listbox
        as={Box}
        value={value}
        onClick={() => setTouched(true)}
        onChange={e => setFieldValue(id, e?.id || e)}
      >
        <Box mt={1} pos='relative'>
          <ListBoxButton
            leftIcon={leftIcon}
            iconColor={iconColor}
            selected={
              typeof options[0] !== 'string'
                ? options?.find(e => e.id === value)?.name
                : value
            }
            placeholder={placeholder}
            bg={bg}
            borderWidth={borderWidth || 1.2}
            _placeholder={_placeholder || { fontSize: { base: 'sm' } }}
            _focus={focusState}
            {...rest}
          />
          <ListBoxOptions options={options} w={rest.w} selector={selector} />
        </Box>
      </Listbox>
      <FormErrorHandler
        error={error}
        touched={touched}
        onClear={() => {
          setTouched(false)
          setFieldTouched(id, false)
        }}
      />
    </FormControl>
  )
}

FormSelect.propTypes = {
  _placeholder: PropTypes.shape({
    fontSize: PropTypes.shape({
      base: PropTypes.string
    })
  }),
  bg: PropTypes.any,
  borderWidth: PropTypes.number,
  error: PropTypes.bool,
  focusState: PropTypes.any,
  fontWeight: PropTypes.number,
  hasSpan: PropTypes.any,
  helper: PropTypes.string,
  iconColor: PropTypes.any,
  id: PropTypes.any,
  label: PropTypes.string,
  leftIcon: PropTypes.any,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  selector: PropTypes.any,
  setFieldTouched: PropTypes.func,
  setFieldValue: PropTypes.func,
  spanInfo: PropTypes.any,
  touched: PropTypes.bool,
  value: PropTypes.string
}

export default FormSelect
