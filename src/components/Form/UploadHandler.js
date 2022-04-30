import { Box, Flex, Grid, GridItem, Icon, Image } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { FiX } from 'react-icons/fi'
import { FileUpload } from '.'

const UploadHandler = ({ id, setFieldValue, files, setFieldTouched }) => {
  const handlePicDelete = preview => {
    const newFiles = files.filter(i => i.preview !== preview)
    setFieldValue(id, newFiles)
  }
  return (
    <Box>
      <Grid templateColumns='repeat(3, 1fr)' mt={6} gap={4}>
        <GridItem>
          <FileUpload
            id={id}
            title='Upload'
            setFieldValue={(e, v) => {
              setFieldValue(e, [...files, ...v])
            }}
            setFieldTouched={setFieldTouched}
            multiple
          />
        </GridItem>
        {files &&
          files?.map((file, index) => (
            <GridItem key={(i => i)(index)}>
              <Box
                w='164px'
                h={32}
                rounded='xl'
                mt={0}
                overflow='hidden'
                position='relative'
                shadow='lg'
              >
                <Flex
                  justify='center'
                  align='center'
                  top={1}
                  right={2}
                  position='absolute'
                  w={6}
                  h={6}
                  cursor='pointer'
                  bg='blackAlpha.300'
                  rounded='full'
                  onClick={() => handlePicDelete(file.preview)}
                >
                  <Icon as={FiX} boxSize={4} color='white' />
                </Flex>
                <Image src={file?.preview} />
              </Box>
            </GridItem>
          ))}
      </Grid>
    </Box>
  )
}

UploadHandler.propTypes = {
  setFieldTouched: PropTypes.any,
  files: PropTypes.array,
  id: PropTypes.any,
  setFieldValue: PropTypes.any
}

export default UploadHandler
