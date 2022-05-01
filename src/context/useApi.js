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

  ;<ApiContext.Provider
    value={{
      login
    }}
  >
    {children}
  </ApiContext.Provider>
}

ApiContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default function useApi() {
  return useContext(ApiContext)
}
