import React from 'react'
import { Box, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { BiPlus } from 'react-icons/bi'
import Button from '../Button'

const EmptyState = ({
  img,
  text,
  title,
  width = { md: 48 },
  fontSize = { md: 'md' },
  action,
  onClick,
  icon,
  ...rest
}) => (
  <Flex align='center' justify='center' h='65vh' {...rest}>
    <Stack align='center' justify='center'>
      <Image src={img} alt='empty state' w={width} />
      <Text color='text' fontSize={fontSize}>
        {text ?? 'it is empty'}
      </Text>
      {action && (
        <Box pt={4}>
          <Button
            title={title}
            px={{ md: 8 }}
            h={{ md: 12 }}
            leftIcon={icon ? <Icon as={icon} /> : <Icon as={BiPlus} />}
            variant='outline'
            onClick={onClick}
          />
        </Box>
      )}
    </Stack>
  </Flex>
)

EmptyState.propTypes = {
  img: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.any,
  icon: PropTypes.any,
  fontSize: PropTypes.any,
  action: PropTypes.bool,
  onClick: PropTypes.func
}

export default EmptyState
