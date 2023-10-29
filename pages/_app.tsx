import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import ModalsProvider from '../src/components/context/modals';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <ModalsProvider>
        <Component {...pageProps} />
      </ModalsProvider>
    </ApolloProvider>
  );
}
