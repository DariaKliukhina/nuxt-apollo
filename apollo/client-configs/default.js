import { HttpLink } from 'apollo-link-http'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

export default () => ({
  link: new HttpLink({
    uri:
      (process.browser
        ? process.env.BACKEND_PUBLIC_URL
        : process.env.BACKEND_PRIVATE_URL) + process.env.GQ_API_PATH,
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
  defaultHttpLink: false,
})
