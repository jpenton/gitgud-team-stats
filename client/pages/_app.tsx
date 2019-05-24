import App, { Container, NextAppContext } from 'next/app';
import React from 'react';
import withApolloClient from '../lib/withApolloClient';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import '../styles/index.css';

class MyApp extends App<{ apollo: ApolloClient<any> }> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps: Record<string, any> = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // this exposes the query to the user
    pageProps.query = ctx.query;

    return { pageProps };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
