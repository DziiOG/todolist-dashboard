import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Link, Stack } from '@chakra-ui/react'

import SidebarItem from 'container/SidebarItem'
import { Link as ReachRouter, useLocation } from 'react-router-dom'
import { AnimateSharedLayout } from 'framer-motion'
// import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { RiLogoutBoxLine, RiDashboardLine } from 'react-icons/ri'
// import { FaCheckSquare } from 'react-icons/fa'
import { IoMdCalendar } from 'react-icons/io'
import { FiSettings } from 'react-icons/fi'
import { HelpOutline, MultipleOutline } from 'theme/custom-icons'

const Sidebar = ({ page }) => {
  const { pathname } = useLocation()

  const menuLinks = [
    { id: 1, icon: RiDashboardLine, link: `/dashboard`, name: 'Dashboard' },
    {
      id: 2,
      icon: MultipleOutline,
      link: `/tasks`,
      name: 'Tasks'
    },
    {
      id: 3,
      icon: IoMdCalendar,
      link: `/calender`,
      name: 'Calender'
    },
    {
      id: 4,
      icon: FiSettings,
      link: `/settings`,
      name: 'Settings'
    },
    {
      id: 5,
      icon: HelpOutline,
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
        <Stack h='83vh' spacing='2rem' mt={36}>
          <Flex h='100%' w='100%' justify='space-between' direction='column'>
            <Box>
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
            </Box>
            <SidebarItem icon={RiLogoutBoxLine} page={6} title={'Logout'} />
          </Flex>
        </Stack>
      </AnimateSharedLayout>
    </Box>
  )
}

Sidebar.propTypes = {
  page: PropTypes.any
}

export default Sidebar
