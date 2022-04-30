import React from 'react'
import { Flex, Icon, List, Text } from '@chakra-ui/react'
import { BiCheck } from 'react-icons/bi'
import { Listbox } from '@headlessui/react'
import PropTypes from 'prop-types'

const ListBoxOption = ({ selected, item }) => (
  <Listbox.Option as={List} key={item} value={item}>
    {({ active }) => (
      <Flex
        py={2}
        pl={8}
        pr={4}
        w='full'
        pos='relative'
        align='center'
        cursor='pointer'
        userSelect='none'
        bg={active ? 'cf.400' : ''}
        color={active ? 'white' : 'cf.400'}
      >
        <Text
          as='span'
          fontWeight={selected ? 'semibold' : 'normal'}
          isTruncated
          d='block'
        >
          {item.replace(/[^a-zA-Z ]/g, '')}
        </Text>
        {selected && (
          <Flex
            pl={1}
            left={0}
            as='span'
            pos='absolute'
            color={active ? 'white' : 'brand.blue.200'}
          >
            <Icon as={BiCheck} boxSize={5} />
          </Flex>
        )}
      </Flex>
    )}
  </Listbox.Option>
)

ListBoxOption.propTypes = {
  selected: PropTypes.any,
  item: PropTypes.any
}

export default ListBoxOption
