import React from 'react'
import PropTypes from 'prop-types'
import FetchCard from '.'

/**
 * Spinner
 * @description Renders a spinner when making an api call before returning a component after success. on error renders a button to retry
 * @component Spinner
 * @author Whitson William Nyarko Dzimah <whitsonwilliam@icloud.com>
 * @param {Object} props Properties of Spinner
 * @param {JSX.Element} props.children - JSX Elements, usually nodes
 * @param {Object} props.hook - hook object
 * @param {boolean} props.hook.loading - is loading
 * @param {any} props.hook.error - has error
 * @param {Object} props.hook.triggerReload - triggers refetching if unsuccessful
 * @param {string} props.hook.loadingText - Text to render when loading
 * @param {Object|number|string} props.justify - justify content
 * @param {Object|number|string} props.w - width
 * @param {Object|number|string} props.h - height
 * @param {Object|number|string} props.align - align items
 * @param {...*} rest
 *
 */

const Spinner = ({
  children,
  hook,
  justify,
  w,
  h,
  align,
  asSkeleton,
  skeletonProps,
  ...rest
}) => {
  const { loading, error, triggerReload, loadingText } = hook
  return loading || error ? (
    <FetchCard
      {...rest}
      align={align || 'center'}
      justify={justify || 'center'}
      w={w || '100%'}
      h={h || '100vh'}
      text={loadingText}
      loading={loading}
      asSkeleton={asSkeleton}
      skeletonProps={skeletonProps}
      error={error}
      reload={() => triggerReload()}
    />
  ) : (
    children
  )
}

Spinner.propTypes = {
  align: PropTypes.any,
  asSkeleton: PropTypes.bool,
  children: PropTypes.node,
  h: PropTypes.any,
  hook: PropTypes.object.isRequired,
  justify: PropTypes.any,
  skeletonProps: PropTypes.any,
  w: PropTypes.any
}

export default Spinner
