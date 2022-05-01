import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading } from '@chakra-ui/react'

const FormCard = ({ children, title, w, textAlign }) => (
  <Box
    w={w}
    zIndex={0}
    bg='#FFFFFF 0% 0% no-repeat padding-box'
    p={{ base: 4, md: 8 }}
    mx={{ base: 'auto', md: 'initial' }}
    rounded='md'
    boxShadow='0px 1px 4px #F2F5FF33'
  >
    <Heading as='h6' textAlign={textAlign} fontSize={{ base: 'lg', md: 'xl' }}>
      {title}
    </Heading>
    {children}
  </Box>
)

FormCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  textAlign: PropTypes.string,
  w: PropTypes.any
}

export default FormCard
