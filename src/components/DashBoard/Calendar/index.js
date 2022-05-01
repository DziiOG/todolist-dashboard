import { Box } from '@chakra-ui/react'
import Calendar from 'components/Calendar'
import useCalendar from 'hooks/useCalendar'
import React from 'react'
// #67CBAC1A 0% 0% no-repeat padding-box;
function CalenderDashboard() {
  const { slots, ...rest } = useCalendar()
  return (
    <Box>
      <Calendar
        engine={{
          slots: slots?.map(slot => ({
            ...slot,
            events: [
              {
                name: 'test',
                progressValue: 0
              },
              {
                name: 'test',
                progressValue: 0
              },
              {
                name: 'test',
                progressValue: 0
              },
              {
                name: 'test',
                progressValue: 0
              }
            ]
          })),
          ...rest
        }}
      />
    </Box>
  )
}

CalenderDashboard.propTypes = {}

export default CalenderDashboard
