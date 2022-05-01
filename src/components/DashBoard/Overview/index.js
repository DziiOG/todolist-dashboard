import React from 'react'
import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { rem } from 'helpers/misc'
import useApi from 'context/useApi'
import useAuth from 'context/useAuth'
import Spinner from 'components/FetchCard/Spinner'
import { useQuery } from 'react-query'

const Overview = () => {
  const { getTasks } = useApi()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { data, isLoading, error, refetch } = useQuery(
    [`user${user?._id}`],
    async () => {
      if (user?._id) {
        return await getTasks({ user: user?._id })
      }
    },
    {
      staleTime: 90000
    }
  )

  const overview = [
    {
      total: data?.data?.length || 0,
      title: 'Total tasks',
      id: 1
    },
    {
      total:
        data?.data?.filter(item => item.status === 'COMPLETED')?.length || 0,
      title: 'Completed',
      id: 2
    },
    {
      total:
        data?.data?.filter(item => item.status === 'IN_PROGRESS')?.length || 0,
      title: 'In progress',
      id: 3
    }
  ]

  return (
    <Spinner
      w='100%'
      h='md'
      hook={{
        loading: isLoading,
        error,
        triggerReload: () => refetch()
      }}
    >
      <GridItem>
        <Text
          fontWeight={500}
          fontFamily='Avenir'
          fontSize='lg'
          mb={{ ...rem(16) }}
        >
          Overview
        </Text>
        <Box
          minH={{ ...rem(207) }}
          w='100%'
          borderRadius={{ ...rem(20) }}
          border='1px solid #29325A33;'
        >
          <Flex h='100%%' w='100%' justify='center' align='center'>
            <Grid
              mt={{ md: 12 }}
              h='100%'
              w='100%'
              templateColumns='repeat(3, 1fr)'
            >
              {overview.map((item, index) => (
                <GridItem key={item.id}>
                  <Flex
                    direction='column'
                    justify='center'
                    align='center'
                    w='100%'
                    minH={{ ...rem(132) }}
                    borderRight={
                      overview.length - 1 !== index
                        ? '2px solid #29325A33'
                        : 'transparent'
                    }
                  >
                    <Heading
                      fontFamily='Avenir'
                      fontWeight={900}
                      fontSize='3xl'
                      color='#6FC9D9'
                    >
                      {item.total}
                    </Heading>
                    <Text
                      mt={{ ...rem(10) }}
                      fontWeight={500}
                      fontFamily='Avenir'
                      fontSize='xl'
                    >
                      {item.title}
                    </Text>
                  </Flex>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      </GridItem>
    </Spinner>
  )
}
Overview.propTypes = {}

export default Overview
