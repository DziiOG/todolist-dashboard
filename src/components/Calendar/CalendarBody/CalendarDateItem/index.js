import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import CalendarEventItem from './CalendarEventItem'
import useCalendar from 'context/useCalendar'

const CalendarDateItem = ({ dateItem, indexItem, currentDay }) => {
  const { locks } = useCalendar()
  return (
    <Box
      w={{ base: '100%' }}
      h={{ ...rem(150) }}
      bg={!dateItem?.dayNumber ? 'gray.100' : 'white'}
      filter={!dateItem?.dayNumber && 'grayScale(100%)'}
      border={currentDay && '3px solid #0066CC'}
      boxShadow={
        locks.includes(indexItem + 1)
          ? 'inset 0px -1px 0px #DCE5E5;'
          : 'inset 1px -1px 0px #DCE5E5, inset 0px -1px 0px #DCE5E5;'
      }
      p={{ ...rem(8) }}
    >
      <Flex
        w='100%'
        direction='column'
        h='100%'
        justify={dateItem?.events?.length < 3 ? 'flex-start' : 'space-between'}
      >
        <Flex align='center' justify='space-between' w='100%' as='header'>
          <Heading
            fontWeight={700}
            fontSize={{ ...rem(11) }}
            lineHeight={{ ...rem(16) }}
            color='#6E7575'
          >
            {dateItem?.weekDay}
          </Heading>
          <Text
            fontWeight={700}
            fontSize={{ ...rem(11) }}
            lineHeight={{ ...rem(16) }}
            color='#6E7575'
          >
            {dateItem?.dayNumber}
          </Text>
        </Flex>
        {dateItem?.dayNumber && dateItem?.events?.length > 0 ? (
          <Grid mt={{ ...rem(16) }} w='100%' gap={{ ...rem(6) }}>
            {dateItem?.events?.map((eventItem, index) => (
              <GridItem key={(i => i)(index)}>
                <CalendarEventItem event={eventItem} />
              </GridItem>
            ))}
          </Grid>
        ) : null}
        {dateItem?.dayNumber && dateItem?.events?.length > 3 ? (
          <Box cursor='pointer' w='100%' mt={{ ...rem(9) }}>
            <Heading
              fontWeight={700}
              fontSize={{ ...rem(8) }}
              lineHeight={{ ...rem(15) }}
            >
              Show 3 more
            </Heading>
          </Box>
        ) : null}
      </Flex>
    </Box>
  )
}

CalendarDateItem.propTypes = {
  currentDay: PropTypes.string,
  dateItem: PropTypes.shape({
    dayNumber: PropTypes.any,
    task: PropTypes.any,
    events: PropTypes.shape({
      length: PropTypes.number,
      map: PropTypes.func
    }),
    weekDay: PropTypes.any
  }),
  dayNumber: PropTypes.number,
  events: PropTypes.any,
  indexItem: PropTypes.number,
  setSelectedCalendarDateItem: PropTypes.any,
  taskEventItems: PropTypes.any
}

export default CalendarDateItem
