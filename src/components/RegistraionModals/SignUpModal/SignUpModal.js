/** @format */

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';

import styles from './SignUpModal.module.scss';
import * as RegistryApi from '~/services/Account/registry';
const cx = classNames.bind(styles);

function SignUpModal({ hideModal, showLogin, handleLogin }) {
  const { Formik } = formik;

  const schema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    address: yup.string().required(),
    phoneNumber: yup.string().required(),
  });
  const handleSubmit = async (values) => {
    const response = await RegistryApi.Registry(values);
    if (response.status === 202) {
      alert('Đăng kí thành công');
      hideModal();
    } else {
      alert(response.message);
    }
  };
  return (
    <div className={cx('wrapper')}>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => handleSubmit(values)}
        initialValues={{
          email: '',
          fullName: '',
          password: '',
          address: '',
          phoneNumber: '',
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="validationFormikUsername">
              <Form.Label className={cx('label')}>Tên đầy đủ</Form.Label>
              <Form.Control
                className={cx('input')}
                type="text"
                spellCheck={false}
                placeholder="Nhập tên đầy đủ"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                isInvalid={!!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormik01">
              <Form.Label className={cx('label')}>Email đăng nhập</Form.Label>
              <Form.Control
                className={cx('input')}
                type="email"
                name="email"
                placeholder="Nhập email đăng nhập"
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationFormik02">
              <Form.Label className={cx('label')}>Mật khẩu</Form.Label>
              <Form.Control
                className={cx('input')}
                type="password"
                name="password"
                placeholder="Mật khẩu tối thiểu 6 kí tự"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback>Hợp lệ</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationFormik03">
              <Form.Label className={cx('label')}>Địa chỉ</Form.Label>
              <Form.Control
                className={cx('input')}
                type="text"
                placeholder="Địa chỉ"
                name="address"
                spellCheck={false}
                value={values.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />

              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormik04">
              <Form.Label className={cx('label')}>Số điện thoại</Form.Label>
              <Form.Control
                className={cx('input')}
                type="text"
                placeholder="Số điện thoại liên hệ"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Button className={cx('submit-btn')} type="submit">
              Đắng kí ngay
            </Button>
          </Form>
        )}
      </Formik>
      <button className={cx('route-btn')} onClick={showLogin}>
        Đi đến trang đăng nhập
      </button>
    </div>
  );
}

export default SignUpModal;
