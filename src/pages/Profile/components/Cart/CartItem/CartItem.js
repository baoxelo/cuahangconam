/** @format */

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './CartItem.module.scss';
import * as addFilmToCartApi from '~/services/Cart/addFilmCart';
import * as getFilmIdApi from '~/services/Films/getFilm';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

function CartItem({ data }) {
  const [price, setPrice] = useState(0);
  const [item, setItem] = useState(data);
  const [quantityInput, setQuantityInput] = useState(data.quantity);

  //Handle when the value in the input change on click button
  const handleChange = async (quantity) => {
    if (quantityInput > 0) {
      setQuantityInput(parseInt(quantityInput) + quantity);
    } else {
      setQuantityInput(0);
    }
  };

  //Handle when the value in the input change when typing
  const handleOnChange = (e) => {
    var inputValue = e.target.value;
    if (inputValue === '' || inputValue < 0) {
      setQuantityInput(0);
    } else {
      setQuantityInput(inputValue);
    }
  };

  //Use decounce and fetch api (after 1s typing completed, fetch Api)
  var debouncedValue = useDebounce(quantityInput, 1000);

  useEffect(() => {
    const fetchAddFilmApi = async () => {
      if (item.quantity !== quantityInput) {
        const response = await addFilmToCartApi.addFilmToCart({
          filmId: item.filmId,
          quantity: quantityInput - item.quantity,
        });
        if (response.status === 202) {
          setItem((prev) => ({ ...prev, quantity: quantityInput }));
        }
      }
    };

    fetchAddFilmApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    const fetchFilm = async () => {
      var response = await getFilmIdApi.getFilmId(item.filmId);
      if (response.data) {
        setPrice(response.data.cost);
      }
    };
    fetchFilm();
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
