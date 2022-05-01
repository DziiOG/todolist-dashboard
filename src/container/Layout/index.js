import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Navbar from 'container/Navbar'
import Sidebar from '../Sidebar'

const Layout = ({
  children,
  height,
  pt,
  px,
  className,
  disableHeader,
  rightPanel,
  rightPanelChildren,
  ...rest
}) => (
  <Grid
    templateAreas='"header header" "aside main" "aside main"'
    templateColumns={{ md: rightPanel ? '14% 65.17% 20.83%' : '14% 86%' }}
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
      bg='white'
      className={className}
    >
      {!disableHeader && <Navbar {...rest} />}
      <Box
        w='100%'
        h='100%'
        overflowY='scroll'
        bg='white'
        px={px ?? 20}
        pt={pt ?? 28}
        pb={{ md: 10 }}
      >
        {children}
      </Box>
    </Box>
    {rightPanel && (
      <Box
        as='aside'
        gridArea='aside'
        pos='fixed'
        w='20.83%'
        overflowY='scroll'
        bottom={0}
        right={0}
        px={3}
        h='100vh'
        borderLeftWidth={1}
        borderLeftColor='gray.100'
        bg='white'
        zIndex={20}
      >
        {rightPanelChildren}
      </Box>
    )}
  </Grid>
)

Layout.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  disableHeader: PropTypes.any,
  height: PropTypes.string,
  pt: PropTypes.number,
  px: PropTypes.number,
  rightPanel: PropTypes.any,
  rightPanelChildren: PropTypes.any
}

export default Layout
