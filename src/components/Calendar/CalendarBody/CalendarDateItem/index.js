/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import CalendarEvent from './CalendarEventItem'

const CalendarDateItem = ({ dateItem, currentDay, myRef }) => (
  <Box
    w={{ base: '100%' }}
    onClick={() => {
      myRef?.current?.click()
    }}
    h={{ ...rem(95) }}
    bg={'white'}
    border={currentDay && '3px solid #0066CC'}
    borderWidth={'1px'}
    borderColor='gray.100'
  >
    <Flex
      w='100%'
      direction='column'
      h='100%'
      justify={dateItem?.events?.length < 3 ? 'flex-start' : 'space-between'}
    >
      <Flex
        m={{ ...rem(8) }}
        h='20%'
        align='center'
        justify='space-between'
        w='100%'
        as='header'
      >
        <Text
          fontWeight={400}
          fontSize={'lg'}
          lineHeight={{ ...rem(16) }}
          color='#29325a'
        >
          {dateItem?.dayNumber}
        </Text>
      </Flex>
      {dateItem?.dayNumber && dateItem?.events?.length > 0 ? (
        <Grid position='relative' h='80%' overflowY={'scroll'} w='100%'>
          {dateItem?.events?.map((eventItem, index) => (
            <GridItem key={(i => i)(index)}>
              <CalendarEvent event={eventItem} />
            </GridItem>
          ))}
        </Grid>
      ) : null}
    </Flex>
  </Box>
)

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
  events: PropTypes.any
}

export default CalendarDateItem
