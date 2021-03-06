import React, { useContext, createContext } from 'react'

import PropTypes from 'prop-types'
import TaskModal from 'components/Modals/TaskModal'
import CategoryModal from 'components/Modals/Category'
import useComponent from './useComponent'

const ModalContext = createContext()

export const ModalContextProvider = ({ children }) => {
  const { modal } = useComponent()
  const Modals = {
    taskModal: <TaskModal />,
    categoryModal: <CategoryModal />
  }
  return (
    <ModalContext.Provider value={{}}>
      {Modals[modal]}
      {children}
    </ModalContext.Provider>
  )
}

ModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default function useModal() {
  return useContext(ModalContext)
}
