/** @format */

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';
import config from '~/configs';

const cx = classNames.bind(styles);

function Menu({ onLogout }) {
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('action-list')}>
        <li className={cx('action-item')}>
          <Link
            to={config.routes.profile + '=user'}
            className={cx('action-link')}
          >
            Thông tin cá nhân
          </Link>
        </li>
        <li className={cx('action-item')}>
          <button onClick={onLogout} className={cx('logout-btn')}>
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
