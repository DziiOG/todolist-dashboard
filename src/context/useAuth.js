import React, { useState, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'
import http from 'utils/httpFacade'
import { replaceURI } from 'helpers/misc'
import configs from 'utils/configs'
import { useMatch } from 'react-router-dom'
import { useQuery } from 'react-query'
// Setup Config
const AUTH_API = configs().AUTH_API

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const authPattern = useMatch('/auth/:token')
  const [tempUser, setTempUser] = React.useState(undefined)
  const token =
    authPattern?.params?.token || window.sessionStorage.getItem('_cft')
  const [session, setSession] = useState(true)

  const getUser = async () =>
    await http.get({ url: `${AUTH_API}/users/profile` })

  const {
    data: user,
    isLoading: userIsLoading,
    error: userHasError,
    refetch: userRefetch,
    isFetched: userIsFetch,
    isStale,
    isSuccess
  } = useQuery([`user ${token}`], async () => token && (await getUser()))

  React.useEffect(() => {
    if (isSuccess && userIsFetch) {
      setTempUser(user?.data)
    }
  }, [isSuccess, user?.data, userIsFetch])

  const logout = async (clearRemote = false) => {
    try {
      clearRemote && (await http.get({ url: `${AUTH_API}/logout` }))
      window.sessionStorage.clear()
      replaceURI('AUTH', '/redirects?from=GROWER_ADMIN&off=true')
    } catch (error) {
      return error
    }
  }

  React.useEffect(() => {
    let mounted = true
    const tokenFromSessionStorage = window.sessionStorage.getItem('_cft')
    if (mounted && !tokenFromSessionStorage && token) {
      window.sessionStorage.setItem('_cft', token)
    }
    return () => (mounted = false)
  }, [token])

  React.useEffect(() => {
    let mounted = true
    const userFromSessionStorage = window.sessionStorage.getItem('_cfu')
    if (mounted && !userFromSessionStorage && user?.data) {
      window.sessionStorage.setItem('_cfu', JSON.stringify(user?.data))
    }
    return () => (mounted = false)
  }, [user?.data])

  React.useEffect(() => {
    let mounted = true
    if (isStale && mounted) {
      window.sessionStorage.removeItem('_cfu')
    }
    return () => (mounted = false)
  }, [isStale])

  useEffect(() => {
    let mounted = true
    if (!session && mounted) return logout(true)
    return () => (mounted = false)
  }, [session])

  const store = ({ token: authToken, user: individual }) => {
    if (authToken || token)
      window.sessionStorage.setItem('_cft', authToken || token)
    if (individual || user?.data || tempUser) {
      window.sessionStorage.setItem(
        '_cfu',
        JSON.stringify(individual || user?.data || tempUser)
      )
    }
  }

  const isAuthenticated = () => {
    const _cft = window.sessionStorage.getItem('_cft')
    const _cfu = window.sessionStorage.getItem('_cfu')

    return {
      token: _cft,
      user: JSON.parse(_cfu) || user?.data
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: user?.data || tempUser,
        token,
        store,
        logout,
        getUser,
        session,
        setSession,
        userIsLoading,
        userHasError,
        userRefetch,
        userIsFetch,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

/**
 * Provides access to authentication informations
 * @author Eric Kojo Abbey
 * @param {Object} props Properties of useAuth
 */

export default function useAuth() {
  return React.useContext(AuthContext)
}
