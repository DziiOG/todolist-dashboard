import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import { rem } from 'helpers/misc'

const CalendarWrapper = ({ children, ...rest }) => {
  return (
    <Box w='100%'>
      <Box
        bg={rest?.bg || 'white'}
        my={rest?.my || { ...rem(24) }}
        boxShadow={rest?.boxShadow || 'inset 0px -1px 0px #DCE5E5'}
        borderRadius={rest?.boxShadow || { ...rem(12) }}
        {...rest}
      >
        {children}
      </Box>
    </Box>
  )
}

CalendarWrapper.propTypes = {
  children: PropTypes.any
}

export default CalendarWrapper
