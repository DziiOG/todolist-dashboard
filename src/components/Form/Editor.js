import React from 'react'
import { Box, FormControl, FormLabel, Text } from '@chakra-ui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import PropTypes from 'prop-types'

const Editor = ({
  editor,
  name,
  onReady,
  onChange,
  touched,
  onBlur,
  onFocus,
  data,
  handleData,
  setFieldTouched,
  onError,
  error,
  placeholder,
  label,
  ...rest
}) => (
  <Box>
    <FormControl>
      {label && (
        <FormLabel fontSize='sm' color='gray.500'>
          {label}
        </FormLabel>
      )}
    </FormControl>
    <CKEditor
      css={{
        color: '#0000ff'
      }}
      config={{
        placeholder
      }}
      onError={onError}
      editor={editor || ClassicEditor}
      data={data}
      onReady={onReady}
      onChange={(event, edit) => {
        const datax = edit.getData()
        handleData(datax)
      }}
      onBlur={() => {
        setFieldTouched(name, false)
      }}
      onFocus={() => {
        setFieldTouched(name, true)
      }}
      {...rest}
    />
    {error && (
      <Box mb={{ md: 5 }}>
        <Text fontSize='sm' color='red.400' mt={2}>
          {error}
        </Text>
      </Box>
    )}
  </Box>
)

Editor.propTypes = {
  data: PropTypes.any,
  editor: PropTypes.any,
  error: PropTypes.any,
  handleChange: PropTypes.func,
  handleData: PropTypes.func,
  name: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onFocus: PropTypes.func,
  onReady: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  setFieldTouched: PropTypes.func,
  touched: PropTypes.any
}

export default Editor
