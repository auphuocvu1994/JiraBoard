import React from "react";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faCircleInfo, faBell } from '@fortawesome/free-solid-svg-icons';
import { Form } from "react-bootstrap";

export default function Header(props) {
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
                        <Form.Control type="text" placeholder="Search" />
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
            </div>
        </header>
    );
}