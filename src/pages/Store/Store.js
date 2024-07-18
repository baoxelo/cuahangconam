/** @format */
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Store.module.scss';
import AdminFilm from '~/components/Admin/Film';
import AdminGenre from '~/components/Admin/Genre';
import Account from '~/components/Admin/Account';
import Invoice from '~/components/Admin/Invoice';
import Income from '~/components/Admin/Income';

const cx = classNames.bind(styles);

function Store() {
  const [genre, setGenre] = useState('film');
  const renderBody = () => {
    switch (genre) {
      case 'film':
        return <AdminFilm />;
      case 'genre':
        return <AdminGenre />;
      case 'account':
        return <Account />;
      case 'login':
        return <></>;
      case 'order':
        return <Invoice />;
      case 'income':
        return <Income />;
      default:
        return <AdminFilm />;
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('sidebar')}>
          <ul className={cx('genre-list')}>
            <li className={cx('genre-item')}>
              <h1 className={cx('genre-title')}>Sản phẩm</h1>
              <span
                className={cx('genre-action', {
                  active: genre === 'film',
                })}
                onClick={() => {
                  setGenre('film');
                }}
              >
                <h4 className={cx('genre-action-title')}>
                  Quản lí sản phẩm
                </h4>
              </span>
              <span
                className={cx('genre-action', {
                  active: genre === 'genre',
                })}
                onClick={() => {
                  setGenre('genre');
                }}
              >
                <h4 className={cx('genre-action-title')}>
                  Quản lí danh mục
                </h4>
              </span>
            </li>
            <li className={cx('genre-item')}>
              <h1 className={cx('genre-title')}>Người dùng</h1>
              <span
                className={cx('genre-action', {
                  active: genre === 'account',
                })}
                onClick={() => {
                  setGenre('account');
                }}
              >
                <h4 className={cx('genre-action-title')}>
                  Quản lí tài khoản
                </h4>
              </span>
              <span
                className={cx('genre-action', {
                  active: genre === 'access',
                })}
                onClick={() => {
                  setGenre('access');
                }}
              >
                <h4 className={cx('genre-action-title')}>
                  Thống kê truy cập
                </h4>
              </span>
            </li>
            <li className={cx('genre-item')}>
              <h1 className={cx('genre-title')}>Doanh số</h1>
              <span
                className={cx('genre-action', {
                  active: genre === 'order',
                })}
                onClick={() => {
                  setGenre('order');
                }}
              >
                <h4 className={cx('genre-action-title')}>
                  Thông tin hóa đơn
                </h4>
              </span>
              <span
                className={cx('genre-action', {
                  active: genre === 'income',
                })}
                onClick={() => {
                  setGenre('income');
                }}
              >
                <h4 className={cx('genre-action-title')}>
                  Thống kê doanh thu
                </h4>
              </span>
            </li>
          </ul>
        </div>
        <div className={cx('content')}>{renderBody()}</div>
      </div>
    </div>
  );
}

export default Store;
