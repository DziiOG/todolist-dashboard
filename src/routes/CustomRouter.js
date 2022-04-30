import { useLayoutEffect, useState } from 'react'
import { Router } from 'react-router-dom'
import PropTypes from 'prop-types'

const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  })

  useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}

CustomRouter.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.any,
    location: PropTypes.any,
    listen: PropTypes.any
  })
}

export default CustomRouter
