import App, { Container, NextAppContext } from 'next/app';
import React from 'react';
import withApolloClient from '../lib/withApolloClient';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import '../styles/index.css';
import getConfig from 'next/config';
import Head from 'next/head';

class MyApp extends App<{ apollo: ApolloClient<any> }> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps: Record<string, any> = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps: {
        ...pageProps,
        query: ctx.query,
        pathname: ctx.pathname,
      },
    };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Head>
            <title>GitGud Stats</title>
            <link
              rel="shortcut icon"
              href="https://gitgud.nyc3.cdn.digitaloceanspaces.com/images/favicon.ico"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://rsms.me/inter/inter.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
            />
          </Head>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

const isProd = (): boolean => {
  const config = getConfig();

  return config.publicRuntimeConfig.NODE_ENV === 'production';
};

export default withApolloClient(isProd)(MyApp);
