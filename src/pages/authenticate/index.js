import { Flex, Icon } from '@chakra-ui/react'
import Button from 'components/Button'
import FormCard from 'components/Cards/Form'
import { rem } from 'helpers/misc'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

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
      <FormCard
        mt={12}
        textAlign='center'
        title='Todolist'
        w={{ base: '90%', lg: 110 }}
      >
        <Button
          bg='#FFFFFF 0% 0% no-repeat padding-box'
          fontSize='md'
          fontFamily='Avenir'
          fontStyle='normal'
          h={{ ...rem(48) }}
          color='#29325A'
          w={'100%'}
          border='2px solid #677ACB'
          title='Continue with google'
          leftIcon={<Icon as={FcGoogle} boxSize={6} />}
        />
      </FormCard>
    </Flex>
  </Flex>
)

Authenticate.propTypes = {}

export default Authenticate
