/** @format */

import styles from './ProductList.module.scss';
import classNames from 'classnames/bind';
import Product from '~/components/Product';

const cx = classNames.bind(styles);

function ProductList({ data }) {
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('product-list')}>
        {data.map((item, index) => (
          <li key={index} className={cx('product-item')}>
            <Product data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
