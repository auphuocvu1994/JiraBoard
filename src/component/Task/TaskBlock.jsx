import React, { useState, useEffect, Fragment } from "react";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Button, Modal } from 'react-bootstrap';
import axios from "axios"; //Sử dụng axios
import { createTask, removeTask, editTask, getTask } from "../../service/ToDo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';


const apiUrl = "https://todo-nodemy.herokuapp.com";
// const token = localStorage.getItem('auth')


//list item 
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


const baseData = {
    todo: {
        name: "To do",
        items: [],
        isShow: false,
        title: "todo"
    },
    inprogress: {
        name: "In Progress",
        items: [],
        isShow: false,
        title: "inprogress"
    },
    done: {
        name: "Done",
        items: [],
        isShow: false,
        title: "done"
    }
};

export default function TaskBlock(props) {
    const [token] = useState(() => localStorage.getItem('auth'));
    const [isClickAddd, setIsClickAddd] = useState(false)
    const [listTodo, setListTodo] = useState([]);
    const [listDone, setListDone] = useState([]);
    const [listInpro, setListInpro] = useState([]);
    const [objData, setObjData] = useState(baseData);
    const [columns, setColumns] = useState(objData);

    //Add
    const [keyAdd, setKeyAdd] = useState("");
    const handeAdd = (column) => {
        const newObj = { ...objData }
        Object.values(newObj).forEach((val) => {
            if (column.title === val.title) {
                newObj[val.title].isShow = true
            } else {
                newObj[val.title].isShow = false
            }

        })

        setObjData((column) => {
            return newObj
        })
    }

    console.log("re")
    const handeCancel = (column) => {
        const newObj = { ...objData }
        Object.values(newObj).forEach((val) => {
            if (column.title === val.title && column.isShow === false) {
                newObj[val.title].isShow = true
            } else {
                newObj[val.title].isShow = false
            }

        })

        setObjData((column) => {
            return newObj
        })
    }

    const handleChange = (e) => {
        setKeyAdd(e)
    }

    //Get data from API
    useEffect(async () => {
        const lstToDo = await getTask({
            status: "todo"
        })

        objData[Object.keys(objData)[0]].items = lstToDo;

        setListTodo(() => {
            return listTodo
        })

        // setColumns(objData)
    }, [])

    // Get data from API
    useEffect(async () => {
        const lstToDo = await getTask({
            status: "done"
        })

        objData[Object.keys(objData)[2]].items = lstToDo;

        setListTodo(() => {
            return listDone
        })

        // setColumns(objData)
    }, [])

    // //Get data from API
    useEffect(async () => {
        const lstToDo = await getTask({
            status: "in_progress"
        })

        objData[Object.keys(objData)[1]].items = lstToDo;

        setListTodo(() => {
            return listInpro
        })

        // setColumns(objData)
    }, [])


    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };

    const HandleSave = async (e) => {
        e.preventDefault()
        console.log("save")
        // const newTask = await createTask({
        //     title: keyAdd,
        //     status: "todo"
        // })
        // setListTodo([...listTodo, newTask]);
    }

    //Delete
    const handleDelete = async (idItem, event) => {
        event.stopPropagation()

        console.log(idItem)
        var arrayCopy = [...listTodo];

        var index = arrayCopy.indexOf(idItem)

        if (index !== -1) {
            arrayCopy.splice(index, 1);
        }

        await removeTask({
            id: idItem._id
        })

        baseData[Object.keys(baseData)[0]].items = arrayCopy;

        setListTodo(arrayCopy);

    }

    //Edit
    const handleEdit = async (idItem, content) => {
        const newArr = listTodo.map(obj => {
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
            setListTodo(newArr);

        }
    }

    // console.log(baseData)



    console.log(objData)

    // return (
    //     <div className="task-block">
    //         <div className="task-block-top mb-20">
    //             <textarea className="task-block-title" defaultValue="To Do"></textarea>
    //             <Dropdown className="dd-button">
    //                 <Dropdown.Toggle id="dropdown-basic" className="dropdown-toggle-custom" >
    //                     <FontAwesomeIcon icon={faEllipsis} />
    //                 </Dropdown.Toggle>

    //                 <Dropdown.Menu>
    //                     <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //                     <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //                     <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    //                 </Dropdown.Menu>
    //             </Dropdown>
    //         </div>
    //         <div className="task-block-main mb-20">
    //             <ul>
    //                 {
    //                     listTodo.map((item, index) => {
    //                         return (
    //                             <ListItem
    //                                 key={item._id}
    //                                 id={item._id}
    //                                 data={listTodo}
    //                                 obj={item}
    //                                 name={item.title}
    //                                 onEdit={handleEdit}
    //                                 onDelete={handleDelete} />
    //                         )
    //                     })
    //                 }
    //             </ul>
    //         </div>

    //         <div className="task-block-action">

    //             {isClickAddd &&
    //                 <div className="task-block-content">
    //                     <textarea className="task-block-title" onChange={e => handleChange(e.target.value)} placeholder="Write content in here..."></textarea>
    //                     <div className="group-btn">
    //                         <button className="task-block-action-add" onClick={HandleSave}>
    //                             <FontAwesomeIcon icon={faPlus} />
    //                             <span>Save</span>
    //                         </button>
    //                         <button className="task-block-action-add" onClick={handeCancel}>
    //                             <FontAwesomeIcon icon={faXmark} />
    //                             <span>Cancel</span>
    //                         </button>
    //                     </div>

    //                 </div>
    //             }

    //             {!isClickAddd &&
    //                 <button className="task-block-action-add" onClick={handeAdd}>

    //                     <FontAwesomeIcon icon={faPlus} />
    //                     <span>Add a card</span>
    //                 </button>}
    //         </div>
    //     </div >
    // );



    return (

        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>

            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div className="task-block" key={index}>
                            <div className="task-block-top">
                                <textarea className="task-block-title" defaultValue={column.name}></textarea>
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
                            <div
                                className="task-block-main"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                                key={columnId}
                            >
                                <ul style={{ margin: 8 }}>
                                    <Droppable droppableId={columnId} key={columnId}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "lightblue"
                                                            : "lightgrey",
                                                        padding: 4,
                                                        minHeight: 500,
                                                        width: '100%',
                                                    }}

                                                    className="task-block-main"
                                                >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={index}
                                                                draggableId={item._id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        < div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: "none",
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? "#263B4A"
                                                                                    : "#456C86",
                                                                                ...provided.draggableProps.style
                                                                            }}

                                                                        >
                                                                            <ListItem
                                                                                key={item._id}
                                                                                id={item._id}
                                                                                obj={item}
                                                                                name={item.title}
                                                                                onEdit={handleEdit}
                                                                                onDelete={handleDelete}
                                                                            />


                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </ul>
                            </div >
                            <div className="task-block-action">

                                {column.isShow &&
                                    <div className="task-block-content">
                                        <textarea className="task-block-title" onChange={e => handleChange(e.target.value)} placeholder="Write content in here..."></textarea>
                                        <div className="group-btn">
                                            <button className="task-block-action-add" onClick={HandleSave}>
                                                <FontAwesomeIcon icon={faPlus} />
                                                <span>Save</span>
                                            </button>
                                            <button className="task-block-action-add" onClick={() => handeCancel(column)}>
                                                <FontAwesomeIcon icon={faXmark} />
                                                <span>Cancel</span>
                                            </button>
                                        </div>

                                    </div>
                                }

                                {!column.isShow &&
                                    <button className="task-block-action-add" onClick={() => handeAdd(column)}>

                                        <FontAwesomeIcon icon={faPlus} />
                                        <span>Add a card</span>
                                    </button>}
                            </div>
                        </div>
                    );
                })}
            </DragDropContext >
        </div >
    );
}