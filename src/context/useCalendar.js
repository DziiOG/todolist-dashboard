import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const CalendarContext = createContext()

export const CalendarContextProvider = ({ engine, children }) => {
  const locks = [1, 8, 15, 22, 29]
  const [selectedEvent, setSelectedEVent] = React.useState(undefined)
  return (
    <CalendarContext.Provider
      value={{
        locks,
        setSelectedEVent,
        selectedEvent,
        ...engine
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}
CalendarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  engine: PropTypes.any
}

const useCalendar = () => useContext(CalendarContext)
export default useCalendar
