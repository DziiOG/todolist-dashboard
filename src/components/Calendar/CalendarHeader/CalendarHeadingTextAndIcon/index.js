import React from 'react'
import { Flex, Icon } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import Button from 'components/Button'
import useComponent from 'context/useComponent'
import { BsPlus } from 'react-icons/bs'

const CalendarHeadingTextAndIcon = () => {
  const { handleModalClick } = useComponent()
  return (
    <Flex w='100%' align='center' justify='flex-end'>
      <Button
        mb={{ md: 3 }}
        h={{ ...rem(44) }}
        w={{ ...rem(153) }}
        borderRadius={{ ...rem(10) }}
        leftIcon={<Icon boxSize={6} color='white' as={BsPlus} />}
        title='Add task'
        onClick={() => {
          handleModalClick('taskModal')
        }}
      />
    </Flex>
  )
}

CalendarHeadingTextAndIcon.propTypes = {}

export default CalendarHeadingTextAndIcon
