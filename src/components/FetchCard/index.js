/* eslint-disable prefer-spread */
import React from 'react'
import PropTypes from 'prop-types'
import { IoIosRefresh } from 'react-icons/io'
import {
  Flex,
  Text,
  Button,
  Spinner,
  Skeleton,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionSkeleton = motion(Skeleton)

/**
 * FetchCard
 * @description Render a spinner
 * @component FetchCard
 * @author Whitson Dzimah
 * @param {Object} props Properties of FetchCard
 * @param {boolean} props.loading - is loading
 * @param {any} props.error - has error
 * @param {Object} props.reload - triggers refetching if unsuccessful
 * @param {string} props.text - Text to render when loading
 * @param {...*} rest
 *
 */

const FetchCard = ({
  loading,
  error,
  text,
  reload,
  asSkeleton,
  skeletonProps = {},
  ...rest
}) => (
  <>
    {asSkeleton && loading ? (
      skeletonProps.repeat ? (
        <Grid w='100%' templateColumns='repeat(4, 1fr)'>
          {Array.apply(null, { length: skeletonProps.repeat }).map(
            (_, index) => (
              <GridItem w='100%' key={(i => i)(index)}>
                <MotionSkeleton isLoaded={!loading} {...skeletonProps} />
              </GridItem>
            )
          )}
        </Grid>
      ) : (
        <Skeleton isLoaded={!loading} {...skeletonProps} />
      )
    ) : (
      <Flex {...rest}>
        <Flex
          textAlign='center'
          align='center'
          justify='center'
          direction='column'
        >
          <>
            {loading && (
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='cf.900'
                size='xl'
              />
            )}
            {text && !error && (
              <Text className='loading-text loading-text-b'>{text}</Text>
            )}
            {error && !loading && (
              <>
                <Text fontSize='md' ml={2}>
                  Something went wrong.
                </Text>
                <Button
                  variant='solid'
                  bg='cf.400'
                  height='40px'
                  width='100px'
                  color='white'
                  size='md'
                  px={14}
                  rounded='20px'
                  fontSize={30}
                  onClick={() => reload()}
                  leftIcon={<IoIosRefresh />}
                  _hover={{ bg: 'cf.400' }}
                >
                  <Text fontSize='md'>Try again</Text>
                </Button>
              </>
            )}
          </>
        </Flex>
      </Flex>
    )}
  </>
)

FetchCard.propTypes = {
  asSkeleton: PropTypes.bool,
  error: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  reload: PropTypes.func.isRequired,
  skeletonProps: PropTypes.object,
  text: PropTypes.any
}

export default FetchCard
