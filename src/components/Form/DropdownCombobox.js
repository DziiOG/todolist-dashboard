import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useCombobox } from 'downshift'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Icon
} from '@chakra-ui/react'
import { Box, Flex } from '@chakra-ui/layout'

export default function DropdownCombobox({
  selectedItem,
  handleSelectedItemChange,
  items,
  placeholder,
  name,
  label,
  icon,
  isReadOnly
}) {
  const [inputItems, setInputItems] = useState(items)

  const {
    isOpen,
    getMenuProps,
    getLabelProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps
  } = useCombobox({
    items: inputItems,
    selectedItem,
    onSelectedItemChange: handleSelectedItemChange,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items?.filter(
          item =>
            item?.firstName
              ?.toLowerCase()
              .startsWith(inputValue?.toLowerCase()) ||
            item?.lastName
              ?.toLowerCase()
              .startsWith(inputValue?.toLowerCase()) ||
            item?.email?.toLowerCase().startsWith(inputValue?.toLowerCase())
        )
      )
    }
  })

  return (
    <FormControl isReadOnly={isReadOnly} pos='relative'>
      <FormLabel
        {...getLabelProps()}
        color='gray.500'
        fontSize='sm'
        fontWeight='normal'
      >
        {label}
      </FormLabel>
      <Box {...getComboboxProps()}>
        <InputGroup display='flex' alignItems='center'>
          {icon && (
            <InputLeftElement pointerEvents='none' mt={1}>
              <Icon as={icon} boxSize={6} color='gray.300' />
            </InputLeftElement>
          )}
          <Input
            name={name}
            placeholder={placeholder}
            size='lg'
            fontSize='sm'
            _placeholder={{ fontSize: 'sm' }}
            {...getInputProps()}
          />
        </InputGroup>
      </Box>
      <List
        {...getMenuProps()}
        maxH={64}
        w='100%'
        overflowY='scroll'
        bg='white'
        p={isOpen ? 4 : 0}
        pos='absolute'
        zIndex={10}
        mt={2}
        border={isOpen && '1px solid #F4F4F5'}
        rounded='lg'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      >
        {isOpen &&
          inputItems?.map(({ _id, firstName, lastName, email }, index) => (
            <ListItem
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              fontFamily='body'
              fontSize={'sm'}
              py={1}
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${_id}${index}`}
              {...getItemProps({ firstName, index })}
            >
              <Flex align='center'>
                {firstName} {lastName}
              </Flex>{' '}
              {email}
            </ListItem>
          ))}
      </List>
    </FormControl>
  )
}

DropdownCombobox.propTypes = {
  handleSelectedItemChange: PropTypes.any,
  isReadOnly: PropTypes.any,
  items: PropTypes.shape({
    filter: PropTypes.func
  }),
  label: PropTypes.any,
  name: PropTypes.any,
  icon: PropTypes.any,
  placeholder: PropTypes.any,
  selectedItem: PropTypes.any
}
