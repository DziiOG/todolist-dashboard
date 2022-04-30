import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from 'context/useAuth'
import PropTypes from 'prop-types'

const Guard = ({ children }) => {
  const { isAuthenticated, session } = useAuth()
  const user = isAuthenticated()?.user
  const token = isAuthenticated()?.token
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!session) {
      return navigate('/logout', { state: { mgs: 'Session expired' } })
    }
  }, [session, navigate])

  React.useEffect(() => {
    if (false && (!token || !user)) {
      return navigate('/auth')
    }
  }, [navigate, token, user])

  return children
}

Guard.propTypes = {
  children: PropTypes.node.isRequired
}

export default Guard
