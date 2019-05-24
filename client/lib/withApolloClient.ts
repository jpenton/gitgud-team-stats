import withApollo from 'next-with-apollo';
import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-boost/lib/index';

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: 'http://localhost:8000',
      cache: new InMemoryCache().restore(initialState || {}),
    }),
);
