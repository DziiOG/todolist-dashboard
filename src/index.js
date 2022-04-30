import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import './assets/styles/index.css'
import { theme } from 'theme/theme'
import App from 'container/App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
// import Spinner from 'components/FetchCard/Spinner'

import reportWebVitals from './reportWebVitals'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 60 * 24 * 1000
    }
  }
})
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <App />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ChakraProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
