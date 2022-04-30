import React from 'react'

const Dashboard = React.lazy(() => import('./dashboard'))
const NotFound = React.lazy(() => import('./NotFound'))

const Pages = {
  Dashboard,
  NotFound
}

export default Pages
