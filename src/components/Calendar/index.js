import PropTypes from 'prop-types'
import React from 'react'
import { CalendarContextProvider } from 'context/useCalendar'
import { Box, Flex, Text } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import CalendarWrapper from './CalendarWrapper'

const Calendar = ({ engine }) => {
  const Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return (
    <CalendarContextProvider engine={engine}>
      <CalendarWrapper>
        <CalendarHeader />
        <Flex w='100%' bg='green' h='100%'>
          {(engine?.weekdays || [])?.map((item, idex) => (
            <Box
              key={(i => i)(idex)}
              w={{ base: '14.2857143%' }}
              h={{ ...rem(55) }}
              bg={'white'}
              p={{ ...rem(8) }}
              borderWidth={'1px'}
              borderColor='gray.100'
            >
              <Flex>
                <Text
                  fontSize='xl'
                  fontFamily='Avenir'
                  fontStyle='normal'
                  color='29325a'
                  fontWeight={500}
                >
                  {Days[idex]}
                </Text>
              </Flex>
            </Box>
          ))}
        </Flex>
        <CalendarBody />
      </CalendarWrapper>
    </CalendarContextProvider>
  )
}
Calendar.propTypes = {
  engine: PropTypes.any
}

export default Calendar
