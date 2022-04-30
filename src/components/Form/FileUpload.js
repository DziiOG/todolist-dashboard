import { Box, Flex, Text, Icon, FormLabel, FormControl } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { BsX } from 'react-icons/bs'
import { MdAttachFile } from 'react-icons/md'
import PropTypes from 'prop-types'
import FormErrorHandler from './FormErrorHandler'

const FileUpload = ({
  id,
  name,
  error,
  label,
  touched,
  maxSize,
  multiple,
  isRequired,
  setFieldValue,
  setFieldTouched,
  height = 52,
  color = 'black.800',
  accept = 'image/*, application/pdf',
  showThumb = 'true',
  thumbWidth = 60,
  thumbHeight = 40,
  ...rest
}) => {
  const [isTouched, setTouched] = useState(false)
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    multiple,
    onDrop: acceptedFiles => {
      setFieldValue(id, multiple ? acceptedFiles : acceptedFiles[0])
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    },
    ...rest
  })

  const removeImage = _id => {
    const newImages = files.filter(item => item.name !== _id)
    setFiles(newImages)
    setFieldValue(_id, undefined)
  }

  const thumbs = files.map(file => (
    <Box
      mr={4}
      w='full'
      pos='relative'
      d='inline-block'
      boxSizing='border-box'
      key={file.name || ''}
    >
      <Box
        w={6}
        h={6}
        top={2}
        shadow='md'
        right={-10}
        bg='white'
        as='button'
        role='button'
        rounded='100%'
        pos='absolute'
        color='gray.700'
        aria-label='close button'
        onClick={() => removeImage(file.name || '')}
      >
        <Icon as={BsX} />
      </Box>
      <Box
        pt={4}
        w={thumbWidth}
        h={thumbHeight}
        as='embed'
        src={`${file.preview}#toolbar=0&navpanes=0&statusbar=0`}
      />

      <Text fontSize='sm' mb={2}>
        {file.name}
      </Text>
    </Box>
  ))

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview || ''))
    },
    [files]
  )

  const showError = error && touched

  return (
    <FormControl
      pos='relative'
      id={id || name}
      isInvalid={!!showError}
      isRequired={isRequired}
      color={showError ? 'red.500' : color}
      onMouseLeave={() => isTouched && setFieldTouched(id, true)}
    >
      {label && (
        <FormLabel
          color={color}
          fontWeight={500}
          fontSize={{ base: 'xs', xl: 'xxl' }}
        >
          {label}
        </FormLabel>
      )}

      <Flex
        h={height}
        rounded='md'
        align='center'
        pos='relative'
        justify='center'
        cursor='pointer'
        border='1px dashed #004C46'
      >
        <Flex
          w='full'
          h='full'
          justify='center'
          {...getRootProps({
            className: 'dropzone',
            onClick: () => setTouched(true)
          })}
        >
          <input {...getInputProps()} />
          {files.length === 0 && (
            <Flex align='center' justify='center' flexDir='column'>
              <Flex align='center' color='brand.green.200'>
                <Icon as={MdAttachFile} />
                <Text fontSize='sm' ml={2}>
                  Upload or drag & drop
                </Text>
              </Flex>
              {maxSize && (
                <Flex align='center' color='gray.400' fontWeight='bold'>
                  <Text fontSize='xs' ml={2}>
                    file size should not exceed ({maxSize / (1024 * 1024)}
                    mb)
                  </Text>
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
        {showThumb && (
          <Flex pos='absolute' flexWrap='wrap' justify='space-around'>
            {thumbs}
          </Flex>
        )}
      </Flex>
      {showError && <FormErrorHandler error={error} touched={touched} />}
    </FormControl>
  )
}

FileUpload.propTypes = {
  id: PropTypes.any,
  title: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string,
  touched: PropTypes.bool,
  name: PropTypes.string,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func,
  multiple: PropTypes.bool,
  color: PropTypes.string,
  maxSize: PropTypes.any,
  isRequired: PropTypes.bool,
  height: PropTypes.any,
  showThumb: PropTypes.bool,
  accept: PropTypes.string,
  thumbWidth: PropTypes.any,
  thumbHeight: PropTypes.any
}

export default FileUpload
