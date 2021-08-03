import '../styles/globals.css'
import { useRef } from 'react'
import { Provider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  const queryClientRef = useRef()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  )
}
