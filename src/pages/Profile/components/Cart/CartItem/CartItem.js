/** @format */

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './CartItem.module.scss';
import * as addProductToCartApi from '~/services/Cart/addProductCart';
import * as getProductIdApi from '~/services/Products/getProduct';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

function CartItem({ data }) {
  const [price, setPrice] = useState(0);
  const [item, setItem] = useState(data);
  const [quantityInput, setQuantityInput] = useState(data.quantity);

  //Handle when the value in the input change on click button
  const handleChange = async (quantity) => {
    if (item.quantity > 0) {
      setQuantityInput(parseInt(quantityInput) + quantity);
    }
  };

  //Handle when the value in the input change when typing
  const handleOnChange = (e) => {
    var inputValue = e.target.value;
    if (inputValue === '') {
      setQuantityInput(0);
    } else {
      setQuantityInput(inputValue);
    }
  };

  //Use decounce and fetch api (after 1s typing completed, fetch Api)
  var debouncedValue = useDebounce(quantityInput, 1000);

  useEffect(() => {
    const fetchAddProductApi = async () => {
      if (item.quantity !== quantityInput) {
        const response = await addProductToCartApi.addProductToCart({
          productId: item.productId,
          quantity: quantityInput - item.quantity,
        });
        if (response.status === 202) {
          setItem((prev) => ({ ...prev, quantity: quantityInput }));
        }
      }
    };

    fetchAddProductApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    const fetchProduct = async () => {
      var response = await getProductIdApi.getProductId(item.productId);
      if (response.data) {
        setPrice(response.data.cost);
      }
    };
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('wrapper')}>
      <img className={cx('item-image')} src={item.image} alt="cartitemimage" />
      <div className={cx('item-information')}>
        <h3 className={cx('item-name')}>{item.name}</h3>
        <h4 className={cx('item-price')}>Đơn giá : {price} đ</h4>
        <h4 className={cx('item-price')}>
          Tổng giá : {price * quantityInput} đ
        </h4>
        <div className={cx('item-action')}>
          <FontAwesomeIcon
            className={cx('item-action-icom')}
            icon={faPlus}
            onClick={() => handleChange(1)}
          />
          <input
            type="number"
            value={quantityInput}
            onChange={handleOnChange}
            className={cx('item-quantity')}
          />

          <FontAwesomeIcon
            className={cx('item-action-icom')}
            icon={faMinus}
            onClick={() => handleChange(-1)}
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
