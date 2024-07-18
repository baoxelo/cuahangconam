/** @format */

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Film.module.scss';
import FilmItem from './FilmItem';
import * as GetFilmApi from '~/services/Admin/getFilms';
import * as CreateFilmApi from '~/services/Films/createFilm';
import * as GetGenreApi from '~/services/Genre/getGenre';
const cx = classNames.bind(styles);

function AdminFilm() {
  const [listFilm, setListFilm] = useState([]);
  const [genre, setGenre] = useState([]);
  const [film, setFilm] = useState({
    name: '',
    description: 'descript sản phẩm',
    image: '',
    cost: 0,
    quantity: 100,
    genreId: 1,
  });

  const createFilm = async () => {
    const respone = await CreateFilmApi.CreateFilm(film);
    if (respone.status === 201) {
      setFilm({
        name: '',
        description: 'descript sản phẩm',
        image: '',
        cost: 0,
        quantity: 100,
        genreId: 1,
      });
    }
    alert(respone.message);
    fetchFilm();
  };

  const fetchGenre = async () => {
    var { data } = await GetGenreApi.Genre();
    setGenre(data);
  };
  const fetchFilm = async () => {
    setListFilm(await GetFilmApi.GetFilmAdmin());
  };

  useEffect(() => {
    fetchFilm();
    fetchGenre();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('header')}>
          <h3 className={cx('title')}>
            <span>ID</span> <span>Cat ID</span>
          </h3>
          <h3 className={cx('title')}>Tên sản phẩm</h3>
          <h3 className={cx('title')}>Giá sản phẩm</h3>
          <h3 className={cx('title')}>Ảnh</h3>
          <h3 className={cx('title')}>Chỉnh sửa</h3>
        </div>
        <ul className={cx('film-item')}>
          <li className={cx('film-info')}>
            <select
              onChange={(e) =>
                setFilm((prev) => ({
                  ...prev,
                  genreId: e.target.value,
                }))
              }
            >
              {genre.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </li>
          <li className={cx('film-info')}>
            <input
              spellCheck={false}
              value={film.name}
              onChange={(e) =>
                setFilm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nhập dữ liệu"
            />
          </li>
          <li className={cx('film-info')}>
            <input
              spellCheck={false}
              value={film.cost}
              onChange={(e) =>
                setFilm((prev) => ({ ...prev, cost: e.target.value }))
              }
              placeholder="Nhập dữ liệu"
            />
          </li>
          <li className={cx('film-info')}>
            <input
              spellCheck={false}
              value={film.image}
              onChange={(e) =>
                setFilm((prev) => ({ ...prev, image: e.target.value }))
              }
              placeholder="Nhập dữ liệu"
            />
          </li>
          <li className={cx('film-info')}>
            <span className={cx('film-create')} onClick={createFilm}>
              Thêm <FontAwesomeIcon icon={faCloudArrowUp} />
            </span>
          </li>
        </ul>
        <div className={cx('film-list')}>
          {listFilm.map((item, index) => (
            <FilmItem
              key={index}
              item={item}
              fetchFilm={fetchFilm}
              genre={genre}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminFilm;
