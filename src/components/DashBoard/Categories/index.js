import React from 'react'
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { rem } from 'helpers/misc'
import { BsPlus } from 'react-icons/bs'
import useComponent from 'context/useComponent'
import useApi from 'context/useApi'
import useAuth from 'context/useAuth'
import Spinner from 'components/FetchCard/Spinner'
import { useQuery } from 'react-query'

export default function Categories() {
  const { handleModalClick } = useComponent()
  const { getCategories } = useApi()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { data, isLoading, error, refetch } = useQuery(
    [`categories_user${user?._id}`],
    async () => {
      if (user?._id) {
        return await getCategories({ user: user?._id })
      }
    },
    {
      staleTime: 90000
    }
  )

  return (
    <Spinner
      w='100%'
      h='100vh'
      hook={{
        loading: isLoading,
        error,
        triggerReload: () => refetch()
      }}
    >
      <Box pt={28} w='100%' px={{ ...rem(15) }}>
        <Flex align='center' justify='space-between' w='100%'>
          <Heading fontFamily='Avenir' fontWeight={900} fontSize='2xl'>
            Categories
          </Heading>
          <Icon as={MdOutlineModeEditOutline} boxSize={6} />
        </Flex>

        <Flex mt={10} direction='column' w='100%'>
          {data?.data
            .map(item => ({ name: item.name, color: item.color, id: item._id }))
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

        <Flex
          as='button'
          cursor='pointer'
          color='#677acb'
          mt={5}
          align='center'
        >
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
    </Spinner>
  )
}

Categories.propTypes = {}
