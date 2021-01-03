import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import { DefaultSeo } from 'next-seo'
import SEOConfig from '../lib/next-seo.config'
import '../styles/index.scss'
import 'antd/dist/antd.css'

export default function App ({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <DefaultSeo {...SEOConfig} />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
