import React from 'react'
import { Box, ListItem, Text } from '@chakra-ui/react'
import { Listbox } from '@headlessui/react'
import PropTypes from 'prop-types'

const ListBoxOption = ({ item }) => (
  <Listbox.Option as={ListItem} key={item?.id || item} value={item}>
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
        <Text isTruncated fontWeight={selected ? 'medium' : 'normal'}>
          {item?.name ?? item}
        </Text>
      </Box>
    )}
  </Listbox.Option>
)

ListBoxOption.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string
  })
}

export default ListBoxOption
