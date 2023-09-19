/** @format */
import { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import * as sideBarApi from '~/services/Category/getCategory';
const cx = classNames.bind(styles);

function Sidebar({ className, handleSidebar }) {
  const [category, setCategory] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    renderCategory();
  }, []);

  const renderCategory = async () => {
    var response = await sideBarApi.Category();
    setCategory(response.data);
  };
  return (
    <div className={cx('wrapper', { [className]: className })}>
      <div className={cx('header')}>
        <h1>Danh mục</h1>
      </div>
      <ul className={cx('category-list')}>
        <li
          className={cx('category-item', { active: active === 0 })}
          onClick={() => {
            setActive(0);
            handleSidebar(0);
          }}
        >
          <h4>Tất cả sản phẩm</h4>
        </li>
        {category.map((item, index) => (
          <li
            className={cx('category-item', { active: active === item.id })}
            key={index}
            onClick={() => {
              setActive(item.id);
              handleSidebar(item.id);
            }}
          >
            <h4>{item.name}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
