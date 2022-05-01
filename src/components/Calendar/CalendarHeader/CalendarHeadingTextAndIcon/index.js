import React from 'react'
import { Flex, Heading, Icon } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import { NewCalendar } from 'theme/CustomIcons'

const CalendarHeadingTextAndIcon = () => {
  return (
    <Flex w='100%' align='center' justify='flex-start'>
      <Icon as={NewCalendar} color='#004C46' boxSize={6} mr={{ ...rem(21) }} />
      <Heading
        fontWeight={700}
        fontSize={{ ...rem(17) }}
        lineHeight={{ ...rem(28) }}
        color='#6E7575'
      >
        Calendar
      </Heading>
    </Flex>
  )
}

CalendarHeadingTextAndIcon.propTypes = {}

export default CalendarHeadingTextAndIcon
