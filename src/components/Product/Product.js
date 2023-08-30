/** @format */
import classNames from 'classnames/bind';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);

function Product({ img, name, cost, quantity, className }) {
  return (
    <div className={cx('wrapper', { [className]: className })}>
      <img className={cx('image')} src={img} alt="ProductImage" />
      <h3 className={cx('name')}>{name}</h3>
      <h4 className={cx('cost')}>{cost}</h4>
      <span className={cx('quantity')}>{quantity}</span>
    </div>
  );
}

export default Product;
