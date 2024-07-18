/** @format */

import classNames from 'classnames/bind';
import styles from './GenreItem.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import * as UpdateGenreApi from '~/services/Genre/updateGenre';

const cx = classNames.bind(styles);

function GenreItem({ data }) {
  const [update, setUpdate] = useState(false);
  const [genre, setGenre] = useState(data);

  const handleUpdate = async () => {
    if (update) {
      const data = { name: genre.name };
      const response = await UpdateGenreApi.updateGenre(
        genre.id,
        data
      );
      if (response.status === 202) {
        setUpdate(false);
      }
      if (response.data.message) {
        alert(response.data.message);
      }
    } else {
      setUpdate(true);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <ul className={cx('genre-list')}>
        <li className={cx('genre-item')}>
          <h4>{genre.id}</h4>
        </li>
        <li className={cx('genre-item')}>
          {update ? (
            <input
              value={genre.name}
              onChange={(e) =>
                setGenre((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h4>{genre.name}</h4>
          )}
        </li>
        <li className={cx('genre-item')}>
          <div className={cx('genre-action')}>
            <FontAwesomeIcon
              className={cx('action-icon')}
              icon={faPenToSquare}
              onClick={handleUpdate}
            />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default GenreItem;
