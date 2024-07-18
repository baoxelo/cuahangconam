/** @format */

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Invoice.module.scss';
import * as GetInvoiceApi from '~/services/Invoice/getInvoice';
import InvoiceItem from './InvoiceItem/InvoiceItem';

const cx = classNames.bind(styles);

function Invoice() {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoice = async () => {
    const response = await GetInvoiceApi.GetInvoice();
    if (response) {
      setInvoices(response);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <h1 className={cx('header-title')}>Mã đơn hàng</h1>
        <h1 className={cx('header-title')}>Số điện thoại</h1>
        <h1 className={cx('header-title')}>Địa chỉ</h1>
        <h1 className={cx('header-title')}>Tổng giá</h1>
        <h1 className={cx('header-title')}>Trạng thái</h1>
      </header>
      <div className={cx('container')}>
        {invoices.map((item, index) => (
          <InvoiceItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Invoice;
