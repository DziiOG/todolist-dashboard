import PropTypes from 'prop-types'
import React from 'react'
import {
  Box,
  Flex,
  Icon,
  HStack,
  Text,
  Avatar,
  Stack,
  InputGroup,
  InputLeftElement,
  Input
} from '@chakra-ui/react'
// import { BsBell } from 'react-icons/bs'
import { Bell, ChevronDown, Search } from 'theme/custom-icons'
import { rem } from 'helpers/misc'

export const SearchInput = () => (
  <InputGroup
    border='transparent'
    outline='none'
    _focus={{ border: 'none', outline: 'none' }}
    _hover={{ outline: 'none' }}
    borderRadius={{ ...rem(10) }}
    bg='#F2F5FF 0% 0% no-repeat padding-box;'
    w={{ ...rem(497) }}
  >
    <InputLeftElement pointerEvents='none'>
      <Icon as={Search} color='#29325A66' />
    </InputLeftElement>
    <Input
      fontSize='sm'
      _placeholder={{
        fontSize: 'sm',
        color: '#29325A66'
      }}
      type='tel'
      placeholder='Search Anything'
    />
  </InputGroup>
)
const Navbar = ({ disableSearch }) => (
  <Flex
    w='86%'
    as='nav'
    gridArea='header'
    align='center'
    bg='white'
    justify='space-between'
    h={{ md: 16 }}
    pos='fixed'
    zIndex={50}
    px={{ md: 24 }}
    py={{ md: 10 }}
  >
    <Flex justify='right' w='75%'>
      {!disableSearch && (
        <Stack spacing={4}>
          <SearchInput />
        </Stack>
      )}
    </Flex>
    <HStack w='25%' spacing='1.5rem'>
      <Flex align='center' w='100%' justify='right'>
        <Box mr={10}>
          <Icon as={Bell} color='#29325a' boxSize={6} />
        </Box>
        <Box mx={4} pos='relative'>
          <Avatar size='md' />
        </Box>
        <Box>
          <Text> Janet Jackson </Text>
        </Box>
        <Box mx={2}>
          <Icon as={ChevronDown} size={6} />
        </Box>
      </Flex>
    </HStack>
  </Flex>
)

Navbar.propTypes = {
  disableSearch: PropTypes.any
}

export default Navbar
