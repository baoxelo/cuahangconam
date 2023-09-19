/** @format */

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Cart.module.scss';
import * as getCartApi from '~/services/Cart/getCart';
import * as createInvoiceApi from '~/services/Invoice/createInvoice';
import CartItem from './CartItem';
import Button from '~/components/Buttons';

const cx = classNames.bind(styles);

function Cart({ userInformation }) {
  const [cart, setCart] = useState([]);
  const [replace, setReplace] = useState(false);
  const [invoiceInfo, setInvoiceInfo] = useState(userInformation);

  const fetchCart = async () => {
    var response = await getCartApi.GetCart();
    if (response) {
      setCart(response);
    }
  };

  const createInvoice = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('xác nhận đặt hàng')) {
      const response = await createInvoiceApi.CreateInvoice();
      if (response.status === 202) {
        alert(response.data.message);
      } else {
        alert('Đặt hàng thất bại hãy thử lại');
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('cart-list')}>
        {cart.map((item, index) => (
          <li key={index} className={cx('cart-item')}>
            <CartItem data={item} />
          </li>
        ))}
      </ul>
      <div className={cx('invoice-info')}>
        <div className={cx('user-wrapper')}>
          <h4 className={cx('user-info')}>
            Giao hàng đến : {invoiceInfo.fullName}
          </h4>
          {replace ? (
            <div className={cx('user-info')}>
              Giao hàng đến :
              <input
                value={invoiceInfo.phoneNumber}
                onChange={(e) =>
                  setInvoiceInfo((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            </div>
          ) : (
            <h4 className={cx('user-info')}>
              Số điện thoại : {invoiceInfo.phoneNumber}
            </h4>
          )}
          {replace ? (
            <div className={cx('user-info')}>
              Địa chỉ :
              <input
                className={cx('user-address')}
                spellCheck={false}
                value={invoiceInfo.address}
                onChange={(e) =>
                  setInvoiceInfo((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            </div>
          ) : (
            <h4 className={cx('user-info')}>Địa chỉ {invoiceInfo.address}</h4>
          )}
        </div>
        <div className={cx('action')}>
          <div
            className={cx('action-update')}
            onClick={() => {
              if (replace) {
                setReplace(false);
              } else {
                setReplace(true);
              }
            }}
          >
            {replace ? <h4>Cập nhật</h4> : <h4>Thay đổi</h4>}
          </div>
          <Button className={cx('action-btn')} primary onClick={createInvoice}>
            Đặt hàng
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
