import React from "react";
import { Formik, Field } from 'formik';
// import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import './style.css';
import axios from "axios"; //Sử dụng axios
import { useNavigate } from "react-router";
import { Spinner } from 'react-bootstrap';


const apiUrl = "https://todo-nodemy.herokuapp.com/user";

function Register() {

    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
                email: "",
                confirmpass: ""
            }}

            onSubmit={(input) => {
                console.log(input);
                axios.post(`${apiUrl}/register`, input)
                    .then(response => {
                        const token = response.data.token;

                        console.log(token);

                        localStorage.setItem('auth', token);

                        setTimeout(function () {
                            alert("Đăng kí thành công!");
                        }, 2000);//wait 2 seconds

                        navigate('/')
                    }
                    )
                    .catch((err) => console.log(err));
            }
            }

            //Su dung Yup the thong bao loi
            validationSchema={
                Yup.object().shape({
                    username: Yup.string()
                        // .email()
                        .min(4, "Username quá ngắn ít nhất phải 4 ký tự.")
                        .required("Không được để trống"),
                    email: Yup.string()
                        .email("Email không đúng định dạng")
                        .min(4, "Username quá ngắn ít nhất phải 4 ký tự.")
                        .required("Không được để trống"),
                    password: Yup.string()
                        .required("Chưa nhập mật khẩu.")
                        .min(8, "Mật khẩu quá ngắn - ít nhất phải 8 ký tự.")
                        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa nhất một số."),
                    confirmpass: Yup.string()
                        .required("Chưa nhập mật khẩu.")
                        .min(8, "Mật khẩu quá ngắn - ít nhất phải 8 ký tự.")
                        .oneOf(
                            [Yup.ref("password")],
                            "Mật khẩu không trùng nhau"
                        )
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
                        isSubmitting,
                        // isStatus,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        // onValueChange
                    } = props;


                    return (
                        <div className="form-register">
                            <form onSubmit={handleSubmit}>
                                <h1>Register</h1>
                                <div className="form-block">
                                    <Field
                                        className="form-block__input"
                                        name="username"
                                        type="text"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    // className={errors.email && touched.email && "error"}
                                    />
                                    <label className="form-block__input--title" >Username</label>
                                    <label className="form-block__input--border"></label>
                                    <small className="lblError"></small>
                                    {errors.username && touched.username && (
                                        <div className="input-feedback">{errors.username}</div>
                                    )}

                                </div>
                                <div className="form-block">
                                    <Field
                                        className="form-block__input"
                                        name="email"
                                        type="text"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    // className={errors.email && touched.email && "error"}
                                    />
                                    <label className="form-block__input--title" >Email</label>
                                    <label className="form-block__input--border"></label>
                                    <small className="lblError"></small>
                                    {errors.email && touched.email && (
                                        <div className="input-feedback">{errors.email}</div>
                                    )}

                                </div>
                                <div className="form-block">
                                    <Field
                                        className="form-block__input"
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    // className={errors.password && touched.password && "error"}
                                    />
                                    <label className="form-block__input--title" >Password</label>
                                    <label className="form-block__input--border"></label>
                                    <small className="lblError"></small>
                                    {errors.password && touched.password && (
                                        <div className="input-feedback">{errors.password}</div>
                                    )}

                                </div>
                                <div className="form-block">
                                    <Field
                                        className="form-block__input"
                                        name="confirmpass"
                                        type="password"
                                        value={values.confirmpass}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    // className={errors.password && touched.password && "error"}
                                    />
                                    <label className="form-block__input--title" >Confirm Password</label>
                                    <label className="form-block__input--border"></label>
                                    <small className="lblError"></small>
                                    {errors.confirmpass && touched.confirmpass && (
                                        <div className="input-feedback">{errors.confirmpass}</div>
                                    )}

                                </div>
                                <button className="btn-login" type="submit" disabled={isSubmitting}>
                                    <span>Register</span>
                                    {isSubmitting && <Spinner animation="border" role="status">
                                    </Spinner>}
                                </button>

                                <div className="more-action">
                                    <span>If you a member</span>
                                    <a href="/">Login</a>
                                </div>
                            </form>
                        </div>

                    );
                }}
        </Formik >
    );
}

export default Register;