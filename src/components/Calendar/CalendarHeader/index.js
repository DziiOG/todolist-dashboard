import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import CalendarDateManipulator from './CalendarDateManipulator'
import CalendarHeadingTextAndIcon from './CalendarHeadingTextAndIcon'

const CalendarHeader = () => {
  return (
    <Box
      w='100%'
      h={{ ...rem(52) }}
      borderBottomColor='#DCE5E5'
      borderBottomWidth={{ base: 1, ...rem(1) }}
    >
      <Flex
        w='100%'
        direction='row'
        align='center'
        h='100%'
        justify-content='space-between'
        as='header'
        px={{ ...rem(26) }}
      >
        <CalendarHeadingTextAndIcon />
        <CalendarDateManipulator />
      </Flex>
    </Box>
  )
}

export default CalendarHeader
