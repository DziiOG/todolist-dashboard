import React from 'react'
import { createBrowserHistory } from 'history'
import { ComponentsProvider } from 'context/component'
import { ApiContextProvider } from 'context/useApi'
import useAuth, { AuthContextProvider } from 'context/useAuth'
import Spinner from 'components/FetchCard/Spinner'
import Router from '../routes/Router'
import { ModalProvider } from '../context/modal'
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
      <ComponentsProvider>
        <ApiContextProvider>
          <AuthContextProvider>
            <ModalProvider>
              <RouterContainer />
            </ModalProvider>
          </AuthContextProvider>
        </ApiContextProvider>
      </ComponentsProvider>
    </CustomRouter>
  )
}

export default App
