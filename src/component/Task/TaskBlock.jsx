import React,{ useState, useEffect } from "react";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlus, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import * as Yup from "yup";
import axios from "axios"; //Sử dụng axios


const apiUrl = "https://todo-nodemy.herokuapp.com/tasks";

export default function TaskBlock(props) {

    const [isClickAddd, setIsClickAddd] = React.useState(false)
    const [listTask, setListTask] = useState([]);

    const handeAdd = () => {
        setIsClickAddd(true)
    }
    const handeCancel = () => {
        setIsClickAddd(false)
    }

    useEffect(() => {
        axios.post(`${apiUrl}/login`, input)
          .then(response => {
            const token = response.data.token;

            console.log(token);

            localStorage.setItem('auth', token);

            navigate('/Home')
          }
          )
          .catch((err) => console.log(err));

    }, [listTask])


    return (
        <main className="task-block">
            <div className="task-block-top mb-20">
                <textarea class="task-block-title">To Do</textarea>
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

                {isClickAddd ?
                    <div className="task-block-content">
                        <textarea className="task-block-title" placeholder="Write content in here..."></textarea>
                        <div className="group-btn">
                            <button className="task-block-action-add" onClick={handeAdd}>
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Save</span>
                            </button>
                            <button className="task-block-action-add" onClick={handeCancel}>
                                <FontAwesomeIcon icon={faXmark} />
                                <span>Cancel</span>
                            </button>
                        </div>

                    </div>
                    : null}

                {!isClickAddd ?
                    <button className="task-block-action-add" onClick={handeAdd}>

                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add a card</span>
                    </button> : null}
            </div>
        </main>
    );
}