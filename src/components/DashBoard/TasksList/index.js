import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import { FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Table from 'components/Table'

function TasksList() {
  const navigate = useNavigate()

  const columns = [
    {
      name: 'Task name',
      selector: 'name'
    },
    {
      name: 'Description',
      selector: 'description'
    },
    {
      name: 'Category',
      selector: 'category'
    },
    {
      name: 'Due date',
      selector: 'dueDate'
    },
    {
      name: 'Status',
      selector: 'status'
    }
  ]
  const data = [
    {
      name: 'Call gardener',
      description: 'Ask Jonas to mow lawn today',
      category: 'House-keeping',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      status: 'IN_PROGRESS'
    },
    {
      name: 'Call gardener',
      description: 'Ask Jonas to mow lawn today',
      category: 'House-keeping',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      status: 'IN_PROGRESS'
    },
    {
      name: 'Call gardener',
      description: 'Ask Jonas to mow lawn today',
      category: 'House-keeping',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      status: 'IN_PROGRESS'
    },
    {
      name: 'Call gardener',
      description: 'Ask Jonas to mow lawn today',
      category: 'House-keeping',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      status: 'IN_PROGRESS'
    }
  ]
  return (
    <Box mt={{ ...rem(40) }}>
      <Flex w='100%' align='center' justify='space-between'>
        <Text
          color='#29325A'
          fontWeight={500}
          fontFamily='Avenir'
          fontSize='xl'
          mb={{ ...rem(16) }}
        >
          Tasks list
        </Text>

        <Flex as='button' onClick={() => navigate('/tasks')} align='center'>
          <Text
            color='#677ACB;'
            fontWeight={900}
            fontFamily='Avenir'
            fontSize='sm'
            mr={{ md: 2 }}
          >
            View all
          </Text>
          <Icon color='#677ACB' as={FiChevronRight} boxSize={6} />
        </Flex>
      </Flex>

      <Box
        w='100%'
        mt={{ ...rem(24) }}
        boxShadow='0px 1px 4px #FFFFFF1A'
        border='1px solid #29325A33'
        borderRadius={{ ...rem(20) }}
        p={{ ...rem(20) }}
      >
        <Table data={data} columns={columns} />
      </Box>
    </Box>
  )
}

TasksList.propTypes = {}

export default TasksList
