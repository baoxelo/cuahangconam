/** @format */
import classNames from 'classnames/bind';

import styles from './AdminLayout.module.scss';
import Header from '../components/Header';

const cx = classNames.bind(styles);

function AdminLayout({ children, userInformation, handleShowModal, onLogout }) {
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

export default AdminLayout;
