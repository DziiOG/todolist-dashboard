import React from 'react'

const Dashboard = React.lazy(() => import('./dashboard'))
const NotFound = React.lazy(() => import('./NotFound'))
const Settings = React.lazy(() => import('./settings'))
const Login = React.lazy(() => import('./login'))
const Signup = React.lazy(() => import('./signup'))
const Tasks = React.lazy(() => import('./tasks'))
const Support = React.lazy(() => import('./support'))

const Pages = {
  Dashboard,
  NotFound,
  Settings,
  Login,
  Signup,
  Tasks,
  Support
}

export default Pages
