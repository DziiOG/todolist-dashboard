import React from 'react'
import { Box, Flex, Select } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import CalendarDateManipulator from './CalendarDateManipulator'
import CalendarHeadingTextAndIcon from './CalendarHeadingTextAndIcon'

const CalendarHeader = () => (
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
      justify-content='space-evenly'
      as='header'
    >
      <CalendarDateManipulator />
      <Select
        color='#29325A'
        fontFamily='Avenir'
        fontStyle='normal'
        fontWeight={900}
        w={{ ...rem(342) }}
        h={{ ...rem(44) }}
        placeholder='Month view'
        mr={{ md: 5 }}
      />
      <CalendarHeadingTextAndIcon />
    </Flex>
  </Box>
)

export default CalendarHeader
