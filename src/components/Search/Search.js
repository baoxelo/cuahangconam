/** @format */

import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import useDebounce from '~/hooks/useDebounce';
import * as SearchApi from '~/services/Search/search';
import FilmItem from '../FilmItem/FilmItem';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 1000);

  const inputRef = useRef();
  const handleHideResult = () => {};

  const onChangeInput = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(e.target.value);
    }
  };
  const handleSearch = () => {};

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

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
      visible={searchResult.length > 0 && showResult}
      render={(attrs) => {
        if (searchResult && searchValue !== '' && showResult) {
          return (
            <div className={cx('search-result-wrapper')} {...attrs}>
              <h4 className={cx('search-result-title')}>Kết quả tìm kiếm</h4>
              <div className={cx('search-result-list')}>
                {searchResult.map((result, index) => (
                  <div className={cx('search-result-item')}>
                    <FilmItem key={index} data={result} />
                  </div>
                ))}
              </div>
            </div>
          );
        }
      }}
      placement="bottom-start"
      onClickOutside={handleHideResult}
    >
      <div className={cx('wrapper')}>
        <input
          className={cx('search-input')}
          value={searchValue}
          onChange={onChangeInput}
          placeholder="Tìm kiếm sản phẩm tại đây"
          ref={inputRef}
          spellCheck={false}
          onFocus={() => setShowResult(true)}
          onBlur={() => setShowResult(false)}
        />
        {!!searchValue && !loading && (
          <button className={cx('clear')} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {loading && (
          <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
        )}

        <button onClick={handleSearch} className={cx('search-btn')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </Tippy>
  );
}

export default Search;
