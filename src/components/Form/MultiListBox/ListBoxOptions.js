import React from 'react'
import { UnorderedList } from '@chakra-ui/react'
import { Listbox } from '@headlessui/react'
import PropTypes from 'prop-types'
import ListBoxOption from './ListBoxOption'

const ListBoxOptions = ({ data, isSelected }) => (
  <Listbox.Options
    as={UnorderedList}
    static
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
    {data?.map((item, index) => {
      const selected = isSelected(item)
      return (
        <ListBoxOption key={(i => i)(index)} selected={selected} item={item} />
      )
    })}
  </Listbox.Options>
)

ListBoxOptions.propTypes = {
  data: PropTypes.array,
  isSelected: PropTypes.func
}

export default ListBoxOptions
