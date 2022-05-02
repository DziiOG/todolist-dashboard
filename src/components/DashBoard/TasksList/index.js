import PropTypes from 'prop-types'
import React from 'react'
import { Box, Flex, Icon, Text, useToast } from '@chakra-ui/react'
import { rem, toastError } from 'helpers/misc'
import { FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Table from 'components/Table'
import { AiOutlineCheck } from 'react-icons/ai'
import TableAction from 'components/Table/TableAction'
import moment from 'moment'
import Spinner from 'components/FetchCard/Spinner'
import { useQuery, useQueryClient } from 'react-query'
import useApi from 'context/useApi'
import useAuth from 'context/useAuth'

const colors = [
  {
    color: '#677ACB66',
    id: 'IN_PROGRESS'
  },
  {
    color: '#F4FFF2',
    id: 'COMPLETED'
  },
  { color: '#A867CB33', id: 'PENDING' },
  { color: '#8A904833', id: 'RESCHEDULED' }
]

const Checker = ({ name, status, _id }) => {
  const [check, setCheck] = React.useState(status === 'COMPLETED')
  const queryClient = useQueryClient()
  const { setSession, isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { updateTask } = useApi()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (status === 'COMPLETED') {
      setCheck(status === 'COMPLETED')
    }
  }, [status])
  const toast = useToast()

  return (
    <Flex align='center'>
      <Spinner
        w='100%'
        h='4'
        hook={{
          loading,
          error: null
        }}
      >
        <Flex
          as='button'
          align='center'
          justify='center'
          w={{ ...rem(15) }}
          h={{ ...rem(15) }}
          onClick={async () => {
            try {
              setLoading(true)
              await updateTask(_id, {
                status: status === 'COMPLETED' ? 'COMPLETED' : 'PENDING'
              })
              await queryClient.invalidateQueries([`tasks_user${user?._id}`])

              setCheck(!check)
            } catch (error) {
              toastError(error, toast, setSession)
            } finally {
              setLoading(false)
            }
          }}
          borderWidth='1px'
          borderColor='#29325A'
        >
          {check && <Icon as={AiOutlineCheck} />}
        </Flex>
        <Text ml={2}>{name}</Text>
      </Spinner>
    </Flex>
  )
}

Checker.propTypes = {
  _id: PropTypes.any,
  name: PropTypes.any,
  status: PropTypes.string
}
export const columns = [
  {
    name: 'Task name',
    selector: row => (
      <Checker _id={row?._id} name={row?.name} status={row?.status} />
    )
  },
  {
    name: 'Description',
    selector: 'description'
  },
  {
    name: 'Category',
    selector: row => (
      <Flex
        justify='center'
        align='center'
        bg={`${row?.category?.color}33`}
        borderRadius={{ ...rem(10) }}
        p={3}
        color={'#29325A'}
      >
        {row.category.name}
      </Flex>
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
    selector: row => (
      <Flex
        justify='center'
        align='center'
        bg={colors?.find(item => item?.id === row?.status)?.color}
        borderRadius={{ ...rem(15) }}
        p={3}
        color={'#29325A'}
      >
        <Text textTransform='capitalize'>
          {row?.status?.replace('_', ' ')?.toLowerCase()}
        </Text>
      </Flex>
    )
  },
  {
    overflow: false,
    selector: row => (
      <TableAction
        options={[
          {
            id: 1,
            name: 'Edit',
            state: 'taskModal',
            data: row
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

  return (
    <Spinner
      w='100%'
      h='md'
      hook={{
        loading: isLoading,
        error,
        triggerReload: () => refetch()
      }}
    >
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
          <Table
            data={
              data?.data
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5) || []
            }
            columns={columns}
          />
        </Box>
      </Box>
    </Spinner>
  )
}

TasksList.propTypes = {}

export default TasksList
