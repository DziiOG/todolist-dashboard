import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import TablePagination from './TablePagination'
import TableWrapper from './TableWrapper'
import TableContent from './TableContent'

const Table = ({
  data,
  columns,
  setPage,
  pageData,
  pagination = true,
  img,
  text,
  title,
  action,
  onClick,
  loading,
  onLoadingData,
  clickableState,
  isClickable
}) => {
  const currentData = data || []

  return (
    <Flex direction='column' position='relative'>
      <TableWrapper
        overflowX='auto'
        data={currentData || []}
        tableHeads={columns}
        img={img}
        text={text}
        title={title}
        action={action}
        onClick={onClick}
        loading={loading}
        onLoadingData={onLoadingData}
      >
        <Box w='100%' as='tbody'>
          {(currentData || [])?.map((item, i) => (
            <TableContent
              index={
                pageData
                  ? (pageData?.currentPage - 1) * pageData?.pageSize + i + 1
                  : i + 1
              }
              key={(ix => ix)(i)}
              renderer={columns}
              item={item}
              isClickable={isClickable}
              clickableState={clickableState}
            />
          ))}
        </Box>
      </TableWrapper>
      {pagination && currentData?.length > 0 && (
        <TablePagination
          setCurrentPage={setPage}
          pageData={pageData}
          noPagination
        />
      )}
    </Flex>
  )
}

Table.propTypes = {
  action: PropTypes.bool,
  columns: PropTypes.any.isRequired,
  data: PropTypes.array,
  img: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onLoadingData: PropTypes.any,
  pageData: PropTypes.any,
  pagination: PropTypes.bool,
  setPage: PropTypes.any,
  text: PropTypes.string,
  isClickable: PropTypes.bool,
  title: PropTypes.string,
  clickableState: PropTypes.string
}

export default Table
