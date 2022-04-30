import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import { ChakraProvider } from '@chakra-ui/react'
import './assets/styles/index.css'
import { theme } from 'theme/theme'
import App from 'container/App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
// import Spinner from 'components/FetchCard/Spinner'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import reportWebVitals from './reportWebVitals'

ChartJS.register(ArcElement, Tooltip, Legend)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 60 * 24 * 1000
    }
  }
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <App />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ChakraProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
