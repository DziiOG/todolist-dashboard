import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  PopoverTrigger,
  // Popover,
  // PopoverArrow,
  // PopoverBody,
  // PopoverCloseButton,
  // PopoverContent,
  // PopoverFooter,
  // PopoverHeader,
  // PopoverTrigger,
  // Portal,
  Text
} from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import Button from 'components/Button'

const EventItem = ({ event = {} }) => {
  const onClick = () => (event?.onEventClick ? event.onEventClick() : undefined)
  return (
    <Box
      as='button'
      cursor='pointer'
      bg={`${event.color || '#67CBAC'}1A 0% 0% no-repeat padding-box;`}
      onClick={onClick}
      w='100%'
    >
      <PopoverTrigger>
        <Button display={'none'} />
      </PopoverTrigger>

      <Flex
        borderLeftWidth={5}
        borderLeftColor={`${event.color || '#67CBAC'}33`}
        w='100%'
        h={{ ...rem(30) }}
        justify='center'
        align='center'
      >
        <Text
          color={event.color || '#67CBAC'}
          fontSize='md'
          fontFamily='Avenir'
          fontStyle='normal'
        >
          {event.name}
        </Text>
      </Flex>
    </Box>
  )
}

EventItem.propTypes = {
  event: PropTypes.shape({
    bg: PropTypes.any,
    color: PropTypes.any,
    customToolTip: PropTypes.node,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    name: PropTypes.string,
    onEventClick: PropTypes.func,
    progressValue: PropTypes.number,
    toolTipProps: PropTypes.object,
    toolTipCardProps: PropTypes.object
  })
}
const CalendarEvent = ({ event }) => (
  <>
    <EventItem event={event} />
  </>
)

CalendarEvent.propTypes = {
  event: PropTypes.any
}

export default CalendarEvent
