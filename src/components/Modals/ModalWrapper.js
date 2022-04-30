import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Box,
  Flex,
  Divider
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

/**
 * ModalWrapper
 * @description Renders a Modal Wrapper
 * @component ModalWrapper
 * @author Whitson Dzimah
 * @param {Object} props Properties of ModalWrapper
 * @param {boolean} props.showHeader - if true add modal header
 * @param {Function} props.onClose - closes modal
 * @param {boolean} props.isOpen - if open
 * @param {string} props.title - title
 * @param {string} props.size - size of modal
 * @param {boolean} props.isCentered - centers modal
 * @param {string} props.image - image src
 * @param {string} props.alt - image alt
 * @param {JSX.Element} props.children - node children
 * @param {...*} rest
 *
 */

const ModalWrapper = ({
  showHeader = false,
  isOpen,
  onClose,
  title,
  size,
  isCentered,
  CustomHeader,
  bodyRounded,
  closeButtonColor,
  image,
  alt,
  scrollBehavior,
  px = { base: 4, md: 10 },
  bg,
  isDivider,
  children,
  contentRounded,
  headerContainerProps = {},
  buttonProps = {},
  py = { base: 4, md: 5 }
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size={size}
    isCentered={isCentered}
    scrollBehavior={scrollBehavior}
    closeOnOverlayClick={false}
  >
    <ModalOverlay />
    <ModalContent rounded={contentRounded || '2xl'}>
      <Flex w='100%' align='center' justify='center' py={py}>
        <Box
          as={Flex}
          justify='center'
          align='center'
          w='100%'
          fontWeight={700}
          {...headerContainerProps}
        >
          {showHeader && (
            <Flex
              borderBottomColor='gray.100'
              borderBottomWidth='1px'
              w='100%'
              direction='column'
              justify='left'
              align='center'
            >
              <Box
                color='#29325a'
                fontWeight={900}
                px={{ md: 10 }}
                w='100%'
                py={2}
                fontSize='xl'
              >
                {title}
                {image && <Image width={12} src={image} alt={alt} />}
              </Box>
              {isDivider && <Divider w='100%' color='gray.300' />}
            </Flex>
          )}
          {CustomHeader}
        </Box>
        <ModalCloseButton
          color={closeButtonColor || '#29325a'}
          {...buttonProps}
        />
      </Flex>
      <ModalBody
        px={px || 0}
        py={py || 0}
        bg={bg}
        rounded={bodyRounded || '2xl'}
      >
        {children}
      </ModalBody>
    </ModalContent>
  </Modal>
)

ModalWrapper.propTypes = {
  CustomHeader: PropTypes.node,
  alt: PropTypes.string,
  bg: PropTypes.string,
  bodyRounded: PropTypes.string,
  buttonProps: PropTypes.object,
  children: PropTypes.node,
  closeButtonColor: PropTypes.any,
  contentRounded: PropTypes.string,
  headerContainerProps: PropTypes.object,
  image: PropTypes.string,
  isCentered: PropTypes.bool,
  isDivider: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  px: PropTypes.any,
  py: PropTypes.number,
  scrollBehavior: PropTypes.string,
  showHeader: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string
}

export default ModalWrapper
