import React, { useState } from "react";
import { Formik, Field } from 'formik';
// import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import './style.css';
import axios from "axios"; //Sử dụng axios
import { useNavigate } from "react-router";
import { Spinner } from 'react-bootstrap';
// Importing toastify module
import { toast } from 'react-toastify';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

// toast-configuration method,
// it is compulsory method.
toast.configure()



const apiUrl = "https://todo-nodemy.herokuapp.com/user";


function Login() {

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}


      onSubmit={(input) => {
        setIsSubmitting(() => {
          return true
        })

        console.log(input);

        axios.post(`${apiUrl}/login`, input)
          .then(response => {
            const token = response.data.token;
            console.log(token);
            localStorage.setItem('auth', token);
            navigate('/Home')
          }
          )
          .catch((err) => {
            console.log(err)
            setIsSubmitting(false)

            toast.error('username or password is incorrect', {
              // Set to 15sec
              position: toast.POSITION.TOP_RIGHT, autoClose: 3000
            })
          });
      }
      }

      //Su dung Yup the thong bao loi
      validationSchema={
        Yup.object().shape({
          username: Yup.string()
            // .email()
            .min(4, "Username quá ngắn ít nhất phải 4 ký tự.")
            .required("Không được để trống"),
          password: Yup.string()
            .required("Chưa nhập mật khẩu.")
            .min(8, "Mật khẩu quá ngắn - ít nhất phải 8 ký tự.")
            .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa nhất một số.")
        })
      }
    >
      {
        (props) => {

          //Dung destructing de lay cac prop tu prop
          const {
            values,
            touched,
            errors,

            handleChange,
            handleSubmit
          } = props;

          function handleBlur(value) {
            console.log(1)
            if (value.length > 0) {
              return true
            } else {
              return false
            }
          }
          return (
            <div className="form-register">
              <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="form-block">
                  <Field
                    className="form-block__input"
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    // onBlur={() => handleBlur(values.username)}
                  // className={errors.email && touched.email && "error"}
                  />
                  <label className={`form-block__input--title ${handleBlur(values.username) ? 'active' : ''}`} >Username</label>
                  <label className={`form-block__input--border`}></label>
                  <small className="lblError"></small>
                  {errors.username && touched.username && (
                    <div className="input-feedback">{errors.username}</div>
                  )}

                </div>
                <div className="form-block">
                  <Field
                    className="form-block__input"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                  // className={errors.password && touched.password && "error"}
                  />
                  <label className={`form-block__input--title ${handleBlur(values.password) ? 'active' : ''}`} >Password</label>
                  <label className="form-block__input--border"></label>
                  <small className="lblError"></small>
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}

                </div>
                <button className="btn-login" type="submit" disabled={isSubmitting}>
                  <span>Login</span>
                  {isSubmitting && <Spinner animation="border" role="status">
                  </Spinner>}
                </button>

                <div className="more-action">
                  <span>Not a member?</span>
                  <a href="/register">Signup</a>
                </div>
              </form>
            </div>

          );
        }}
    </Formik >
  );

}

export default Login;