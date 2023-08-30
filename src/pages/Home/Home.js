/** @format */
import classNames from 'classnames/bind';
import { memo } from 'react';

import styles from './Home.module.scss';
import ProductList from '~/layouts/components/ProductList';
import Sidebar from '~/layouts/components/Sidebar';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
      <Sidebar className={cx('sidebar')} />
      <ProductList />
    </div>
  );
}

export default memo(Home);
