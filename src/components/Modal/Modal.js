/** @format */

import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Modal({ children, hideModal }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <button className={cx('close-btn')} onClick={hideModal}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
