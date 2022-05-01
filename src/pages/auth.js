import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from 'context/useAuth'
import QueryString from 'query-string'
import FetchCard from 'components/FetchCard'

/** Page that authorizes users
 * @component Auth
 * @param {Object} props Properties of Auth
 */

const Auth = () => {
  const navigate = useNavigate()
  const {
    user,
    store,
    isAuthenticated,
    setSession,
    userIsLoading,
    userHasError,
    userRefetch,
    token,
    logout
  } = useAuth()

  const search = useLocation()?.search
  document.title = 'TODO LIST | Auth'

  const loggedInUser = user || isAuthenticated()?.user
  const [redirectTo, setRedirectTo] = useState(null)
  const { to } = QueryString.parse(search, { parseBooleans: true })
  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (loggedInUser) {
        setRedirectTo(to || 'dashboard')
      } else if (token) {
        store({ token })
      } else {
        logout()
      }
    }
    return () => {
      userRefetch()
      mounted = false
    }
  }, [store, token, loggedInUser, to, setSession, userRefetch, logout])

  useEffect(() => {
    let mounted = true
    if (mounted && user && user?.data) {
      store({ user: user?.data })
    }
    return () => (mounted = false)
  }, [user, store, user?.data, userRefetch])

  useEffect(() => {
    let mounted = true
    if (mounted && redirectTo !== null && loggedInUser) {
      navigate(`/${redirectTo}`, { state: loggedInUser })
    }
    return () => (mounted = false)
  }, [navigate, redirectTo, loggedInUser])

  return userHasError || userIsLoading ? (
    <FetchCard
      text='Authenticating'
      w='100vw'
      h='100vh'
      direction='column'
      align='center'
      justify='center'
      reload={() => userRefetch()}
      loading={userIsLoading}
      error={userHasError}
    />
  ) : null
}

export default Auth
