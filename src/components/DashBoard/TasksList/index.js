import React from 'react'
import { Box, Checkbox, Flex, Icon, Tag, Text } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import { FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Table from 'components/Table'
import { AiOutlineCheck } from 'react-icons/ai'
import TableAction from 'components/Table/TableAction'
import moment from 'moment'

export const columns = [
  {
    name: 'Task name',
    selector: row => (
      <Flex>
        <Checkbox
          icon={<Icon color='black' as={AiOutlineCheck} />}
          colorScheme='green'
        >
          <Text ml={2}>{row?.name}</Text>
        </Checkbox>
      </Flex>
    )
  },
  {
    name: 'Description',
    selector: 'description'
  },
  {
    name: 'Category',
    selector: row => (
      <Tag
        color='#29325A'
        borderRadius={{ ...rem(10) }}
        p={3}
        bg={row.category.color}
      >
        {row.category.name}
      </Tag>
    )
  },
  {
    name: 'Date created',
    selector: row => <Text>{moment(row?.createdAt).format('DD/MM/YYYY')}</Text>
  },
  {
    name: 'Due date',
    selector: row => <Text>{moment(row?.dueDate).format('DD/MM/YYYY')}</Text>
  },
  {
    name: 'Status',
    selector: 'status'
  },
  {
    overflow: false,
    selector: row => (
      <TableAction
        options={[
          {
            id: 1,
            name: 'Edit',
            path: `/tasks/${row?._id}`,
            state: row
          },
          {
            id: 2,
            name: 'Delete',
            state: 'action'
          }
        ]}
      />
    )
  }
]
export const data = [
  {
    name: 'Call gardener',
    description: 'Ask Jonas to mow lawn today',
    category: { color: '#ff00ff', name: 'House-keeping' },
    createdAt: new Date().toDateString(),
    dueDate: new Date().toDateString(),
    status: 'IN_PROGRESS'
  }
]
function TasksList() {
  const navigate = useNavigate()

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
