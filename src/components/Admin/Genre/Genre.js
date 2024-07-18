/** @format */

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Genre.module.scss';
import * as GetGenreApi from '~/services/Genre/getGenre';
import * as CreateGenreApi from '~/services/Genre/createGenre';
import GenreItem from './GenreItem';

const cx = classNames.bind(styles);

function AdminGenre() {
  const [genre, setGenre] = useState([]);
  const [newGenre, setNewGenre] = useState({ name: '' });
  const createGenre = async () => {
    const respone = await CreateGenreApi.createGenre({
      name: newGenre.name,
    });
    if (respone.status === 202) {
      setNewGenre((prev) => ({
        ...prev,
        name: '',
      }));
    }
    if (respone.data.message) {
      alert(respone.data.message);
    }
    fetchGenre();
  };

  const fetchGenre = async () => {
    var response = await GetGenreApi.Genre();
    setGenre(response.data);
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <h3 className={cx('title')}>Id</h3>
        <h3 className={cx('title')}>Tên danh mục</h3>
        <h3 className={cx('title')}>Chỉnh sửa</h3>
      </header>
      <ul className={cx('new-genre')}>
        <li className={cx('new-genre-info')}>
          <h3>{genre.length + 1}</h3>
        </li>
        <li className={cx('new-genre-info')}>
          <input
            spellCheck={false}
            value={newGenre.name}
            onChange={(e) =>
              setNewGenre((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Nhập dữ liệu"
          />
        </li>
        <li className={cx('new-genre-info')}>
          <span className={cx('new-genre-create')} onClick={createGenre}>
            Thêm <FontAwesomeIcon icon={faCloudArrowUp} />
          </span>
        </li>
      </ul>
      <div className={cx('genre-list')}>
        {genre.map((item, index) => (
          <GenreItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default AdminGenre;
