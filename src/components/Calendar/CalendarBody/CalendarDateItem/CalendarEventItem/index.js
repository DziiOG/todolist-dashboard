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

const EventItem = ({ event = {}, myRef }) => {
  const onClick = () => (event?.onEventClick ? event.onEventClick() : undefined)
  return (
    <Box
      as='button'
      onClick={e => {
        myRef?.current?.click()
        if (onClick) {
          onClick(e)
        }
      }}
      cursor='pointer'
      bg={`${event.color || '#67CBAC'}1A 0% 0% no-repeat padding-box;`}
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
    toolTipCardProps: PropTypes.object,
    toolTipProps: PropTypes.object
  }),
  myRef: PropTypes.shape({
    current: PropTypes.shape({
      click: PropTypes.func
    })
  })
}
const CalendarEvent = ({ event, myRef }) => (
  <>
    <EventItem event={event} myRef={myRef} />
  </>
)

CalendarEvent.propTypes = {
  event: PropTypes.any,
  myRef: PropTypes.any
}

export default CalendarEvent
