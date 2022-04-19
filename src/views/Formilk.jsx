// import "./App.css";
// import { Formik } from "formik";
// function App() {
//   return (
//     <div className="App">
//       {" "}
//       <div className="form">
//         {" "}
//         <Formik
//           initialValues={{ name: "" }}
//           onSubmit={(values, { setSubmitting }) => {
//             setTimeout(() => {
//               alert(JSON.stringify(values, null, 2));
//               setSubmitting(false);
//             }, 400);
//           }}
//         >
//           {" "}
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             isSubmitting,
//           }) => {
//             console.log({ values, errors, touched, isSubmitting });
//             return (
//               <form onSubmit={handleSubmit}>
//                 {" "}
//                 <label htmlFor="name">Name</label>{" "}
//                 <input
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   name="name"
//                   id="name"
//                 />{" "}
//                 <br /> <label htmlFor="address">Address</label>{" "}
//                 <input
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   name="address"
//                   id="address"
//                 />{" "}
//                 <br />{" "}
//                 <button type="submit" disabled={isSubmitting}>
//                   {" "}
//                   Submit{" "}
//                 </button>{" "}
//               </form>
//             );
//           }}{" "}
//         </Formik>{" "}
//       </div>{" "}
//     </div>
//   );
// }
// export default App;
