/** @format */

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from './FilmItem.module.scss';
import * as UpdateFilmApi from '~/services/Films/updateFilm';
import * as DeleteFilmApi from '~/services/Films/deleteFilm';

const cx = classNames.bind(styles);

function FilmItem({ item, fetchFilm, genre }) {
  const [update, setUpdate] = useState(false);
  const [film, setFilm] = useState(item);

  const handleUpdate = async () => {
    if (update) {
      const response = await UpdateFilmApi.UpdateFilm(
        film.id,
        film
      );
      if (response.status === 204) {
        setUpdate(false);
      }
      alert(response.message);
    } else {
      setUpdate(true);
    }
  };

  const handleDelete = async () => {
    var text = 'Bạn có chắc muốn xóa sản phẩm này';
    // eslint-disable-next-line no-restricted-globals
    if (confirm(text) === true) {
      const response = await DeleteFilmApi.DeleteFilm(film.id);
      if (response.status === 204) {
        setUpdate(false);
      }
      alert(response.message);
      fetchFilm();
    } else {
      return;
    }
  };

  return (
    <div>
      <ul className={cx('film-item')}>
        <li className={cx('film-info')}>
          <h4>{film.id}</h4>
          {update ? (
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
          ) : (
            <h4>{film.genreId}</h4>
          )}
        </li>
        <li className={cx('film-info')}>
          {update ? (
            <input
              spellCheck={false}
              value={film.name}
              onChange={(e) =>
                setFilm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nhập dữ liệu"
            />
          ) : (
            <h4>{film.name}</h4>
          )}
        </li>
        <li className={cx('film-info')}>
          {update ? (
            <input
              spellCheck={false}
              value={film.cost}
              onChange={(e) =>
                setFilm((prev) => ({ ...prev, cost: e.target.value }))
              }
              placeholder="Nhập dữ liệu"
            />
          ) : (
            <h4>{film.cost}</h4>
          )}
        </li>
        <li className={cx('film-info')}>
          {update ? (
            <input
              spellCheck={false}
              value={film.image}
              onChange={(e) =>
                setFilm((prev) => ({ ...prev, image: e.target.value }))
              }
              placeholder="Nhập dữ liệu"
            />
          ) : (
            <h4>{film.image}</h4>
          )}
        </li>
        <li className={cx('film-info')}>
          <h5 className={cx('film-status')}>{item.status}</h5>
          <div className={cx('film-action')}>
            <FontAwesomeIcon
              className={cx('action-icon')}
              icon={faPenToSquare}
              onClick={handleUpdate}
            />
            <FontAwesomeIcon
              className={cx('action-icon')}
              icon={faTrash}
              onClick={handleDelete}
            />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default FilmItem;
