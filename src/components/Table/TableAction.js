import React from 'react'
import {
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { Link as ReactRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import useComponents from 'context/useComponent'
import { BiDotsVerticalRounded } from 'react-icons/bi'

const TableAction = ({ options, state, data, id }) => {
  const { toggleModal } = useComponents()

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            bg={isOpen && 'gray.100'}
            w={6}
            h={6}
            rounded='full'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Icon as={BiDotsVerticalRounded} color='text' d='inline-flex' />
          </MenuButton>
          <MenuList w={{ md: 20 }}>
            {options?.map((item, index) =>
              item.path ? (
                <Link
                  key={(i => i)(index)}
                  as={ReactRouter}
                  to={item.path.replace(':id', id)}
                  state={item.state}
                  _hover={{ textDecor: 'none' }}
                >
                  <MenuItem
                    key={item.id}
                    _hover={{ bg: '#F2F5FF66', color: '#333333' }}
                    py={2}
                  >
                    {item.name}
                  </MenuItem>
                </Link>
              ) : (
                <MenuItem
                  ref={item?.ref}
                  key={item.id}
                  _hover={{ bg: '#F2F5FF66', color: '#333333' }}
                  py={2}
                  onClick={
                    item?.onClick ||
                    (() => {
                      toggleModal(
                        item.state || state,
                        item.name || item.title,
                        item.data || data,
                        null,
                        id
                      )
                    })
                  }
                >
                  {item.name}
                </MenuItem>
              )
            )}
          </MenuList>
        </>
      )}
    </Menu>
  )
}
TableAction.propTypes = {
  options: PropTypes.any,
  state: PropTypes.any,
  data: PropTypes.any,
  id: PropTypes.any
}

export default TableAction
