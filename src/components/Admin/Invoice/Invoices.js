/** @format */

import classNames from 'classnames/bind';
import styles from './Invoice.module.scss';
import { useEffect, useState } from 'react';
import * as getInvoiceApi from '~/services/Admin/getInvoices';
import InvoiceItem from './InvoiceItem';

const cx = classNames.bind(styles);

function Invoice() {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoice = async () => {
    const response = await getInvoiceApi.GetInvoice();
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
        <h2 className={cx('title')}>Id</h2>
        <h2 className={cx('title')}>Số điện thoại</h2>
        <h2 className={cx('title')}>Địa chỉ</h2>
        <h2 className={cx('title')}>Tổng giá</h2>
        <h2 className={cx('title')}>Trạng thái</h2>
        <h2 className={cx('title')}>Edit</h2>
      </header>
      <section className={cx('list')}>
        {invoices.map((item, index) => (
          <InvoiceItem key={index} data={item} />
        ))}
      </section>
    </div>
  );
}

export default Invoice;
