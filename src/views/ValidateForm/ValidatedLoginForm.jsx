// import React from "react";
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as EmailValidator from "email-validator";
// import * as Yup from "yup";
// import './style.css';
// import axios from "axios"; //Sử dụng axios
// import { useNavigate } from "react-router";

// const apiUrl = "https://todo-nodemy.herokuapp.com/user";


// function ValidatedLoginForm() {

//   const navigate = useNavigate();

//   return (
//     <Formik
//       initialValues={{
//         username: "",
//         password: ""
//       }}

//       onSubmit={(input) => {
//         console.log(input);
//         axios.post(`${apiUrl}/login`, input)
//           .then(response => {
//             const token = response.data.token;

//             console.log(token);

//             localStorage.setItem('auth', token);

//             navigate('/Home')
//           }
//           )
//           .catch((err) => console.log(err));
//       }
//       }

//       //Su dung Yup the thong bao loi
//       validationSchema={
//         Yup.object().shape({
//           username: Yup.string()
//             // .email()
//             .required("Không được để trống"),
//           password: Yup.string()
//             .required("Chưa nhập mật khẩu.")
//             // .min(8, "Mật khẩu quá ngắn - ít nhất phải 8 ký tự.")
//             .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa nhất một số.")
//         })
//       }
//     >
//       {
//         (props) => {

//           //Dung destructing de lay cac prop tu prop
//           const {
//             values,
//             touched,
//             errors,
//             isSubmitting,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             onValueChange
//           } = props;


//           return (
//             <div className="form-register">
//               <form onSubmit={handleSubmit}>
//                 <h1>Login</h1>
//                 <div className="form-block">
//                   <Field
//                     className="form-block__input"
//                     name="username"
//                     type="text"
//                     value={values.username}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   // className={errors.email && touched.email && "error"}
//                   />
//                   <label className="form-block__input--title" >Username</label>
//                   <label className="form-block__input--border"></label>
//                   <small className="lblError"></small>
//                   {errors.username && touched.username && (
//                     <div className="input-feedback">{errors.username}</div>
//                   )}

//                 </div>
//                 <div className="form-block">
//                   <Field
//                     className="form-block__input"
//                     name="password"
//                     type="password"
//                     value={values.password}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   // className={errors.password && touched.password && "error"}
//                   />
//                   <label className="form-block__input--title" >Password</label>
//                   <label className="form-block__input--border"></label>
//                   <small className="lblError"></small>
//                   {errors.password && touched.password && (
//                     <div className="input-feedback">{errors.password}</div>
//                   )}

//                 </div>
//                 <button className="btn-login" type="submit" disabled={isSubmitting}>Login</button>

//                 <div className="more-action">
//                   <span>Not a member?</span>
//                   <a href="/register">Signup</a>
//                 </div>
//               </form>
//             </div>

//           );
//         }}
//     </Formik >
//   );

// }

// export default ValidatedLoginForm;
