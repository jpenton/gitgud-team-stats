import App, { Container, AppComponentContext } from 'next/app';
import React from 'react';
import { ApolloClient } from 'apollo-boost';
import '../styles/index.css';
import Head from 'next/head';

class MyApp extends App<{ apollo: ApolloClient<any> }> {
  static async getInitialProps({ Component, ctx }: AppComponentContext) {
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
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>GitGud Stats</title>
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
      </Container>
    );
  }
}

export default MyApp;
