import React from 'react'
import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { rem } from 'helpers/misc'

const Overview = () => {
  const overview = [
    {
      total: 30,
      title: 'Total tasks',
      id: 1
    },
    {
      total: 14,
      title: 'Completed',
      id: 2
    },
    {
      total: 7,
      title: 'In progress',
      id: 3
    }
  ]
  return (
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
  )
}
Overview.propTypes = {}

export default Overview
