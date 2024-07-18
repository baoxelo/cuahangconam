/** @format */

import classNames from 'classnames/bind';
import styles from './FilmItem.module.scss';

const cx = classNames.bind(styles);

function FilmItem({ data }) {
  return (
    <div className={cx('wrapper')}>
      <img
        src={data.image}
        alt="filmimage"
        className={cx('film-image')}
      />
      <div className={cx('film-info')}>
        <h4 className={cx('film-name')}>{data.name}</h4>
        <span className={cx('film-cost')}>Giá: {data.cost} </span>
      </div>
    </div>
  );
}

export default FilmItem;
