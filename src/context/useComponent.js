import React, { useContext, createContext } from 'react'
import PropTypes from 'prop-types'
import { useDisclosure } from '@chakra-ui/react'

const ComponentContext = createContext()

export const ComponentContextProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modal, setModal] = React.useState('')
  const [mode, setMode] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [isSubmitting, setSubmitting] = React.useState(false)
  const [modalData, setModalData] = React.useState('')
  const [id, setId] = React.useState('')
  const [getId, setGetId] = React.useState(null)
  const [func, setFunc] = React.useState(null)
  const [selectedData, setSelectedData] = React.useState(null)

  const getData = value => {
    setSelectedData(value)
  }

  const toggleModal = (name, _title, _data, _func, _id) => {
    setModal(name)
    setTitle(_title)
    setModalData(_data)
    setFunc(_func)
    setGetId(_id)
    onOpen()
  }

  const handleClick = React.useCallback(
    (_modal, _data, _id, _mode, _func) => {
      setModal(_modal)
      setModalData(_data)
      setId(_id)
      setMode(_mode)
      setFunc(_func)
      onOpen()
    },
    [onOpen]
  )
  return (
    <ComponentContext.Provider
      value={{
        handleModalClick: handleClick,
        id,
        mode,
        modal,
        getId,
        title,
        func,
        isOpen,
        onOpen,
        onClose,
        getData,
        isSubmitting,
        setSubmitting,
        modalData,
        toggleModal,
        selectedData
      }}
    >
      {children}
    </ComponentContext.Provider>
  )
}
ComponentContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default function useComponent() {
  return useContext(ComponentContext)
}
