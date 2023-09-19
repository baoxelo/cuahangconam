/** @format */
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Store.module.scss';
import AdminProduct from '~/components/Admin/Product';
import AdminCategory from '~/components/Admin/Category';
import Account from '~/components/Admin/Account';

const cx = classNames.bind(styles);

function Store() {
  const [category, setCategory] = useState('product');
  const renderBody = () => {
    switch (category) {
      case 'product':
        return <AdminProduct />;
      case 'account':
        return <Account />;
      case 'category':
        return <AdminCategory />;
      default:
        return <AdminProduct />;
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('sidebar')}>
          <ul className={cx('category-list')}>
            <li className={cx('category-item')}>
              <h1 className={cx('category-title')}>Sản phẩm</h1>
              <span
                className={cx('category-action', {
                  active: category === 'product',
                })}
                onClick={() => {
                  setCategory('product');
                }}
              >
                <h4 className={cx('category-action-title')}>
                  Quản lí sản phẩm
                </h4>
              </span>
              <span
                className={cx('category-action', {
                  active: category === 'category',
                })}
                onClick={() => {
                  setCategory('category');
                }}
              >
                <h4 className={cx('category-action-title')}>
                  Quản lí danh mục
                </h4>
              </span>
            </li>
            <li className={cx('category-item')}>
              <h1 className={cx('category-title')}>Người dùng</h1>
              <span
                className={cx('category-action', {
                  active: category === 'account',
                })}
                onClick={() => {
                  setCategory('account');
                }}
              >
                <h4 className={cx('category-action-title')}>
                  Quản lí tài khoản
                </h4>
              </span>
              <span
                className={cx('category-action', {
                  active: category === 'login',
                })}
                onClick={() => {
                  setCategory('login');
                }}
              >
                <h4 className={cx('category-action-title')}>
                  Thống kê truy cập
                </h4>
              </span>
            </li>
            <li className={cx('category-item')}>
              <h1 className={cx('category-title')}>Doanh số</h1>
              <span
                className={cx('category-action', {
                  active: category === 'order',
                })}
                onClick={() => {
                  setCategory('order');
                }}
              >
                <h4 className={cx('category-action-title')}>
                  Thông tin hóa đơn
                </h4>
              </span>
              <span
                className={cx('category-action', {
                  active: category === 'income',
                })}
                onClick={() => {
                  setCategory('income');
                }}
              >
                <h4 className={cx('category-action-title')}>
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
