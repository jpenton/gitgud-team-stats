import * as React from 'react';
import { NextSFC } from 'next';
import Header from '../components/Header';
import { PageProps } from '../types';

const IndexPage: NextSFC<PageProps> = ({ pathname }) => (
  <Header pathname={pathname} />
);

export default IndexPage;
