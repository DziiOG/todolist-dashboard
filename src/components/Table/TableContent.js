import React from 'react'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import t from 'typy'
import useComponents from 'context/useComponent'

const TableContent = ({
  renderer,
  item,
  index,
  isClickable,
  clickableState
}) => {
  const { toggleModal } = useComponents()

  const mapKey = i => i
  return (
    <Box
      overflowX='scroll'
      as='tr'
      fontSize='md'
      borderBottom='1px solid #E2E8F0'
      cursor={isClickable ? 'pointer' : 'inherit'}
      onClick={
        isClickable ? () => toggleModal(clickableState, null, item) : undefined
      }
    >
      {renderer?.map((selector, i) => {
        const Selector = selector?.Selector
        return (
          <Box
            key={mapKey(i)}
            as='td'
            p={4}
            whiteSpace='nowrap'
            lineHeight={5}
            color='gray.800'
          >
            {typeof selector?.selector === 'string' &&
              selector?.selector === 'numbering' &&
              index}

            {item &&
              typeof selector?.selector === 'string' &&
              t(item, selector?.selector).safeObject}
            {item &&
              typeof selector?.selector === 'function' &&
              selector?.selector(item)}
            {item && selector?.Selector ? <Selector {...item} /> : null}
          </Box>
        )
      })}
    </Box>
  )
}

TableContent.propTypes = {
  renderer: PropTypes.any,
  isClickable: PropTypes.bool,
  index: PropTypes.number,
  clickableState: PropTypes.string,
  item: PropTypes.object
}

export default TableContent
