/** @format */

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Category.module.scss';
import * as GetCategoryApi from '~/services/Category/getCategory';
import * as CreateCategoryApi from '~/services/Category/createCategory';
import CategoryItem from './CategoryItem';

const cx = classNames.bind(styles);

function AdminCategory() {
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '' });
  const createCategory = async () => {
    const respone = await CreateCategoryApi.createCategory({
      name: newCategory.name,
    });
    if (respone.status === 202) {
      setNewCategory((prev) => ({
        ...prev,
        name: '',
      }));
    }
    if (respone.data.message) {
      alert(respone.data.message);
    }
    fetchCategory();
  };

  const fetchCategory = async () => {
    var response = await GetCategoryApi.Category();
    setCategory(response.data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <h3 className={cx('title')}>Id</h3>
        <h3 className={cx('title')}>Tên danh mục</h3>
        <h3 className={cx('title')}>Chỉnh sửa</h3>
      </header>
      <ul className={cx('new-category')}>
        <li className={cx('new-category-info')}>
          <h3>{category.length + 1}</h3>
        </li>
        <li className={cx('new-category-info')}>
          <input
            spellCheck={false}
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Nhập dữ liệu"
          />
        </li>
        <li className={cx('new-category-info')}>
          <span className={cx('new-category-create')} onClick={createCategory}>
            Thêm <FontAwesomeIcon icon={faCloudArrowUp} />
          </span>
        </li>
      </ul>
      {category.map((item, index) => (
        <CategoryItem key={index} data={item} />
      ))}
    </div>
  );
}

export default AdminCategory;
