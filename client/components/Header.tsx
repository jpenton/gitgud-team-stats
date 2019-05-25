import * as React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import Container from './Container';

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
