import React from 'react'
import { createBrowserHistory } from 'history'
import { ComponentContextProvider } from 'context/useComponent'
import { ApiContextProvider } from 'context/useApi'
import useAuth, { AuthContextProvider } from 'context/useAuth'
import Spinner from 'components/FetchCard/Spinner'
import { ModalContextProvider } from 'context/useModal'
import Router from '../routes/Router'
import CustomRouter from '../routes/CustomRouter'

const RouterContainer = () => {
  const { userIsLoading, userHasError, userRefetch } = useAuth()
  return (
    <Spinner
      h='100vh'
      w='100vw'
      hook={{
        loading: userIsLoading,
        error: userHasError,
        refetch: userRefetch,
        loadingText: 'Authenticating'
      }}
      align='center'
      justify='center'
    >
      <Router />
    </Spinner>
  )
}

function App() {
  const history = createBrowserHistory()

  return (
    <CustomRouter history={history}>
      <ComponentContextProvider>
        <ApiContextProvider>
          <AuthContextProvider>
            <ModalContextProvider>
              <RouterContainer />
            </ModalContextProvider>
          </AuthContextProvider>
        </ApiContextProvider>
      </ComponentContextProvider>
    </CustomRouter>
  )
}

export default App
