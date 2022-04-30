import { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Box, FormControl, FormLabel } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ListBoxButton from './MultiListBox/ListBoxButton'
import ListBoxOptions from './MultiListBox/ListBoxOptions'
import FormErrorHandler from './FormErrorHandler'

const FormMultiSelect = ({
  id,
  label,
  error,
  value,
  touched,
  options,
  required,
  placeholder,
  setFieldValue,
  setFieldTouched
}) => {
  const [isTouched, setTouched] = useState(false)

  function isSelected(_value) {
    return !!value?.find(el => el === _value)
  }

  function removePerson(item) {
    const removedSelection = value.filter(selected => selected !== item)
    setFieldValue(id, removedSelection)
  }

  function handleSelection(item) {
    const selectedResult = value.filter(selected => selected === item)

    if (selectedResult.length) {
      removePerson(item)
    } else {
      setFieldValue(id, [...value, item])
    }
  }

  return (
    <FormControl
      isRequired={required}
      onMouseLeave={() => isTouched && setFieldTouched(id, true)}
    >
      <FormLabel color='gray.500'>{label}</FormLabel>
      <Listbox
        as={Box}
        value={value}
        onChange={handleSelection}
        onClick={() => setTouched(true)}
      >
        {({ open }) => (
          <Box pos='relative'>
            <Box as='span' d='inline-block' w='full' rounded='md' shadow='sm'>
              <ListBoxButton
                placeholder={placeholder}
                selectedItems={value}
                removePerson={removePerson}
              />
            </Box>

            <Transition
              show={open}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              className='absolute mt-1 w-full rounded-md bg-white shadow-lg'
            >
              <ListBoxOptions data={options} isSelected={isSelected} />
            </Transition>
          </Box>
        )}
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

FormMultiSelect.propTypes = {
  id: PropTypes.any,
  label: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.any,
  touched: PropTypes.bool,
  options: PropTypes.array,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func
}

export default FormMultiSelect
