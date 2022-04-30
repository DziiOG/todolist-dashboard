import React from 'react'
import PropTypes from 'prop-types'
import { Box, Link, Stack } from '@chakra-ui/react'

import SidebarItem from 'container/SidebarItem'
import { Link as ReachRouter, useLocation } from 'react-router-dom'
import { AnimateSharedLayout } from 'framer-motion'
import { AiFillAccountBook } from 'react-icons/ai'

const Sidebar = ({ page }) => {
  const { pathname } = useLocation()

  const menuLinks = [
    { id: 1, icon: AiFillAccountBook, link: `/dashboard`, name: 'Dashboard' },
    {
      id: 2,
      icon: AiFillAccountBook,
      link: `/tasks`,
      name: 'Tasks'
    },
    {
      id: 3,
      icon: AiFillAccountBook,
      link: `/calender`,
      name: 'Calender'
    },
    {
      id: 4,
      icon: AiFillAccountBook,
      link: `/settings`,
      name: 'Settings'
    },
    {
      id: 5,
      icon: AiFillAccountBook,
      link: `/support`,
      name: 'Support'
    }
  ]

  return (
    <Box
      as='aside'
      w='14%'
      gridArea='aside'
      pos='fixed'
      overflowY='scroll'
      bottom={0}
      left={0}
      px={3}
      h='100vh'
      bg='#677ACB'
      zIndex={20}
    >
      <AnimateSharedLayout>
        <Stack spacing='2rem' mt={28}>
          {menuLinks.map((item, index) => (
            <Box key={(i => i)(index)}>
              <Link
                as={ReachRouter}
                to={item.link}
                _hover={{ textDecor: 'none' }}
                cursor='pointer'
                _focus={{ boxShadow: 'none' }}
              >
                <SidebarItem
                  icon={item.icon}
                  title={item.name}
                  selected={pathname === item.link}
                  id={item.id}
                  page={page}
                />
              </Link>
            </Box>
          ))}
        </Stack>
      </AnimateSharedLayout>
    </Box>
  )
}

Sidebar.propTypes = {
  page: PropTypes.any
}

export default Sidebar
