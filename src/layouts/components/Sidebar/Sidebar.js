/** @format */
import { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import * as sideBarApi from '~/services/sidebar';
const cx = classNames.bind(styles);

function Sidebar({ className }) {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    renderCategory();
  }, []);
  const renderCategory = async () => {
    setCategory(await sideBarApi.Sidebar());
  };
  return (
    <div className={cx('wrapper', { [className]: className })}>
      <div className={cx('header')}>
        <h1>Danh mục</h1>
      </div>
      <ul className={cx('category-list')}>
        {category.map((item, index) => (
          <li className={cx('category-item')} key={index}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
