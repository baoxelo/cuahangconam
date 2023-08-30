/** @format */

import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Search() {
  const [valueInput, setValueInput] = useState('');

  const handleSearch = () => {};
  return (
    <div className={cx('wrapper')}>
      <input
        className={cx('search-input')}
        value={valueInput}
        onChange={(e) => setValueInput(e.value)}
        placeholder="Tìm kiếm sản phẩm tại đây"
      />
      <button onClick={handleSearch} className={cx('search-btn')}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

export default Search;
