import withApollo from 'next-with-apollo';
import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-boost/lib/index';

export default (isProd: () => boolean) =>
  withApollo(
    ({ initialState }) =>
      new ApolloClient({
        uri: isProd() ? 'https://gitgud-api.cpu.tf' : 'http://localhost:8000',
        cache: new InMemoryCache().restore(initialState || {}),
      }),
  );
