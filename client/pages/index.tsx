import * as React from 'react';
import Link from 'next/link';
import { NextFC } from 'next';

const IndexPage: NextFC = () => {
  return (
    <>
      <h1>Index</h1>
      <Link href="/teams">
        <a>Teams</a>
      </Link>
    </>
  );
};

export default IndexPage;
