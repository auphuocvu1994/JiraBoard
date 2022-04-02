import './App.css';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './views/Home/Home';



const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('auth')

  if (!token) {
    return <Navigate to={'/'} />
  }

  return children
}

const routerConfig = [
  {
    label: 'Login',
    component:
      <Login />,
    path: "/"
  },
  {
    label: 'Home',
    component:
      // component:
      < PrivateRoute >
        <Home />
      </PrivateRoute >,
    path: "/Home"
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


    </div>
  );
}

export default App;
