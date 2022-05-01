import PropTypes from 'prop-types'
import React from 'react'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text
} from '@chakra-ui/react'
import moment from 'moment'
import useCalendar from 'context/useCalendar'
import { rem } from 'helpers/misc'
import CustomButton from 'components/Button'
import { BsClock } from 'react-icons/bs'
import CalendarDateItem from './CalendarDateItem'

const PopCanContainer = ({
  index,
  isCurrentDay,
  isWeekDayHeader,
  dateItem
}) => {
  const ref = React.useRef()

  return (
    <GridItem key={(i => i)(index)} h='100%' w='100%'>
      <Popover placement='right'>
        <CalendarDateItem
          myRef={ref}
          currentDay={isCurrentDay(dateItem?.date)}
          dateItem={isWeekDayHeader(index, dateItem)}
          indexItem={index}
        />
        <PopoverTrigger>
          <Button
            w={'100%'}
            outline='none'
            _focus={{ outline: 'none' }}
            h={0}
            display='hidden'
            ref={ref}
          />
        </PopoverTrigger>
        <PopoverContent
          border='1px solid #29325A33'
          borderRadius={{ ...rem(13) }}
          boxShadow='0px 1px 4px #F2F5FF33'
          _focus={{ outline: 'none' }}
          p={{ ...rem(8) }}
        >
          <PopoverCloseButton />
          <PopoverBody>
            <Flex justify='space-between' w='100%'>
              <Flex
                display='flex'
                align='center'
                justify='center'
                w='42%'
                color='#29325A'
                borderRadius={{ ...rem(10) }}
                p={2}
                bg={'#E58D8D33 0% 0% no-repeat padding-box'}
              >
                House
              </Flex>

              <Flex
                bg='#677ACB66 0% 0% no-repeat padding-box'
                align='center'
                justify='center'
                w='45%'
                color='#29325A'
                borderRadius={{ ...rem(18) }}
                p={1}
              >
                In Progress
              </Flex>
            </Flex>
            <Box mb={3} mt={{ ...rem(13) }}>
              <Text
                fontFamily='Avenir'
                fontStyle='normal'
                fontWeight={500}
                fontSize={'lg'}
                mb={{ md: 2 }}
              >
                Send out email
              </Text>
              <Text
                fontFamily='Avenir'
                fontStyle='normal'
                fontWeight={400}
                fontSize={'md'}
              >
                Remind Sarah about meeting
              </Text>
            </Box>
            <Flex
              mb={2}
              fontWeight={200}
              fontStyle='normal'
              fontFamily='Avenir'
              color='#29325A66'
              fontSize='sm'
              align='center'
              justify='space-between'
            >
              <Box>
                <Flex align='center'>
                  <Icon mr={2} as={BsClock} />
                  <Text> 10:00AM </Text>
                </Flex>
              </Box>
              <Box>
                <Flex align='center'>
                  <Icon mr={2} as={BsClock} />
                  <Text> Repeats weekly </Text>
                </Flex>
              </Box>
            </Flex>
            <CustomButton
              borderRadius={{ ...rem(10) }}
              h={{ ...rem(40) }}
              w='100%'
              title='Edit task'
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </GridItem>
  )
}

PopCanContainer.propTypes = {
  dateItem: PropTypes.shape({
    date: PropTypes.any
  }),
  index: PropTypes.any,
  isCurrentDay: PropTypes.func,
  isWeekDayHeader: PropTypes.func
}

const CalendarBody = () => {
  const { slots, weekdays, isToday } = useCalendar()
  const isCurrentDay = d => (d ? isToday(moment(d)) : undefined)
  const isWeekDayHeader = (i, d) => (i < 7 ? { ...d, weekDay: weekdays[i] } : d)
  return (
    <Box bg='white' w='100%'>
      <Grid
        h='100%'
        w='100%'
        gap={0}
        templateColumns='repeat(7,1fr)'
        overflowX='scroll'
        overflowY='scroll'
      >
        {slots?.map((dateItem, index) => (
          <PopCanContainer
            {...{ index, isCurrentDay, isWeekDayHeader, dateItem }}
            key={index}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default CalendarBody
