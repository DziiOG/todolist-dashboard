/**
 * Method to return backend services urls based on the environment
 * @function
 *
 * */
const configs = () => {
  // Get REACT ENV
  const ENV = process.env.REACT_APP_ENVIRONMENT
  console.log(process.env, 'envs')
  return {
    TODO_LIST_API: process.env[`REACT_APP_${ENV}_TODO_LIST_API`]
  }
}
export default configs
