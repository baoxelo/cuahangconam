/** @format */
import { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import * as sideBarApi from '~/services/Genre/getGenre';
const cx = classNames.bind(styles);

function Sidebar({ className, handleSidebar }) {
  const [genre, setGenre] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    renderGenre();
  }, []);

  const renderGenre = async () => {
    var response = await sideBarApi.Genre();
    if(response !== undefined && response !== null) {
      setGenre(response);
    }
  };
  return (
    <div className={cx('wrapper', { [className]: className })}>
      <div className={cx('header')}>
        <h1>Danh mục</h1>
      </div>
      <ul className={cx('genre-list')}>
        <li
          className={cx('genre-item', { active: active === 0 })}
          onClick={() => {
            setActive(0);
            handleSidebar(0);
          }}
        >
          <h4>Tất cả sản phẩm</h4>
        </li>
        {genre.map((item, index) => {
          if(item != null) 
            (
              <li
                className={cx('genre-item', { active: active === item.id })}
                key={index}
                onClick={() => {
                  setActive(item.id);
                  handleSidebar(item.id);
                }}
              >
                <h4>{item.name}</h4>
              </li>
            )
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
