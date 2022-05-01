import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from '@chakra-ui/react'
import { rem } from 'helpers/misc'

const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
  <Box bg='red' ref={ref} {...rest}>
    {children}
  </Box>
))

CustomCard.propTypes = {
  children: PropTypes.any
}
const CalendarEventItem = ({ event = {} }) => {
  const onClick = () => (event?.onEventClick ? event.onEventClick() : undefined)
  return (
    <Box
      cursor='pointer'
      bg={`${event.color || '#67CBAC'}1A 0% 0% no-repeat padding-box;`}
      onClick={onClick}
      pos='relative'
      w='100%'
    >
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

CalendarEventItem.propTypes = {
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

export default CalendarEventItem
