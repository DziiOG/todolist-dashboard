import { Flex } from '@chakra-ui/react'
import FormCard from 'components/Cards/Form'
import React from 'react'

const Authenticate = () => (
  <Flex as='main' h='100vh' bg='gray.100' align='center' direction='column'>
    <Flex
      h={20}
      py={5}
      w='full'
      zIndex={10}
      align='center'
      px={{ base: 4, md: 20 }}
    />
    <Flex py={{ base: 4, lg: 10 }} w='full' align='center' justify='center'>
      <FormCard title='Sign in' w={{ base: '90%', lg: 110 }} />
    </Flex>
  </Flex>
)

Authenticate.propTypes = {}

export default Authenticate
