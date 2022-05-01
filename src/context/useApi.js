import React, { useContext, createContext } from 'react'
import getConfig from 'utils/configs'
import http from 'utils/httpFacade'

import PropTypes from 'prop-types'

const ApiContext = createContext()

export const ApiContextProvider = ({ children }) => {
  const { TODO_LIST_API } = getConfig()
  const login = async payload =>
    await http.post({
      url: `${TODO_LIST_API}/login`,
      body: JSON.stringify(payload)
    })

  const getTasks = async query =>
    await http.get({
      url: `${TODO_LIST_API}/tasks`,
      query
    })

  const getCategories = async query =>
    await http.get({
      url: `${TODO_LIST_API}/categories`,
      query
    })

  const updateTask = async (id, payload) =>
    await http.patch({
      url: `${TODO_LIST_API}/tasks/${id}`,
      body: payload
    })

  const createTask = async body =>
    await http.post({ url: `${TODO_LIST_API}/tasks`, body })
  return (
    <ApiContext.Provider
      value={{
        login,
        getTasks,
        updateTask,
        createTask,
        getCategories
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}

ApiContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default function useApi() {
  return useContext(ApiContext)
}
