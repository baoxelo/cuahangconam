/** @format */

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as formik from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUpModal() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    repassword: yup.string().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        email: 'Example@ex.com',
        username: '',
        password: '',
        repassword: '',
        address: '',
        phone: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="validationFormikUsername">
            <Form.Label>Tên đầy đủ</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} controlId="validationFormik01">
            <Form.Label>Email đăng nhập</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              isValid={touched.email && !errors.email}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="validationFormik01">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isValid={touched.password && !errors.password}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationFormik01">
            <Form.Label>Nhập lại mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="repassword"
              value={values.repassword}
              onChange={handleChange}
              isValid={touched.repassword && !errors.repassword}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="validationFormik03">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Địa chỉ"
              name="address"
              value={values.address}
              onChange={handleChange}
              isInvalid={!!errors.address}
            />

            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationFormik04">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              placeholder="Số điện thoại liên hệ"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignUpModal;
