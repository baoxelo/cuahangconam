/** @format */
import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';

const cx = classNames.bind(styles);

function DefaultLayout({
  children,
  userInformation,
  handleShowModal,
  onLogout,
}) {
  return (
    <div className={cx('wrapper')}>
      <Header
        userInformation={userInformation}
        handleShowModal={handleShowModal}
        onLogout={onLogout}
      />
      <div className={cx('content')}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
