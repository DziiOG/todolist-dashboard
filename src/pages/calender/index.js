import { Box, Heading } from '@chakra-ui/react'
import CalenderDashboard from 'components/DashBoard/Calendar'
import Layout from 'container/Layout'
import { rem } from 'helpers/misc'
import React from 'react'

const Calender = () => (
  <Layout page={3} disableHeader rightPanel>
    <Box w='100%'>
      <Heading fontFamily='Avenir' fontWeight={900} fontSize='2xl'>
        Calender
      </Heading>
      <Box w='100%' mt={{ ...rem(16) }}>
        <CalenderDashboard />
      </Box>
    </Box>
  </Layout>
)

Calender.propTypes = {}

export default Calender
