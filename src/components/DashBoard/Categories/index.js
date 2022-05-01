import React from 'react'
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { rem } from 'helpers/misc'
import { BsPlus } from 'react-icons/bs'
import useComponent from 'context/useComponent'
import { tasks } from '../BalanceOfTasks'

export default function Categories() {
  const { handleModalClick } = useComponent()
  return (
    <Box pt={28} w='100%' px={{ ...rem(15) }}>
      <Flex align='center' justify='space-between' w='100%'>
        <Heading fontFamily='Avenir' fontWeight={900} fontSize='2xl'>
          Categories
        </Heading>
        <Icon as={MdOutlineModeEditOutline} boxSize={6} />
      </Flex>

      <Flex mt={10} direction='column' w='100%'>
        {tasks
          .map(item => ({ name: item.category, color: item.color }))
          .map(category => (
            <Flex mb={{ md: 5 }} key={category.id} align='center'>
              <Box
                rounded='full'
                bg={`${category.color} 0% 0% no-repeat padding-box`}
                w={{ ...rem(20) }}
                h={{ ...rem(20) }}
                mr={{ ...rem(15) }}
              />
              <Text
                fontWeight={500}
                fontSize='xl'
                color='#29325A'
                fontFamily='Avenir'
              >
                {category.name}
              </Text>
            </Flex>
          ))}
      </Flex>

      <Flex color='#677acb' mt={5} align='center'>
        <Text
          fontFamily='Avenir'
          onClick={() => {
            handleModalClick('categoryModal')
          }}
          fontSize='xl'
          fontWeight={500}
        >
          Add Category
        </Text>
        <Icon ml={3} as={BsPlus} boxSize={6} />
      </Flex>
    </Box>
  )
}

Categories.propTypes = {}
