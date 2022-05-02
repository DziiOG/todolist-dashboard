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
import { columns } from 'components/DashBoard/TasksList'
import Spinner from 'components/FetchCard/Spinner'
import Table from 'components/Table'
import Layout from 'container/Layout'
import { SearchInput } from 'container/Navbar'
import useApi from 'context/useApi'
import useAuth from 'context/useAuth'
import useComponent from 'context/useComponent'
import { rem } from 'helpers/misc'
import moment from 'moment'
import React from 'react'
import { BsPlus } from 'react-icons/bs'
import { useQuery } from 'react-query'

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
    <SearchInput w={{ ...rem(300) }} h={{ ...rem(44) }} />
    <FilterSelectors />
  </Flex>
)

const Tasks = () => {
  const { handleModalClick } = useComponent()

  const { getTasks } = useApi()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { data, isLoading, error, refetch } = useQuery(
    [`tasks_user${user?._id}`],
    async () => {
      if (user?._id) {
        return await getTasks({ user: user?._id })
      }
    },
    {
      staleTime: 90000
    }
  )

  console.log(data?.data, 'items')

  return (
    <Layout disableSearch page={2}>
      <Spinner
        w='100%'
        h='100vh'
        hook={{
          loading: isLoading,
          error,
          triggerReload: () => refetch()
        }}
      >
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
                  onClick={() => {
                    handleModalClick('taskModal')
                  }}
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
                  <Table columns={columns} data={data?.data || []} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box w='100%' h='100%' overflowY='scroll' position='relative'>
                  <TaskFilter />
                  <Table
                    columns={columns}
                    data={data?.data?.filter(item => {
                      const today = moment().format('MM/DD/YYYY')
                      const date = moment(item?.dueDate).format('MM/DD/YYYY')
                      return date === today
                    })}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box w='100%' h='100%' overflowY='scroll' position='relative'>
                  <TaskFilter />
                  <Table
                    columns={columns}
                    data={data?.data?.filter(item =>
                      moment(item.dueDate).isAfter()
                    )}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box w='100%' h='100%' overflowY='scroll' position='relative'>
                  <TaskFilter />
                  <Table
                    columns={columns}
                    data={data?.data?.filter(item =>
                      moment(item.dueDate).isBefore()
                    )}
                  />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Spinner>
    </Layout>
  )
}

Tasks.propTypes = {}

export default Tasks
