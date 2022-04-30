import React from 'react'
import { Box, Text, Flex, Icon } from '@chakra-ui/react'
import { IoMdClose } from 'react-icons/io'
import { FiChevronDown } from 'react-icons/fi'
import { Listbox } from '@headlessui/react'
import PropTypes from 'prop-types'

const ListBoxButton = ({ placeholder, removePerson, selectedItems }) => (
  <Listbox.Button
    h='100%'
    as={Box}
    py={2}
    pl={5}
    pr={10}
    w='full'
    rounded='md'
    pos='relative'
    minH={{ md: 12 }}
    textAlign='left'
    borderWidth={1}
    cursor='default'
    _focus={{
      boxShadow: '0 0 0 1px #3182ce',
      borderColor: '#3182ce'
    }}
    bg='white'
  >
    {!selectedItems?.length && (
      <Text fontSize={{ md: 'lg' }} as='span' color='gray.300'>
        {placeholder}
      </Text>
    )}
    {selectedItems?.map((item, index) => (
      <Flex
        d='inline-flex'
        align='center'
        px={1}
        mr={1}
        mt={1}
        rounded='md'
        color='white'
        bg='cf.400'
        key={(i => i)(index)}
        fontSize={{ md: 'sm' }}
      >
        {item?.replace(/[^a-zA-Z ]/g, '')}
        <Flex
          align='center'
          justify='center'
          ml={1}
          bg='brand.blue.200'
          rounded='full'
          cursor='pointer'
          w={4}
          h={4}
          onClick={() => removePerson(item)}
        >
          <Icon as={IoMdClose} />
        </Flex>
      </Flex>
    ))}
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
)

ListBoxButton.propTypes = {
  placeholder: PropTypes.string,
  removePerson: PropTypes.func,
  selectedItems: PropTypes.array
}

export default ListBoxButton
