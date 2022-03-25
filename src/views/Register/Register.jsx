import React from "react";
import './style.css';

export default function Register(props) {
    return (
        <div className="form-register">
            <form action="">
                <h1>Register</h1>
                <div className="form-block">
                    <input id="txtUserName" type="text" className="form-block__input" />
                    <label className="form-block__input--title" for="">Username</label>
                    <label className="form-block__input--border"></label>
                    <small className="lblError"></small>
                </div>
                <div className="form-block">
                    <input id="txtEmail" type="text" className="form-block__input" />
                    <label className="form-block__input--title" for="">Email</label>
                    <label className="form-block__input--border"></label>
                    <small className="lblError"></small>
                </div>
                <div className="form-block">
                    <input id="txtPass" type="password" className="form-block__input" />
                    <label className="form-block__input--title" for="">Password</label>
                    <label className="form-block__input--border"></label>
                    <small className="lblError"></small>
                </div>
                <div className="form-block">
                    <input id="txtConfirmPass" type="password" className="form-block__input" />
                    <label className="form-block__input--title" for="">Confirm Password</label>
                    <label className="form-block__input--border"></label>
                    <small className="lblError"></small>
                </div>

                <button className="btn-login">Register</button>

                <div className="more-action">
                    <span>Not a member?</span>
                    <a href="/#">Signin</a>
                </div>
            </form>
        </div>
    );
}