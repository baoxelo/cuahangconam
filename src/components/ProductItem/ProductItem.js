/** @format */

import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
  return (
    <div className={cx('wrapper')}>
      <img
        src={data.image}
        alt="productimage"
        className={cx('product-image')}
      />
      <div className={cx('product-info')}>
        <h4 className={cx('product-name')}>{data.name}</h4>
        <span className={cx('product-cost')}>Giá: {data.cost} / lạng</span>
      </div>
    </div>
  );
}

export default ProductItem;
