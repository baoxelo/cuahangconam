/** @format */

import classNames from 'classnames/bind';
import styles from './InvoiceItem.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function InvoiceItem({ data }) {
  const [invoice, setInvoice] = useState(data);
  const [detail, setDetail] = useState(false);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('section')} onClick={() => setDetail(!detail)}>
        <h4 className={cx('info')}>{invoice.id}</h4>
        <h4 className={cx('info')}>{invoice.phoneNumber}</h4>
        <h4 className={cx('info')}>{invoice.address}</h4>
        <h4 className={cx('info')}>{invoice.totalPrice} đ</h4>
        <h4 className={cx('info')}>{invoice.status}</h4>
      </div>
      {detail &&
        invoice.items.map((item, index) => (
          <div className={cx('item-information')} key={index}>
            <img
              className={cx('item-image')}
              src={item.image}
              alt="filmimage"
            />
            <div className={cx('item-detail')}>
              <h3 className={cx('item-name')}>{item.name}</h3>
              <h4 className={cx('item-price')}>Đơn giá : {item.unitPrice} đ</h4>
              <h4 className={cx('item-price')}>Số lượng : {item.quantity} đ</h4>
              <h4 className={cx('item-price')}>Tổng giá : {item.price} đ</h4>
            </div>
          </div>
        ))}
    </div>
  );
}

export default InvoiceItem;
