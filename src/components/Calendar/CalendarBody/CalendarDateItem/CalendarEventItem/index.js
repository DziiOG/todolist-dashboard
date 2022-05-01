import React from 'react'
import PropTypes from 'prop-types'
import { Box, Progress, Text } from '@chakra-ui/react'
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
    <Box cursor='pointer' onClick={onClick} pos='relative' w='100%'>
      <Progress
        colorScheme={event?.color || 'brandOrange'}
        value={event?.progressValue?.toFixed(0) || 0}
        max={event?.maxValue || 100}
        min={event?.minValue || 0}
        w='100%'
        h={{ ...rem(26) }}
        borderRadius={{ ...rem(6) }}
        bg={event?.bg || '#FFE499'}
      />
      <Text
        top='18%'
        w='90%'
        color='#333333'
        className='farm-line-clamp'
        left={{ ...rem(10) }}
        fontSize={{ ...rem(12) }}
        lineHeight={{ ...rem(15) }}
        fontWeight={400}
        position='absolute'
      >
        {event?.name}
      </Text>
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
