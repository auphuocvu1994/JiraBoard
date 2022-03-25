import React, { useState } from "react";
import './style.css';
import axios from "axios"; //Sử dụng axios
import { useNavigate  } from "react-router-dom";

export default function Login(props) {

    const [userName, setUserName] = useState([]);
    const [passWord, setPass] = useState();
    let navigate = useNavigate();

    const handeLogin = (e) => {
        e.preventDefault();
        console.log(userName, passWord);

        axios.post('https://todo-nodemy.herokuapp.com/user/login', {
            username: userName,
            password: passWord

        }).then(response => {
            const token = response.data.token;

            console.log(token);

            localStorage.setItem('auth', token);

            navigate('/Home')
        }
        )
            .catch((err) => console.log(err));
    }



    return (
        <div className="form-register">
            <form action="">
                <h1>Login</h1>
                <div className="form-block">
                    <input id="txtUserName" type="text" className="form-block__input" onChange={e => setUserName(e.target.value)} name="uname" required />
                    <label className="form-block__input--title" >Username</label>
                    <label className="form-block__input--border"></label>
                    <small className="lblError"></small>
                </div>
                <div className="form-block">
                    <input id="txtPass" type="password" className="form-block__input" onChange={e => setPass(e.target.value)} name="psw" required />
                    <label className="form-block__input--title" >Password</label>
                    <label className="form-block__input--border"></label>
                    <small className="lblError"></small>
                </div>


                <button className="btn-login" onClick={handeLogin}>Login</button>

                <div className="more-action">
                    <span>Not a member?</span>
                    <a href="/register">Signup</a>
                </div>
            </form>
        </div>
    );
}