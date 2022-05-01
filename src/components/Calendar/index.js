import PropTypes from 'prop-types'
import React from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import { CalendarContextProvider } from 'context/useCalendar'
import CalendarWrapper from './CalendarWrapper'

const Calendar = ({ engine }) => {
  return (
    <CalendarContextProvider engine={engine}>
      <CalendarWrapper>
        <CalendarHeader />
        <CalendarBody />
      </CalendarWrapper>
    </CalendarContextProvider>
  )
}

Calendar.propTypes = {
  engine: PropTypes.any
}

export default Calendar
