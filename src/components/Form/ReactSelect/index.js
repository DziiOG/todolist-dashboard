import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { FiChevronDown } from 'react-icons/fi'
import FormErrorHandler from '../FormErrorHandler'

const MotionList = motion(UnorderedList)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const ReactSelect = ({
  label,
  id,
  placeholder,
  value,
  setFieldValue,
  asReadOnly,
  data,
  error,
  touched,
  setFieldTouched,
  required,
  height = { md: 12 },
  // onChange,
  ...rest
}) => {
  const [isTouched, setTouched] = useState(false)

  return (
    <FormControl
      isRequired={required}
      onMouseLeave={() => isTouched && setFieldTouched(id, true)}
    >
      {label && (
        <FormLabel color='gray.500' fontSize='sm' fontWeight='normal'>
          {label}
        </FormLabel>
      )}
      <Listbox
        value={value}
        onChange={e => {
          setFieldValue(id, e)
        }}
      >
        <Box mt={1} pos='relative'>
          <Listbox.Button
            as={Flex}
            py={2}
            pl={5}
            pr={10}
            w='full'
            rounded='md'
            pos='relative'
            h={height}
            align='center'
            borderWidth={1}
            cursor='pointer'
            fontSize='sm'
            _focus={{ boxShadow: '0 0 0 1px #3182ce', borderColor: '#3182ce' }}
            bg='white'
            {...rest}
          >
            <Text as='span' isTruncated fontSize='sm'>
              {value ? (
                value?.name || value
              ) : (
                <Text color='gray.300' fontSize={{ base: 'sm', '5xl': 'md' }}>
                  {placeholder}
                </Text>
              )}
            </Text>
            <Flex
              align='center'
              pos='absolute'
              top={0}
              bottom={0}
              right={0}
              pr={2}
              pointerEvents='none'
            >
              <Icon as={FiChevronDown} boxSize={5} color='gray.400' />
            </Flex>
          </Listbox.Button>
          {!asReadOnly && (
            <AnimatePresence>
              <Listbox.Options
                as={MotionList}
                listStyleType='none'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { ...transition } }}
                exit={{ opacity: 0, transition: { ...transition } }}
                ml={0}
                pos='absolute'
                w='full'
                py={1}
                mt={1}
                overflow='auto'
                fontSize='md'
                bg='white'
                rounded='md'
                shadow='lg'
                maxH={64}
                borderWidth={1}
                zIndex={2}
              >
                {data?.map((item, index) => (
                  <Listbox.Option
                    as={ListItem}
                    key={(i => i)(index)}
                    value={item}
                  >
                    {({ active, selected }) => (
                      <Box
                        py={2}
                        pos='relative'
                        px={4}
                        userSelect='none'
                        cursor='pointer'
                        bg={active ? 'cf.400' : ''}
                        color={active ? 'white' : 'gray.700'}
                      >
                        <Text
                          isTruncated
                          fontWeight={selected ? 'medium' : 'normal'}
                        >
                          {item.name || item}
                        </Text>
                      </Box>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </AnimatePresence>
          )}
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

ReactSelect.propTypes = {
  label: PropTypes.any,
  placeholder: PropTypes.any,
  value: PropTypes.any,
  setFieldValue: PropTypes.func,
  asReadOnly: PropTypes.any,
  data: PropTypes.any,
  id: PropTypes.any,
  error: PropTypes.any,
  height: PropTypes.any,
  touched: PropTypes.any,
  setFieldTouched: PropTypes.func,
  required: PropTypes.bool
  // onChange: PropTypes.func
}

export default ReactSelect
