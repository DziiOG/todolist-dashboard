import React from 'react'
import { Box, Flex, Text, Icon } from '@chakra-ui/react'

import PropTypes from 'prop-types'
import Button from 'components/Button'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const TablePagination = ({
  setCurrentPage,
  pageData,
  visiblePagesPerDisplay = 3
}) => {
  const [selectedItem, setSelectedItem] = React.useState(1)
  const [_pages, setPages] = React.useState([])
  const pages = React.useMemo(() => pageData?.pages || [], [pageData?.pages])
  const [visible, setVisible] = React.useState([])

  React.useEffect(() => {
    let mounted = true
    const visiblePages = () => Math.ceil(pages.length / visiblePagesPerDisplay)

    if (mounted && pages?.length) {
      const currentPage = pageData?.currentPage
      const index = pages.findIndex(c => c === currentPage)
      const minIndex = index - visiblePages()
      const newArray = pages.slice(minIndex < 0 ? 0 : minIndex, index + 1)
      setVisible(newArray)
    }
    return () => (mounted = false)
  }, [pageData?.currentPage, pages, visiblePagesPerDisplay])

  React.useEffect(() => {
    let mounted = true
    if (mounted && pages?.length) {
      setPages(pages)
    }
    return () => (mounted = false)
  }, [pages])

  const handleClick = event => {
    setCurrentPage(event)
  }
  const TablePageButton = ({ number, setSelected, index }) => (
    <Flex>
      <Button
        title={number}
        mx={{ md: 1 }}
        _hover={{ background: 'gray.200', color: 'gray.600' }}
        color={pageData?.currentPage === index ? '#fff' : 'gray.400'}
        bg={pageData?.currentPage === index ? 'cf.400' : '#fff'}
        border='1px solid #E2E8F0'
        w={10}
        h={10}
        onClick={() => {
          setSelected(index)
          handleClick(index)
        }}
      />
    </Flex>
  )

  TablePageButton.propTypes = {
    number: PropTypes.number,
    setSelected: PropTypes.func,
    index: PropTypes.number
  }

  return pageData ? (
    <Box mt={{ md: 10 }} w='100%'>
      <Flex
        align='flex-end'
        justify='center'
        direction='column'
        w='100%'
        h={{ md: 30 }}
      >
        {pageData && (
          <Flex justify='right' align='center' w='100%' h={{ md: 30 }}>
            <Flex
              w={10}
              h={10}
              align='center'
              justify='center'
              bg='white'
              cursor='pointer'
              isDisabled={selectedItem === 1}
              border='1px solid #E2E8F0'
              rounded='md'
              _hover={{ bg: 'cf.400', color: 'white' }}
              onClick={() => {
                setCurrentPage(number => {
                  if (number === 1) {
                    setSelectedItem(number - 1)
                    return number
                  }
                  setSelectedItem(number - 1 - 1)
                  return number - 1
                })
              }}
            >
              <Icon as={FaChevronLeft} color='gray.400' />
            </Flex>
            <Flex mx={4}>
              {visible.map((item, index) => (
                <Box key={(i => i)(index)}>
                  {index === 5 && (
                    <Box>
                      <Text color='gray.400'>...</Text>
                    </Box>
                  )}
                  <TablePageButton
                    key={index}
                    setSelected={setSelectedItem}
                    selected={selectedItem}
                    index={item}
                    number={item}
                  />
                </Box>
              ))}
            </Flex>
            <Flex
              w={10}
              h={10}
              align='center'
              justify='center'
              bg='white'
              border='1px solid #E2E8F0'
              rounded='md'
              _hover={{ bg: 'cf.400', color: 'white' }}
              isDisabled={selectedItem === pages.length}
              onClick={() => {
                setCurrentPage(number => {
                  if (number === _pages?.length) {
                    setSelectedItem(number - 1)
                    return number
                  }
                  setSelectedItem(number + 1 - 1)
                  return number + 1
                })
              }}
            >
              <Icon as={FaChevronRight} color='gray.400' />
            </Flex>
          </Flex>
        )}
        {pageData && (
          <Box textAlign='center' w='10%' mt={3}>
            {pageData?.currentPage} / {pages?.length || ''}
          </Box>
        )}
      </Flex>
    </Box>
  ) : null
}

TablePagination.propTypes = {
  pageData: PropTypes.shape({
    currentPage: PropTypes.any,
    pages: PropTypes.any
  }),
  pages: PropTypes.number,
  setCurrentPage: PropTypes.func,
  visiblePagesPerDisplay: PropTypes.number
}

export default TablePagination
