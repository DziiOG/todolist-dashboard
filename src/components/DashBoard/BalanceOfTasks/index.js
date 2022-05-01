import React from 'react'
import { Box, GridItem, Text, Flex } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import DoughnutChart from './DoughnutChart'

const BalanceOfTasks = () => {
  const tasks = [
    { category: 'Family', total: 8, color: '#E58D8D33', id: 1 },
    { category: 'House-keeping', color: '#CB916733', total: 6, id: 2 },
    { category: 'Education', color: '#8A904833', total: 5, id: 3 },
    { category: 'Travel', color: '#7367CB33', total: 4, id: 4 },
    { category: 'Money', total: 4, color: '#67CBAC33', id: 5 },
    { category: 'Work', total: 3, color: '#A867CB33', id: 6 }
  ]
  return (
    <GridItem>
      <Text
        fontWeight={500}
        fontFamily='Avenir'
        fontSize='lg'
        mb={{ ...rem(16) }}
      >
        Balance of tasks
      </Text>
      <Box
        minH={{ ...rem(207) }}
        w='100%'
        borderRadius={{ ...rem(20) }}
        border='1px solid #29325A33;'
        py={{ md: 5 }}
      >
        <Flex w='100%' align='space-between' justify='center'>
          <Flex align='center' justify='center' w='50%' position='relative'>
            <Text
              color='#29325A'
              fontFamily='Avenir'
              fontSize='2xl'
              fontWeight={500}
              position='absolute'
            >
              30 tasks
            </Text>
            <DoughnutChart
              data={tasks.map(task => ({
                id: task.id,
                name: task.category,
                color: task.color,
                value: task.total
              }))}
            />
          </Flex>
          <Box w='50%'>
            <Flex h='100%' justify='space-between' w='100%' direction='column'>
              {tasks.map(taskItem => (
                <Flex key={taskItem.id} align='center'>
                  <Box
                    rounded='full'
                    bg={`${taskItem.color} 0% 0% no-repeat padding-box`}
                    w={{ ...rem(16) }}
                    h={{ ...rem(16) }}
                    mr={{ ...rem(12) }}
                  />
                  <Text
                    fontWeight={500}
                    fontSize='lg'
                    color='#29325A'
                    fontFamily='Avenir'
                  >
                    {taskItem.category} ({taskItem.total})
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </GridItem>
  )
}

BalanceOfTasks.propTypes = {}

export default BalanceOfTasks
