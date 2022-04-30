import React from 'react'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import TableHead from './TableHead'

const TableWrapper = ({
  children,
  overflowX,
  tableHeads,
  data,
  img,
  text,
  title,
  action,
  onClick,
  loading,
  onLoadingData
}) => (
  <Box
    my={-2}
    overflowX={overflowX || 'hidden'}
    css={{
      '&::-webkit-scrollbar': {
        width: '4px'
      },
      '&::-webkit-scrollbar-track': {
        width: '6px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'primary',
        borderRadius: '24px'
      }
    }}
    bg='white'
    rounded='lg'
    w='100%'
  >
    <Box
      verticalAlign='middle'
      display='inline-block'
      minWidth='100%'
      shadow='sm'
      overflow='hidden'
    >
      <Box as='table' w='100%'>
        <TableHead
          tableHead={tableHeads}
          data={data}
          img={img}
          text={text}
          title={title}
          action={action}
          onClick={onClick}
          loading={loading}
          onLoadingData={onLoadingData}
        />
        {children}
      </Box>
    </Box>
  </Box>
)

TableWrapper.propTypes = {
  action: PropTypes.bool,
  children: PropTypes.node.isRequired,
  data: PropTypes.array,
  img: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onLoadingData: PropTypes.any,
  overflowX: PropTypes.string,
  tableHeads: PropTypes.array,
  text: PropTypes.string,
  title: PropTypes.string
}
export default TableWrapper
