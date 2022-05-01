import React from 'react'

const Dashboard = React.lazy(() => import('./dashboard'))
const NotFound = React.lazy(() => import('./NotFound'))
const Settings = React.lazy(() => import('./settings'))
const Authorization = React.lazy(() => import('./authorization'))
const Tasks = React.lazy(() => import('./tasks'))
const Support = React.lazy(() => import('./support'))
const Calender = React.lazy(() => import('./calender'))

const Pages = {
  Dashboard,
  NotFound,
  Settings,
  Authorization,
  Tasks,
  Support,
  Calender
}

export default Pages
