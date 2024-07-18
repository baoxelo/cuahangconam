/** @format */

import styles from './FilmList.module.scss';
import classNames from 'classnames/bind';
import Film from '~/components/Film';

const cx = classNames.bind(styles);

function FilmList({ data }) {
  if (!data || data.length === 0) {
    return null; // Render nothing if data is empty
  }
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('film-list')}>
        {data.map((item, index) => (
          <li key={index} className={cx('film-item')}>
            <Film data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilmList;
