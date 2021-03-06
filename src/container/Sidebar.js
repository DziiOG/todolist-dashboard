import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Link, Stack, useToast } from '@chakra-ui/react'

import SidebarItem from 'container/SidebarItem'
import { Link as ReachRouter, useLocation } from 'react-router-dom'
import { AnimateSharedLayout } from 'framer-motion'
import { RiLogoutBoxLine, RiDashboardLine } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { FiSettings } from 'react-icons/fi'
import { HelpOutline, MultipleOutline } from 'theme/custom-icons'
import { toastError } from 'helpers/misc'
import useAuth from 'context/useAuth'

const Sidebar = ({ page }) => {
  const { pathname } = useLocation()
  const { setSession, logout } = useAuth()
  const toast = useToast()

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
      gridArea='aside'
      pos='fixed'
      w='14%'
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
            <SidebarItem
              cursor='pointer'
              onClick={async () => {
                try {
                  await logout()
                } catch (error) {
                  toastError(error, toast, setSession)
                }
              }}
              icon={RiLogoutBoxLine}
              page={6}
              title={'Logout'}
            />
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
