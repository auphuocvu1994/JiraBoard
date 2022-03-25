import './App.css';
// import Header from './component/Header/Header.jsx';
// import Main from './component/Main/Main.jsx';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from './views/Home/Home';


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('auth')

  if (token) {
    return <Navigate to={'/'} />
  }

  return children
}

const routerConfig = [{
  label: 'Home',
  component: <Home />,
  // component:
  // <PrivateRoute>
  //   <Login />
  // </PrivateRoute>,
  path: "/Home"
},
{
  label: 'Login',
  component: <Login />,
  path: "/login"
},
{
  label: 'Register',
  component:
    <Register />
  ,
  path: "/register"
}
]


function App() {
  return (
    <div className="App">
      <div className='wrapper'>
        <Login></Login>
      </div>

      <Routes>
        {
          routerConfig.map((item) => {
            return (
              <Route key={item.path} path={item.path} element={item.component} />
            )
          })
        }
      </Routes>


    </div>
  );
}

export default App;
