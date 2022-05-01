import React from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import CalendarDateItem from './CalendarDateItem'
import moment from 'moment'
import useCalendar from 'context/useCalendar'

const CalendarBody = () => {
  const { slots, weekdays, isToday } = useCalendar()
  const isCurrentDay = d => (d ? isToday(moment(d)) : undefined)
  const isWeekDayHeader = (i, d) => (i < 7 ? { ...d, weekDay: weekdays[i] } : d)
  return (
    <Box minH={{ ...rem(750) }} w='100%'>
      <Grid
        h='100%'
        w='100%'
        gap={0}
        templateColumns='repeat(7,1fr)'
        overflowX='scroll'
        overflowY='scroll'
      >
        {slots?.map((dateItem, index) => (
          <GridItem key={(i => i)(index)} w='100%'>
            <CalendarDateItem
              currentDay={isCurrentDay(dateItem?.date)}
              dateItem={isWeekDayHeader(index, dateItem)}
              indexItem={index}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default CalendarBody
