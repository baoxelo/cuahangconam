/** @format */

import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import * as UpdateCategoryApi from '~/services/Category/updateCategory';

const cx = classNames.bind(styles);

function CategoryItem({ data }) {
  const [update, setUpdate] = useState(false);
  const [category, setCategory] = useState(data);

  const handleUpdate = async () => {
    if (update) {
      const data = { name: category.name };
      const response = await UpdateCategoryApi.updateCategory(
        category.id,
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
      <ul className={cx('category-list')}>
        <li className={cx('category-item')}>
          <h4>{category.id}</h4>
        </li>
        <li className={cx('category-item')}>
          {update ? (
            <input
              value={category.name}
              onChange={(e) =>
                setCategory((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h4>{category.name}</h4>
          )}
        </li>
        <li className={cx('category-item')}>
          <div className={cx('category-action')}>
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

export default CategoryItem;
