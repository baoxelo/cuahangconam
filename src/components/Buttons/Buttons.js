/** @format */

import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Buttons.module.scss';

const cx = classNames.bind(styles);

const Button = forwardRef(function Button(
  {
    className,
    to,
    href,
    disable = false,
    children,
    onClick,
    primary,
    outline,
    leftIcon,
    rightIcon,
    ...passProps
  },
  ref
) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };

  if (disable) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  const classes = cx('wrapper', {
    [className]: className,
    disable,
    primary,
    outline,
  });

  return (
    <Comp className={classes} {...props} ref={ref}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
});

export default Button;
