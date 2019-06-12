import * as React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import Container from './Container';
import Router from 'next/router';
import nprogress from 'nprogress';

Router.onRouteChangeStart = () => {
  nprogress.start();
};

Router.onRouteChangeComplete = () => {
  nprogress.done();
};

Router.onRouteChangeError = () => {
  nprogress.done();
};

interface IProps {
  pathname: string;
}

class Header extends React.Component<IProps> {
  render() {
    return (
      <div className="header">
        <Container>
          <Link href="/">
            <a className="nav-brand">GitGud</a>
          </Link>
          <Link href="/teams">
            <a
              className={classnames('nav-link', {
                active: this.props.pathname === '/teams',
              })}
            >
              Teams
            </a>
          </Link>
        </Container>
      </div>
    );
  }
}

export default Header;
