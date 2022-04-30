import { Flex, Heading, Icon, HStack } from '@chakra-ui/react'
import Button from 'components/Button'
import React from 'react'
import PropTypes from 'prop-types'
import { Filter } from 'theme/CustomIcons'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { useMatch } from 'react-router-dom'
import useComponents from 'context/useComponent'

const TableHeader = ({ header, title, onClick, handleOpen }) => {
  const landPattern = useMatch('/lands')
  const { toggleModal } = useComponents()
  return (
    <Flex justify='space-between' align='center' mb={12}>
      <Heading as='h4' fontSize='2xl' color='headline'>
        {header}
      </Heading>
      <HStack spacing='2rem' align='center'>
        <HStack spacing='1rem'>
          <Button
            leftIcon={<Icon as={Filter} />}
            title='Filter'
            variant='outline'
            h={10}
            w={32}
            onClick={handleOpen}
          />
          {landPattern && (
            <Button
              bg='white'
              align='center'
              justify='center'
              borderWidth='1px'
              borderColor='#004C46'
              color='#004C46'
              onClick={() => toggleModal('addMetric')}
              _hover={{
                color: '#004C46',
                bg: 'white',
                borderColor: '#004C46',
                borderWidth: '1px'
              }}
              w={28}
              fontSize='sm'
              px={8}
              leftIcon={<Icon as={HiOutlinePlusSm} />}
              title='Add metric'
              rounded='lg'
              pos='relative'
              zIndex={10}
              h={10}
            />
          )}
          {title && (
            <Button
              title={title}
              h={10}
              w={32}
              borderRadius={10}
              fontSize='md'
              onClick={onClick}
              leftIcon={<Icon as={HiOutlinePlusSm} />}
            />
          )}
        </HStack>
      </HStack>
    </Flex>
  )
}

TableHeader.propTypes = {
  handleOpen: PropTypes.func,
  header: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string
}

export default TableHeader
