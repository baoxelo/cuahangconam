/** @format */
import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';

const cx = classNames.bind(styles);

function DefaultLayout({ children, userInformation, handleLogin }) {
  return (
    <div className={cx('wrapper')}>
      <Header userInformation={userInformation} handleLogin={handleLogin} />
      <div className={cx('content')}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
