import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Navbar from 'container/Navbar'
import Sidebar from '../Sidebar'

const Layout = ({ children, height, pt, px, className, ...rest }) => (
  <Grid
    templateAreas='"header header" "aside main" "aside main"'
    templateColumns={{ md: '14% 86%' }}
    pos='relative'
  >
    <Sidebar {...rest} />
    <Box
      as='main'
      fontFamily='body'
      fontSize={{ md: 'md' }}
      gridArea='main'
      w='100%'
      color='gray.800'
      h={height || '100vh'}
      className={className}
    >
      <Navbar {...rest} />
      <Box w='100%' h='100%' px={px ?? 20} pt={pt ?? 28}>
        {children}
      </Box>
    </Box>
  </Grid>
)

Layout.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  height: PropTypes.any,
  pt: PropTypes.number,
  px: PropTypes.number
}

export default Layout
