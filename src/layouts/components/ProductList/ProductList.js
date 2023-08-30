/** @format */

import { useEffect, useState } from 'react';
import styles from './ProductList.module.scss';
import classNames from 'classnames/bind';
import * as ProductApi from '~/services/product';
import Product from '~/components/Product';

const cx = classNames.bind(styles);

function ProductList() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    inistialProduct();
  }, []);
  const inistialProduct = async () => {
    setProductList(await ProductApi.Product());
  };

  return (
    <div className={cx('wrapper')}>
      <ul className={cx('product-list')}>
        {productList.map((item, index) => (
          <li key={index} className={cx('product-item')}>
            <Product
              img={item.image}
              name={item.name}
              cost={item.cost}
              quantity={item.quantity}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
