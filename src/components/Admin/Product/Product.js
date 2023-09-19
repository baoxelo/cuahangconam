/** @format */

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Product.module.scss';
import ProductItem from './ProductItem';
import * as GetAllProductApi from '~/services/Products/product';
import * as CreateProductApi from '~/services/Products/createProduct';
import * as GetCategoryApi from '~/services/Category/getCategory';
const cx = classNames.bind(styles);

function AdminProduct() {
  const [listProduct, setListProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: 'descript sản phẩm',
    image: '',
    cost: 0,
    quantity: 100,
    categoryId: 1,
  });

  const createProduct = async () => {
    const respone = await CreateProductApi.CreateProduct(product);
    if (respone.status === 201) {
      setProduct({
        name: '',
        description: 'descript sản phẩm',
        image: '',
        cost: 0,
        quantity: 100,
        categoryId: 1,
      });
    }
    alert(respone.message);
    fetchProduct();
  };

  const fetchCategory = async () => {
    var response = await GetCategoryApi.Category();
    console.log(response.data);
    setCategory(response.data);
  };
  const fetchProduct = async () => {
    setListProduct(await GetAllProductApi.Product());
  };

  useEffect(() => {
    fetchProduct();
    fetchCategory();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('header')}>
          <h3 className={cx('title')}>
            <span>ID</span> <span>Cat ID</span>
          </h3>
          <h3 className={cx('title')}>Tên sản phẩm</h3>
          <h3 className={cx('title')}>Giá sản phẩm</h3>
          <h3 className={cx('title')}>Ảnh</h3>
          <h3 className={cx('title')}>Chỉnh sửa</h3>
        </div>
        <div className={cx('product-list')}>
          <ul className={cx('product-item')}>
            <li className={cx('product-info')}>
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
            </li>
            <li className={cx('product-info')}>
              <input
                spellCheck={false}
                value={product.name}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Nhập dữ liệu"
              />
            </li>
            <li className={cx('product-info')}>
              <input
                spellCheck={false}
                value={product.cost}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, cost: e.target.value }))
                }
                placeholder="Nhập dữ liệu"
              />
            </li>
            <li className={cx('product-info')}>
              <input
                spellCheck={false}
                value={product.image}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, image: e.target.value }))
                }
                placeholder="Nhập dữ liệu"
              />
            </li>
            <li className={cx('product-info')}>
              <span className={cx('product-create')} onClick={createProduct}>
                Thêm <FontAwesomeIcon icon={faCloudArrowUp} />
              </span>
            </li>
          </ul>
          {listProduct.map((item, index) => (
            <ProductItem key={index} item={item} fetchProduct={fetchProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
