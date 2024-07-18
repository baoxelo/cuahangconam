/** @format */
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareCheck,
  faTrash,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';

import styles from './InvoiceItem.module.scss';
import * as CompleteInvoice from '~/services/Admin/completeInvoice';
import * as cancelInvoice from '~/services/Admin/cancelInvoice';

const cx = classNames.bind(styles);

function InvoiceItem({ data }) {
  const [invoice, setInvoice] = useState(data);
  const [detail, setDetail] = useState(false);

  const handleSubmit = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Xác nhận hoàn tất đơn hàng ?') === true) {
      const response = await CompleteInvoice.CompleteInvoice(invoice.id);
      if (response) {
        alert(`Đã hoàn tất đơn hàng id: ${invoice.id} !`);
        setInvoice((prev) => ({ ...prev, status: 'Đã giao' }));
      } else {
        alert('Lỗi server thử lại sau');
      }
    }
  };
  const handleCancel = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Hủy đơn hàng id : ${invoice.id}`) === true) {
      const response = await cancelInvoice.CancelInvoice(invoice.id);
      if (response) {
        alert('Đã hủy đơn hàng');
      } else {
        alert('Lỗi server thử lại sau !');
      }
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('section')} onClick={() => setDetail(!detail)}>
        <h4 className={cx('info')}>{invoice.id}</h4>
        <h4 className={cx('info')}>{invoice.phoneNumber}</h4>
        <h4 className={cx('info')}>{invoice.address}</h4>
        <h4 className={cx('info')}>{invoice.totalPrice} đ</h4>
        <h4 className={cx('info')}>{invoice.status}</h4>
        <h4 className={cx('info')}>
          {invoice.status === 'Chưa giao' ? (
            <FontAwesomeIcon
              className={cx('icon')}
              icon={faSquareCheck}
              onClick={handleSubmit}
            />
          ) : (
            <FontAwesomeIcon className={cx('icon')} icon={faTruckFast} />
          )}
          <FontAwesomeIcon
            className={cx('icon')}
            icon={faTrash}
            onClick={handleCancel}
          />
        </h4>
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
