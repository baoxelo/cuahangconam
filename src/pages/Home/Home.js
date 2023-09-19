/** @format */
import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';

import styles from './Home.module.scss';
import ProductList from '~/layouts/components/ProductList';
import Sidebar from '~/layouts/components/Sidebar';
import * as ProductApi from '~/services/Products/product';
import * as CategoryApi from '~/services/Category/getCategory';
const cx = classNames.bind(styles);

function Home() {
  const [productList, setProductList] = useState([]);

  const handleSidebar = async (id) => {
    if (id === 0) {
      await initProduct();
      return;
    }
    var response = await CategoryApi.Category(id);
    setProductList(response.data.products);
  };
  useEffect(() => {
    initProduct();
  }, []);

  const initProduct = async () => {
    setProductList(await ProductApi.Product());
  };

  return (
    <div className={cx('wrapper')}>
      <Sidebar className={cx('sidebar')} handleSidebar={handleSidebar} />
      <ProductList data={productList} />
    </div>
  );
}

export default memo(Home);
