import * as React from 'react';
import classnames from 'classnames';

interface IProps {
  addMargin?: boolean;
}

const Container: React.SFC<IProps> = ({ children, addMargin = false }) => (
  <div className="flex justify-center">
    <div
      className={classnames(
        'container',
        {
          'pt-4': addMargin,
          'pb-16': addMargin,
        },
        'px-4',
      )}
    >
      {children}
    </div>
  </div>
);

export default Container;
