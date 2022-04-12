import React, { useState, useEffect, Fragment } from "react";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Button, Modal } from 'react-bootstrap';
import axios from "axios"; //Sử dụng axios
import { createTask, removeTask, editTask, getTask } from "../../service/ToDo";

const apiUrl = "https://todo-nodemy.herokuapp.com";
// const token = localStorage.getItem('auth')



function ListItem(props) {
    const handleShow = () => setShow(true);
    const { id, obj, name, onEdit, onDelete } = props;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [txtContent, setTxtContent] = useState();

    const handleSave = (id, text) => {
        setShow(false);
        onEdit(id, text);
    };

    const handleChange = (e) => {
        setTxtContent(e)
    }

    return (
        <Fragment>
            <li onClick={handleShow}>
                <span>{name}</span>
                <a className="task-block-action-edit" onClick={(e) => onDelete(obj, e)}>
                    <FontAwesomeIcon icon={faXmark} />
                </a>
            </li>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><textarea className="task-block-title" defaultValue={name} onChange={e => handleChange(e.target.value)}></textarea></Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleSave(id, txtContent)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}


export default function TaskBlock(props) {

    const [isClickAddd, setIsClickAddd] = useState(false)
    const [listTask, setListTask] = useState([]);
    const [token] = useState(() => localStorage.getItem('auth'));

    //Add
    const [keyAdd, setKeyAdd] = useState("");
    const handeAdd = () => {
        setIsClickAddd(true)
    }
    const handeCancel = () => {
        setIsClickAddd(false)
    }

    const handleChange = (e) => {
        setKeyAdd(e)
    }


    const HandleSave = async (e) => {
        e.preventDefault()

        const newTask = await createTask({
            title: keyAdd,
            status: "todo"
        })
        setListTask([...listTask, newTask]);
    }

    //Delete
    const handleDelete = async (idItem, event) => {
        event.stopPropagation()
        var arrayCopy = [...listTask];

        var index = arrayCopy.indexOf(idItem)

        if (index !== -1) {
            arrayCopy.splice(index, 1);
        }

        await removeTask({
            id: idItem._id
        })

        setListTask(arrayCopy);

    }

    //Edit
    const handleEdit = async (idItem, content) => {
        const newArr = listTask.map(obj => {
            if (obj._id === idItem) {
                return { ...obj, title: content };
            }

            return obj;
        });

        if (!!content) {
            await editTask({
                id: idItem,
                title: content,
                status: "todo"
            })
            setListTask(newArr);
            
        }
    }

    //Get data from API
    useEffect(() => {
        // await getTask({
        //     id: idItem,
        //     title: content,
        //     status: "todo"
        // })
        // setListTask(newArr);



        axios.get(`${apiUrl}/tasks`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                setListTask(res.data);
            }
            )
            .catch((error) => {
                console.log(error)
            });
    }, [])


    return (
        <div className="task-block">
            <div className="task-block-top mb-20">
                <textarea className="task-block-title" defaultValue="To Do"></textarea>
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
                    {
                        listTask.map((item, index) => {
                            return (
                                <ListItem
                                    key={item._id}
                                    id={item._id}
                                    data={listTask}
                                    obj={item}
                                    name={item.title}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete} />
                            )
                        })
                    }
                </ul>
            </div>

            <div className="task-block-action">

                {isClickAddd &&
                    <div className="task-block-content">
                        <textarea className="task-block-title" onChange={e => handleChange(e.target.value)} placeholder="Write content in here..."></textarea>
                        <div className="group-btn">
                            <button className="task-block-action-add" onClick={HandleSave}>
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Save</span>
                            </button>
                            <button className="task-block-action-add" onClick={handeCancel}>
                                <FontAwesomeIcon icon={faXmark} />
                                <span>Cancel</span>
                            </button>
                        </div>

                    </div>
                }

                {!isClickAddd &&
                    <button className="task-block-action-add" onClick={handeAdd}>

                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add a card</span>
                    </button>}
            </div>
        </div >
    );
}