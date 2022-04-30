import React from 'react'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'
import { Listbox } from '@headlessui/react'
import PropTypes from 'prop-types'

const ListBoxButton = ({ selected, placeholder, bg, leftIcon, ...rest }) => (
  <Listbox.Button
    py={2}
    pl={5}
    pr={10}
    as={Flex}
    w='full'
    rounded='md'
    pos='relative'
    h={{ md: 12 }}
    align='center'
    borderWidth={1}
    cursor='pointer'
    _focus={{ boxShadow: '0 0 0 1px #3182ce', borderColor: '#3182ce' }}
    {...rest}
    bg={bg}
  >
    {leftIcon && (
      <Flex
        align='center'
        pos='absolute'
        top={0}
        bottom={0}
        left={0}
        pl={2}
        pointerEvents='none'
      >
        <Icon as={leftIcon} boxSize={6} color='#29325a' />
      </Flex>
    )}
    <Text ml={leftIcon ? 5 : 0} as='span' isTruncated fontSize='sm'>
      {selected ? (
        selected?.name || selected
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
)

ListBoxButton.propTypes = {
  bg: PropTypes.any,
  leftIcon: PropTypes.any,
  placeholder: PropTypes.any,
  selected: PropTypes.shape({
    name: PropTypes.string
  })
}

export default ListBoxButton
