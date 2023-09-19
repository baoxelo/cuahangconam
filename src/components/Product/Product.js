/** @format */
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Button from '../Buttons/Buttons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import * as AddProductToCartApi from '~/services/Cart/addProductCart';
const cx = classNames.bind(styles);

function Product({ data }) {
  const [quantity, setQuantity] = useState(0);
  const handleOnChange = (e) => {
    var quantityValue = e.target.value;
    if (quantityValue === '') {
      setQuantity(0);
      return;
    }
    if (quantityValue > data.quantity * 10) {
      setQuantity(data.quantity);
      return;
    }
    setQuantity(quantityValue);
  };

  //Fetch Api and add product
  const handleAddProduct = async () => {
    if (!localStorage.getItem('token')) {
      alert('Vui lòng đăng nhập để thêm hàng vào giỏ');
      return;
    }
    var item = {
      productId: data.id,
      quantity: quantity,
    };
    var response = await AddProductToCartApi.addProductToCart(item);
    if (response.status === 401) {
      alert('Vui lòng đăng nhập để thêm hàng vào giỏ');
      return;
    } else {
      if (response.status === 202) {
        alert(`Đã thêm ${quantity} lạng ${data.name} vào giỏ hàng`);
        return;
      } else {
        alert(`Có lỗi xảy ra không thể thêm hàng`);
      }

      return;
    }
  };
  return (
    <div className={cx('wrapper')}>
      <img className={cx('image')} src={data.image} alt="ProductImage" />
      <div className={cx('info')}>
        <h3 className={cx('name')}>{data.name}</h3>
        <div className={cx('cost')}>
          <h5>Giá: </h5>
          <h5>{data.cost} đ / lạng</h5>
        </div>
        <div className={cx('quantity')}>
          <h5>Còn lại: </h5>
          <h5>{data.quantity} kg</h5>
        </div>
        <div className={cx('action-wrapper')}>
          <button
            className={cx('action-btn')}
            onClick={() => setQuantity(parseInt(quantity) + 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <input
            type="number"
            className={cx('action-input')}
            value={quantity}
            onChange={handleOnChange}
          />
          <button
            className={cx('action-btn')}
            onClick={() =>
              setQuantity((prev) => {
                if (prev !== 0) {
                  return parseInt(prev) - 1;
                } else return 0;
              })
            }
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <span className={cx('action-title')}>Đơn vị: Lạng / 100 gram</span>
      </div>
      <Button className={cx('add-btn')} primary onClick={handleAddProduct}>
        Thêm vào giỏ hàng
      </Button>
    </div>
  );
}

export default Product;
