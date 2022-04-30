import PropTypes from 'prop-types'
import React from 'react'
import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'

const SearchInput = ({
  handleSearchInputChange,
  searchIsDisabled,
  ...rest
}) => (
  <InputGroup width={rest?.width || 64} height={rest?.height}>
    <InputLeftElement pointerEvents='none'>
      <Icon as={BiSearch} color='gray.200' />
    </InputLeftElement>
    <Input
      {...rest}
      onChange={handleSearchInputChange}
      isDisabled={searchIsDisabled}
      bg='white'
      name='searchBox'
      color='primary'
      h={rest?.height}
      placeholder='Search'
      rounded='lg'
      _focus={{ outline: 'none' }}
      _active={{ outline: 'none' }}
    />
  </InputGroup>
)

SearchInput.propTypes = {
  handleSearchInputChange: PropTypes.any,
  searchIsDisabled: PropTypes.any
}

export default SearchInput
