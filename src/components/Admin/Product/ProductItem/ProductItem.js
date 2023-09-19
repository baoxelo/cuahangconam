/** @format */

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from './ProductItem.module.scss';
import * as UpdateProductApi from '~/services/Products/updateProduct';
import * as DeleteProductApi from '~/services/Products/deleteProduct';
import * as GetCategoryApi from '~/services/Category/getCategory';

const cx = classNames.bind(styles);

function ProductItem({ item, fetchProduct }) {
  const [update, setUpdate] = useState(false);
  const [product, setProduct] = useState(item);
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    setCategory(await GetCategoryApi.Category());
  };

  const handleUpdate = async () => {
    if (update) {
      const response = await UpdateProductApi.UpdateProduct(
        product.id,
        product
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
      const response = await DeleteProductApi.DeleteProduct(product.id);
      if (response.status === 204) {
        setUpdate(false);
      }
      alert(response.message);
      fetchProduct();
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div>
      <ul className={cx('product-item')}>
        <li className={cx('product-info')}>
          <h4>{product.id}</h4>
          {update ? (
            <select
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  categoryId: e.target.value,
                }))
              }
            >
              {category.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          ) : (
            <h4>{product.categoryId}</h4>
          )}
        </li>
        <li className={cx('product-info')}>
          {update ? (
            <input
              spellCheck={false}
              value={product.name}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nhập dữ liệu"
            />
          ) : (
            <h4>{product.name}</h4>
          )}
        </li>
        <li className={cx('product-info')}>
          {update ? (
            <input
              spellCheck={false}
              value={product.cost}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, cost: e.target.value }))
              }
              placeholder="Nhập dữ liệu"
            />
          ) : (
            <h4>{product.cost}</h4>
          )}
        </li>
        <li className={cx('product-info')}>
          {update ? (
            <input
              spellCheck={false}
              value={product.image}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, image: e.target.value }))
              }
              placeholder="Nhập dữ liệu"
            />
          ) : (
            <h4>{product.image}</h4>
          )}
        </li>
        <li className={cx('product-info')}>
          <h5 className={cx('product-status')}>{item.status}</h5>
          <div className={cx('product-action')}>
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

export default ProductItem;
