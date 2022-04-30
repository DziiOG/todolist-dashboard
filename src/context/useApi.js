import React, { useContext, createContext } from 'react'

import PropTypes from 'prop-types'

const ApiContext = createContext()

export const ApiContextProvider = ({ children }) => (
  <ApiContext.Provider value={{}}>{children}</ApiContext.Provider>
)

ApiContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default function useApi() {
  return useContext(ApiContext)
}
