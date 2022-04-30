import React from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Button = ({ title, colorScheme = 'primaryButton', ...rest }) => (
  <ChakraButton
    colorScheme={colorScheme}
    _focus={{ outline: 'none' }}
    h={{ md: 14 }}
    {...rest}
  >
    {title}
  </ChakraButton>
)

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  colorScheme: PropTypes.string
}

export default Button
