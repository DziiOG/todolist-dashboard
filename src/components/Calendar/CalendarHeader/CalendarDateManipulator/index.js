import React from 'react'
import { rem } from 'helpers/misc'
import { Flex, Heading, Icon } from '@chakra-ui/react'
import useCalendar from 'context/useCalendar'
import useComponent from 'context/useComponent'
import useRem from 'hooks/useRem'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'

const CalendarDateManipulator = () => {
  const {
    year,
    date,
    setDate,
    unMount,
    handleMonthDecrease,
    handleMonthIncrease,
    years,
    fullMonth: month,
    allMonths: months,
    isAmongstAllowedDates
  } = useCalendar()
  const { handleClick: handleModalClick } = useComponent()
  const _rem = useRem()
  return (
    <Flex justify='space-between' align='center' w='100%'>
      <Flex cursor='pointer' justify='flex-end' align='center'>
        <Icon
          as={MdOutlineArrowBackIos}
          color='cf.400'
          boxSize={_rem(16)}
          mr={{ ...rem(23.6) }}
          onClick={() => {
            handleMonthDecrease()
          }}
        />
        <Heading
          fontWeight={700}
          fontSize={{ ...rem(17) }}
          lineHeight={{ ...rem(28) }}
          color='#6E7575'
          mb={{ base: 1, ...rem(1) }}
          onClick={() => {
            handleModalClick('calendar-selection', {
              months,
              month,
              setDate,
              date,
              unMount,
              year,
              years,
              test: isAmongstAllowedDates
            })
          }}
        >
          {month} {year}
        </Heading>
        <Icon
          as={MdOutlineArrowForwardIos}
          onClick={() => {
            handleMonthIncrease()
          }}
          color='cf.400'
          boxSize={_rem(16)}
          ml={{ ...rem(23.6) }}
        />
      </Flex>
    </Flex>
  )
}

CalendarDateManipulator.propTypes = {}

export default CalendarDateManipulator
