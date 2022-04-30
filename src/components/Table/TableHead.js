import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Spinner } from '@chakra-ui/react'

import EmptyState from 'components/EmptyStates'

const TableHead = ({
  tableHead,
  onLoadingData,
  data,
  img,
  text,
  title,
  action,
  onClick,
  loading
}) => {
  if (loading) {
    return (
      <Flex
        w='100%'
        position={onLoadingData ? 'absolute' : 'relative'}
        align='center'
        justify='center'
        h={onLoadingData ? '100%' : '60vh'}
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='cf.900'
          size='xl'
        />
      </Flex>
    )
  }
  return (
    <Box as='thead' w='100%'>
      <Box as='tr' w='100%'>
        {(data || [])?.length > 0 &&
          tableHead?.map((item, index) => (
            <Box
              key={(i => i)(index)}
              as='th'
              px={4}
              py={5}
              borderBottomWidth={1}
              textAlign='left'
              fontSize='md'
              lineHeight={4}
              fontFamily='Avenir'
              fontStyle='normal'
              textTransform='capitalize'
              wordSpacing='wider'
              whiteSpace='nowrap'
              fontWeight={900}
            >
              {item?.name}
            </Box>
          ))}
        {!data.length && (
          <EmptyState
            img={img}
            text={text}
            title={title}
            action={action}
            onClick={onClick}
          />
        )}
      </Box>
    </Box>
  )
}

TableHead.propTypes = {
  action: PropTypes.bool,
  data: PropTypes.array,
  img: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onLoadingData: PropTypes.any,
  tableHead: PropTypes.any,
  text: PropTypes.string,
  title: PropTypes.string
}

export default TableHead
