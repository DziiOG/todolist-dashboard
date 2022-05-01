import React from 'react'

const Dashboard = React.lazy(() => import('./dashboard'))
const NotFound = React.lazy(() => import('./NotFound'))
const Settings = React.lazy(() => import('./settings'))
const Tasks = React.lazy(() => import('./tasks'))
const Support = React.lazy(() => import('./support'))
const Calender = React.lazy(() => import('./calender'))
const Authenticate = React.lazy(() => import('./authenticate'))

const Pages = {
  Dashboard,
  NotFound,
  Settings,
  Tasks,
  Support,
  Calender,
  Authenticate
}

export default Pages
