import React from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
// import Auth from 'pages/auth'
import NotFound from 'pages/NotFound'
import Pages from 'pages'
import { AnimatePresence, motion } from 'framer-motion'
import Splash from 'components/Loading/Splash'
// import Guard from './Guard'

export const transition = { duration: 0.6, ease: 'easeInOut' }

const {
  Dashboard,
  Settings,
  //  Login, Signup,
  Tasks,
  Calender,
  Support
} = Pages

const routers = [
  {
    path: 'dashboard',
    element: Dashboard
  },
  {
    path: 'tasks',
    element: Tasks
  },
  {
    path: 'calender',
    element: Calender
  },
  {
    path: 'settings',
    element: Settings
  },
  {
    path: 'support',
    element: Support
  }
]

const Router = () => {
  const { pathname } = useLocation()

  return (
    <React.Suspense fallback={<Splash />}>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={pathname.split('/')[1]}
          initial='pageInitial'
          animate='pageAnimate'
          exit='pageExit'
          variants={{
            pageInitial: {
              opacity: 0
            },
            pageAnimate: {
              opacity: 1,
              transition: { ...transition, duration: 0.5 }
            },
            pageExit: {
              opacity: 0
            }
          }}
        >
          <Routes>
            <Route path='/' element={<Navigate to='/dashboard' />} />
            {/* <Route path='auth' element={<Auth />} /> */}
            {/* <Route path='auth/:token' element={<Auth />} /> */}
            {routers.map((route, index) => {
              const Component = route.element
              return (
                <Route
                  key={(i => i)(index)}
                  path={route.path}
                  element={<Component {...(route?.props || {})} />}
                />
              )
            })}
            <Route path='/404' element={NotFound} />
            <Route path='*' element={<Navigate to='/404' />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </React.Suspense>
  )
}

export default Router
