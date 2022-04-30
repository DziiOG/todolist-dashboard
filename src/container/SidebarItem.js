import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { rem } from 'helpers/misc'

const MotionFlex = motion(Flex)

const SidebarItem = ({ icon, title, selected, step, id, page }) => (
  <MotionFlex
    spacing='0.2rem'
    bg='#29325A66 0% 0% no-repeat padding-box'
    borderRadius={{ ...rem(10) }}
    px={{ md: 4 }}
    rounded='lg'
    h={{ ...rem(53) }}
    role='group'
    alignItems='center'
    {...(selected || page === id
      ? {
          border: 'none',
          color: 'primary'
        }
      : {})}
    pos='relative'
  >
    <Box pos='relative'>
      <Flex
        align='center'
        justify='center'
        bg={selected || page === id ? 'primary' : 'cf.300'}
        color={
          selected || page === id
            ? 'white'
            : step && step > id
            ? 'white'
            : 'cf.900'
        }
        w={10}
        h={10}
        rounded='md'
      >
        <Icon as={icon} boxSize={8} />
      </Flex>

      {selected || page === id ? (
        <MotionFlex
          align='center'
          justify='center'
          pos='absolute'
          inset={-1}
          w={12}
          h={12}
          rounded='lg'
          className='selected'
          layoutId='selected'
        />
      ) : null}
    </Box>

    <Text
      mt={1}
      ml={{ ...rem(8) }}
      fontFamily='Avenir'
      color={selected || page === id ? '#F2F5FF' : 'todo.300'}
      fontSize={{ ...rem(14) }}
      fontWeight={selected || page === id ? 700 : 500}
    >
      {title}
    </Text>
  </MotionFlex>
)

SidebarItem.propTypes = {
  cursor: PropTypes.string,
  icon: PropTypes.any,
  id: PropTypes.any,
  page: PropTypes.any,
  selected: PropTypes.bool,
  step: PropTypes.number,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.any
}

export default SidebarItem
