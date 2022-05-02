import { Box } from '@chakra-ui/react'
import Calendar from 'components/Calendar'
import Spinner from 'components/FetchCard/Spinner'
import useApi from 'context/useApi'
import useAuth from 'context/useAuth'
import useCalendar from 'hooks/useCalendar'
import moment from 'moment'
import React from 'react'
import { useQuery } from 'react-query'
// #67CBAC1A 0% 0% no-repeat padding-box;
function CalenderDashboard() {
  const { slots, ...rest } = useCalendar()
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
    <Box>
      <Spinner
        w='100%'
        h='md'
        hook={{
          loading: isLoading,
          error,
          triggerReload: () => refetch()
        }}
      >
        <Calendar
          engine={{
            slots: slots?.map(slot => ({
              ...slot,
              events: data?.data
                ?.filter(task => {
                  const taskDate = task?.dueDate
                  const taskDateObj = moment(taskDate).format('MM-DD-YYYY')
                  return slot?.date === taskDateObj
                })
                .map(item => ({
                  name: item.name,
                  task: item,
                  color: item?.category?.color
                }))
            })),
            ...rest
          }}
        />
      </Spinner>
    </Box>
  )
}

CalenderDashboard.propTypes = {}

export default CalenderDashboard
