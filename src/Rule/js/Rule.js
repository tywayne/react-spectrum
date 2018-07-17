import classNames from 'classnames';
import filterDOMProps from '../../utils/filterDOMProps';
import React from 'react';

importSpectrumCSS('rule');

export default function Rule({
  className,
  variant = 'large',
  ...otherProps
}) {

  return (
    <hr
      {...filterDOMProps(otherProps)}
      className={classNames(
        'spectrum-Rule',
        `spectrum-Rule--${variant}`,
        className
      )} />
  );
}
