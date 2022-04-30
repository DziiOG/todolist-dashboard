import React from 'react'
import CustomButton from 'components/Button'
import useComponent from 'context/useComponent'
import ModalWrapper from './ModalWrapper'

const TaskModal = () => {
  const { isOpen, onClose } = useComponent()
  return (
    <ModalWrapper
      title='8990'
      showHeader
      isCentered
      size='lg'
      isOpen={isOpen}
      onClose={onClose}
    >
      Hellp
      <CustomButton w='100%' />
    </ModalWrapper>
  )
}

TaskModal.propTypes = {}

export default TaskModal
