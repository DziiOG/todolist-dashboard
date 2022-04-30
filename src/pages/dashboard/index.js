import { Box, Grid, Heading } from '@chakra-ui/react'
import BalanceOfTasks from 'components/DashBoard/BalanceOfTasks'
import Overview from 'components/DashBoard/Overview'
import TasksList from 'components/DashBoard/TasksList'
import Layout from 'container/Layout'
import { rem } from 'helpers/misc'
import React from 'react'

const DashBoard = () => (
  <Layout page={1}>
    <Box w='100%'>
      <Heading fontFamily='Avenir' fontWeight={900} fontSize='2xl'>
        Dashboard
      </Heading>

      <Grid
        mt={{ ...rem(32) }}
        w='100%'
        gap={{ ...rem(143) }}
        templateColumns={{ md: 'repeat(2, 1fr)' }}
      >
        <Overview />
        <BalanceOfTasks />
      </Grid>
      <Box>
        <TasksList />
      </Box>
    </Box>
  </Layout>
)
DashBoard.propTypes = {}

export default DashBoard
