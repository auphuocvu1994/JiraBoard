import React from "react";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlus , faPen } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';

export default function TaskBlock(props) {
    return (
        <main className="task-block">
            <div className="task-block-top mb-20">
                <span className="task-block-title">To Do</span>
                <Dropdown className="dd-button">
                    <Dropdown.Toggle id="dropdown-basic" className="dropdown-toggle-custom" >
                        <FontAwesomeIcon icon={faEllipsis} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="task-block-main mb-20">
                <ul>
                    <li>
                        <span>abc</span>
                        <a href="/#" className="task-block-action-edit">
                            <FontAwesomeIcon icon={faPen} />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="task-block-action">
                <button className="task-block-action-add">
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add a card</span>
                </button>
            </div>
        </main>
    );
}