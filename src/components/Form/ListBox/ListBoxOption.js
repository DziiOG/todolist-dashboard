import React from 'react'
import { Box, Flex, Icon, ListItem, Text } from '@chakra-ui/react'
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
        bg={active ? '#f2f5ff' : 'white'}
        color={active ? '#29325a' : 'gray.700'}
      >
        <Flex w='100%' align='center'>
          {item?.icon ? (
            <Icon
              as={item?.icon}
              mr={3}
              boxSize={6}
              color={item?.iconColor || '#29325a'}
            />
          ) : null}
          <Text
            color={item?.textColor}
            fontFamily={'Avenir'}
            isTruncated
            fontWeight={selected ? 'medium' : 'normal'}
          >
            {item?.name ?? item}
          </Text>
        </Flex>
      </Box>
    )}
  </Listbox.Option>
)

ListBoxOption.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.any,
    iconColor: PropTypes.string,
    id: PropTypes.any,
    name: PropTypes.string,
    textColor: PropTypes.any
  })
}

export default ListBoxOption
