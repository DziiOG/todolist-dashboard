import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { rem } from 'helpers/misc'

const MotionFlex = motion(Flex)

const SidebarItem = ({ icon, title, selected, step, id, page, ...rest }) => (
  <MotionFlex
    my={{ md: 4 }}
    {...rest}
    pacing='0.2rem'
    borderRadius={{ ...rem(10) }}
    px={{ md: 4 }}
    rounded='lg'
    bg={selected || page === id ? '#29325A66' : 'transparent'}
    h={{ ...rem(48) }}
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
        bg={'transparent'}
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
        <Icon color='white' as={icon} boxSize={5} />
      </Flex>
    </Box>

    <Text
      mt={1}
      ml={{ ...rem(8) }}
      fontFamily='Avenir'
      color={selected || page === id ? 'white' : 'white'}
      fontSize={{ ...rem(14) }}
      fontWeight={selected || page === id ? 900 : 400}
    >
      {title}
    </Text>
    {selected || page === id ? (
      <MotionFlex
        border='none'
        mt={1}
        ml={1}
        bg='transparent'
        align='center'
        justify='center'
        pos='absolute'
        inset={-1}
        w={'100%'}
        h={{ ...rem(53) }}
        borderRadius={{ ...rem(10) }}
        className='selected'
        layoutId='selected'
      />
    ) : null}
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
