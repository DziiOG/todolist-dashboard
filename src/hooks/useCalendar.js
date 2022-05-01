import React from 'react'
import moment from 'moment'
import { useToast } from '@chakra-ui/react'

const useCalendar = (
  start = '01-01-1970',
  end = moment().add(15, 'years').format('MM-DD-YYYY')
) => {
  const toast = useToast()
  const [momentObj, setMomentObj] = React.useState(moment())
  const [slots, setSlots] = React.useState(undefined)
  const [weekdays, setWeekdays] = React.useState(undefined)
  const [allMonths, setAllMonths] = React.useState(undefined)
  const [month, setMonth] = React.useState(undefined)
  const [fullMonth, setFullMonth] = React.useState(undefined)
  const [year, setYear] = React.useState(undefined)
  const [years, setYears] = React.useState(undefined)
  const momentObjectRef = React.useRef(null)

  const unMount = (keys = []) => {
    const decision = {
      setSlots,
      setAllMonths,
      setMonth,
      setYear,
      setFullMonth,
      setMomentObj
    }
    const process = () =>
      Object.keys(decision).forEach(key => {
        if (keys.includes(key)) {
          decision[key](undefined)
        }
      })

    process()
  }

  React.useEffect(() => {
    let mounted = true
    if (mounted) {
      momentObjectRef.current = momentObj
    }
    return () => (mounted = false)
  }, [momentObj])

  React.useEffect(() => {
    let mounted = true
    if (mounted && momentObjectRef?.current && year === undefined) {
      setYear(parseInt(moment(momentObjectRef?.current).format('YYYY')))
    }
    return () => (mounted = false)
  }, [year])

  React.useEffect(() => {
    let mounted = true
    if (mounted && momentObjectRef?.current && month === undefined) {
      setMonth(moment(momentObjectRef?.current).format('MM'))
    }
    return () => (mounted = false)
  }, [month])
  React.useEffect(() => {
    let mounted = true
    if (mounted && momentObjectRef?.current && fullMonth === undefined) {
      setFullMonth(moment(momentObjectRef?.current).format('MMMM'))
    }
    return () => (mounted = false)
  }, [fullMonth])

  React.useEffect(() => {
    let mounted = true
    if (mounted && weekdays === undefined) {
      setWeekdays(moment?.weekdays())
    }
    return () => (mounted = false)
  }, [weekdays])

  React.useEffect(() => {
    let mounted = true
    if (mounted && allMonths === undefined) {
      setAllMonths(moment.months())
    }
    return () => (mounted = false)
  }, [allMonths])

  const firstDayOfMonth = React.useCallback(() => {
    if (momentObjectRef?.current) {
      const dateObject = momentObjectRef?.current
      const firstDay = moment(dateObject)?.startOf('month').format('d')
      return firstDay
    }
  }, [])

  const numberOfDays = React.useCallback(
    () => momentObjectRef?.current?.daysInMonth(),
    []
  )

  const getWeekdays = React.useCallback(() => moment?.weekdays(), [])

  React.useEffect(() => {
    let mounted = true
    if (mounted) {
      const blanks = []
      const shots = []
      for (let i = 0; i < firstDayOfMonth(); i++) {
        blanks.push({ dayNumber: undefined })
      }
      for (let d = 1; d <= numberOfDays(); d++) {
        shots.push({
          dayNumber: d,
          date: String(`${month}-${d < 10 ? `0${d}` : d}-${year}`)
        })
      }
      setSlots([...blanks, ...shots])
    }
    return () => (mounted = false)
  }, [firstDayOfMonth, getWeekdays, month, numberOfDays, year])

  const isToday = _momentObj =>
    !_momentObj
      ? false
      : moment(moment().format('MM-DD-YYYY')).diff(
          _momentObj.format('MM-DD-YYYY'),
          'days'
        ) === 0
  const isAmongstAllowedDates = _d => moment(_d).isBetween(start, end)
  const clean = d => {
    const test = isAmongstAllowedDates(d)
    if (test) {
      unMount([
        'setSlots',
        'setAllMonths',
        'setMonth',
        'setYear',
        'setFullMonth',
        'setMomentObj'
      ])
      setMomentObj(d)
      setYear(parseInt(moment(d).format('YYYY')))
      setMonth(moment(d).format('MM'))
      setFullMonth(moment(d).format('MMMM'))
    } else {
      toast({
        title: 'Date Limit',
        status: 'warning',
        description: 'You have reached the end of the date range',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const handleMonthIncrease = () => {
    let dateObj = { ...momentObj }
    dateObj = moment(dateObj).add(1, 'M')
    clean(dateObj)
  }
  const handleMonthDecrease = () => {
    let dateObj = { ...momentObj }
    dateObj = moment(dateObj).subtract(1, 'M')
    clean(dateObj)
  }

  React.useEffect(() => {
    let mounted = true
    if (mounted && years === undefined) {
      const startYear = parseInt(moment(start).format('YYYY'))
      const endYear = parseInt(moment(end).format('YYYY'))
      const _years = []
      for (let i = startYear; i <= endYear; i++) {
        _years.push(parseInt(i))
      }
      setYears(_years)
    }
    return () => (mounted = false)
  }, [end, start, years])

  return {
    handleMonthDecrease,
    handleMonthIncrease,
    isToday,
    years,
    weekdays,
    slots,
    firstDayOfMonth,
    numberOfDays,
    getWeekdays,
    month,
    allMonths,
    fullMonth,
    setFullMonth,
    setMonth,
    setYear,
    year,
    unMount,
    date: momentObj,
    setDate: setMomentObj,
    isAmongstAllowedDates
  }
}

export default useCalendar
