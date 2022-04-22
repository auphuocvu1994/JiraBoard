import React, { useState } from "react";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faCircleInfo, faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
//Lấy ra state và dispatch từ store
import { useStore } from "../../store";

export default function Header(props) {
    const navigate = useNavigate();
    const [txtContent, setTxtContent] = useState();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }

    const handleChange = (e) => {
        setTxtContent(e, () => {

        })
    }

    return (
        <header className="header">
            <div className="header__left">
                <div className="header__left__logo">
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className="header__left__title ml-15">
                    <span>Jira board</span>
                </div>
            </div>
            <div className="header-right">
                <div className="search-box">
                    <Form.Group controlId="formSearchBox" className="search-box-content">
                        <span className="search-box-ic">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                        <Form.Control onChange={e => handleChange(e.target.value)} type="text" placeholder="Search" />
                    </Form.Group>
                </div>

                <span className="btn-ic ml-15">
                    <FontAwesomeIcon icon={faCircleInfo} />
                </span>
                <span className="btn-ic ml-15">
                    <FontAwesomeIcon icon={faBell} />
                </span>

                <div className="user-infor ml-15">
                    <span>VP</span>
                </div>

                <span className="btn-ic ml-15">
                    <FontAwesomeIcon onClick={handleLogout} icon={faRightFromBracket} />
                </span>

            </div>
        </header>
    );
}