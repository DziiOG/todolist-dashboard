import {
  Box,
  Flex,
  Heading,
  Icon,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import Button from 'components/Button'
import { columns, data } from 'components/DashBoard/TasksList'
import Table from 'components/Table'
import Layout from 'container/Layout'
import { SearchInput } from 'container/Navbar'
import { rem } from 'helpers/misc'
import React from 'react'
import { BsPlus } from 'react-icons/bs'

const FilterSelectors = () => (
  <Flex align='center'>
    <Select
      color='#29325A'
      fontFamily='Avenir'
      fontStyle='normal'
      fontWeight={900}
      w={{ ...rem(142) }}
      h={{ ...rem(44) }}
      placeholder='Filter by'
      mr={{ md: 5 }}
    />
    <Select
      w={{ ...rem(142) }}
      h={{ ...rem(44) }}
      color='#29325A'
      fontFamily='Avenir'
      fontStyle='normal'
      fontWeight={900}
      placeholder='Sort by'
    />
  </Flex>
)
export const TaskFilter = () => (
  <Flex mb={{ ...rem(30) }} w='100%' justify='space-between' align='center'>
    <SearchInput />
    <FilterSelectors />
  </Flex>
)

const Tasks = () => (
  <Layout disableSearch page={2}>
    <Box w='100%'>
      <Heading fontFamily='Avenir' fontWeight={900} fontSize='2xl'>
        Tasks
      </Heading>
    </Box>
    <Box w='100%' mt={{ ...rem(49) }}>
      <Tabs>
        <TabList fontWeight={700} fontSize='lg' color='#6E7575'>
          <Tab
            _focus={{ outline: 'none' }}
            _selected={{
              fontSize: 'xl',
              outline: 'none',
              fontFamily: 'Avenir',
              color: '#677acb',
              fontWeight: 900,
              borderBottomWidth: rem(5),

              borderBottomColor: '#677acb'
            }}
            fontSize={{ md: 'xl' }}
            fontWeight={500}
            fontFamily='Avenir'
            color='#29325A'
            px={{ md: 10 }}
          >
            All
          </Tab>
          <Tab
            _focus={{ outline: 'none' }}
            _selected={{
              fontSize: 'xl',
              fontFamily: 'Avenir',
              outline: 'none',
              color: '#677acb',
              fontWeight: 900,
              borderBottomWidth: rem(5),

              borderBottomColor: '#677acb'
            }}
            fontSize={{ md: 'xl' }}
            fontWeight={500}
            px={{ md: 10 }}
            fontFamily='Avenir'
            color='#29325A'
          >
            Today
          </Tab>
          <Tab
            _focus={{ outline: 'none' }}
            px={{ md: 10 }}
            _selected={{
              fontSize: 'xl',
              fontFamily: 'Avenir',
              outline: 'none',
              color: '#677acb',
              fontWeight: 900,
              borderBottomWidth: rem(5),

              borderBottomColor: '#677acb'
            }}
            fontWeight={500}
            fontFamily='Avenir'
            fontSize={{ md: 'xl' }}
            color='#29325A'
          >
            Upcoming
          </Tab>
          <Tab
            _focus={{ outline: 'none' }}
            px={{ md: 10 }}
            _selected={{
              fontSize: 'xl',
              fontFamily: 'Avenir',
              outline: 'none',
              color: '#677acb',
              fontWeight: 900,
              borderBottomWidth: rem(5),
              borderBottomColor: '#677acb'
            }}
            fontWeight={500}
            fontSize={{ md: 'xl' }}
            fontFamily='Avenir'
            color='#29325A'
          >
            Past tasks
          </Tab>
          <Flex align='center' justify='right' w='59.5%'>
            <Button
              mb={{ md: 3 }}
              h={{ ...rem(44) }}
              w={{ ...rem(153) }}
              borderRadius={{ ...rem(10) }}
              leftIcon={<Icon boxSize={6} color='white' as={BsPlus} />}
              title='Add task'
            />
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box w='100%' h='100%' overflowY='scroll' position='relative'>
              <TaskFilter />
              <Table columns={columns} data={data} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w='100%' h='100%' overflowY='scroll' position='relative'>
              <TaskFilter />
              <Table columns={columns} data={data} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w='100%' h='100%' overflowY='scroll' position='relative'>
              <TaskFilter />
              <Table columns={columns} data={data} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w='100%' h='100%' overflowY='scroll' position='relative'>
              <TaskFilter />
              <Table columns={columns} data={data} />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </Layout>
)

Tasks.propTypes = {}

export default Tasks