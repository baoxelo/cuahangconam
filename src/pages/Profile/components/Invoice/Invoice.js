/** @format */

import classNames from 'classnames/bind';
import styles from './Invoice.module.scss';

const cx = classNames.bind(styles);

function Invoice() {
  return <div className={cx('wrapper')}>Invoice</div>;
}

export default Invoice;
