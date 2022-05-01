import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading } from '@chakra-ui/react'

const FormCard = ({ children, title, w, textAlign, pt, mt }) => (
  <Box
    w={w}
    zIndex={0}
    bg='#FFFFFF 0% 0% no-repeat padding-box'
    p={{ base: 4, md: 8 }}
    mx={{ base: 'auto', md: 'initial' }}
    rounded='2xl'
    boxShadow='0px 1px 4px #F2F5FF33'
    pt={pt}
  >
    <Heading
      mt={mt}
      fontFamily='CaligatureHunters'
      as='h6'
      textAlign={textAlign}
      color='#29325a'
      fontSize={{ base: 'lg', md: '5xl' }}
    >
      {title}
    </Heading>
    {children}
  </Box>
)

FormCard.propTypes = {
  children: PropTypes.node.isRequired,
  mt: PropTypes.any,
  pt: PropTypes.any,
  textAlign: PropTypes.string,
  title: PropTypes.string.isRequired,
  w: PropTypes.any
}

export default FormCard
