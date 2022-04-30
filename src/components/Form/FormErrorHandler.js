import React from 'react'
import { FiX } from 'react-icons/fi'
import { Text, Fade, Flex, IconButton } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const FormErrorHandler = ({ onClear, error, touched }) => (
  <Fade in={!!error && touched}>
    <Flex
      borderBottomRadius='md'
      justify='space-between'
      align='center'
      bgColor='white'
      color='red.500'
      pos='absolute'
      zIndex={10}
      shadow='md'
      w='full'
      p={3}
    >
      <Text
        fontSize='xs'
        dangerouslySetInnerHTML={{
          __html: error
        }}
      />
      <IconButton
        boxSize={6}
        icon={<FiX />}
        bg='transparent'
        aria-label='close'
        onClick={onClear}
        _hover={{ bg: 'transparent' }}
        _focus={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
      />
    </Flex>
  </Fade>
)

FormErrorHandler.propTypes = {
  onClear: PropTypes.func,
  error: PropTypes.bool,
  touched: PropTypes.bool
}

export default FormErrorHandler
