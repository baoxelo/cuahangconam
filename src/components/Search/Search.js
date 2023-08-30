/** @format */

import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '~/hooks/useDebounce';
import * as SearchApi from '~/services/search';
import ProductItem from '../ProductItem/ProductItem';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 1000);

  const handleHideResult = () => {};

  const onChangeInput = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(e.target.value);
    }
  };
  const handleSearch = () => {};
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await SearchApi.Search(debouncedValue);
      setSearchResult(result);

      setLoading(false);
    };

    fetchApi();
  }, [debouncedValue]);
  return (
    <Tippy
      interactive
      visible={true} //{searchResult.length > 0 && showResult}
      render={(attrs) => (
        <div className={cx('search-result')} {...attrs}>
          {searchResult.map((result, index) => (
            <ProductItem key={index} data={result} />
          ))}
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx('wrapper')}>
        <input
          className={cx('search-input')}
          value={searchValue}
          onChange={onChangeInput}
          placeholder="Tìm kiếm sản phẩm tại đây"
        />
        <button onClick={handleSearch} className={cx('search-btn')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </Tippy>
  );
}

export default Search;
