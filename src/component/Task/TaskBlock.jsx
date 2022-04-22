import React, { useState, useEffect, Fragment } from "react";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Button, Modal } from 'react-bootstrap';
import { createTask, removeTask, editTask, getTask } from "../../service/ActionTask";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from "lodash"; // cool kids know _ is low-dash

//list item 
function ListItem(props) {
    const handleShow = () => setShow(true);
    const { id, obj, name, onEdit, onDelete, columnDetail } = props;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [txtContent, setTxtContent] = useState();

    const handleSaveEdit = (id, content, status) => {
        setShow(false);

        onEdit(id, content, status);
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
                    <Button variant="primary" onClick={(e) => handleSaveEdit(obj._id, txtContent, obj.status)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

const TODO = 'todo';
const IN_PROGRESS = 'in_progress';
const DONE = 'done';


const baseData = {
    [TODO]: {
        name: "To do",
        items: [],
        isShow: false,
        title: "todo"
    },
    [IN_PROGRESS]: {
        name: "In Progress",
        items: [],
        isShow: false,
        title: "in_progress"
    },
    [DONE]: {
        name: "Done",
        items: [],
        isShow: false,
        title: "done"
    }
};

export default function TaskBlock(props) {
    const [columns, setColumns] = useState(() => {

        const initialValue = JSON.parse(localStorage.getItem("baseData"));

        return initialValue || baseData;
    });

    //Add
    const [keyAdd, setKeyAdd] = useState("");
    const handeAdd = (column) => {
        const newObj = { ...columns }
        Object.values(newObj).forEach((val) => {
            console.log(val);
            if (column.title === val.title) {
                newObj[val.title].isShow = true
            } else {
                newObj[val.title].isShow = false
            }
        })

        setColumns(newObj)
    }

    const handeCancel = (column) => {
        const newObj = { ...columns }
        Object.values(newObj).forEach((val) => {
            if (column.title === val.title && column.isShow === false) {
                newObj[val.title].isShow = true
            } else {
                newObj[val.title].isShow = false
            }

        })

        setColumns(newObj)
    }

    const handleChange = (e) => {
        setKeyAdd(e)
    }

    //Get data from API
    useEffect(async () => {
        // const objDataStorage = JSON.parse(localStorage.getItem("baseData"));

        const newColumn = _.cloneDeep(columns)
        const cacheColumn = JSON.parse(localStorage.getItem("baseData"));


        if (cacheColumn == null ||
            cacheColumn[TODO].items.length !== newColumn[TODO].items.length
            || cacheColumn[IN_PROGRESS].items.length !== newColumn[IN_PROGRESS].items.length
            || cacheColumn[DONE].items.length !== newColumn[DONE].items.length) {
            console.log("get data cal API")

            newColumn[TODO].items = []
            newColumn[IN_PROGRESS].items = []
            newColumn[DONE].items = []

            getTask().then(data => {
                _.forEach(data, (task) => {
                    newColumn[task.status].items.push(task)
                })

            }).finally(() => {
                localStorage.setItem("baseData", JSON.stringify(newColumn));
                setColumns(newColumn)
            }
            )

        }

    }, [])


    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            destItems.map((value) => {
                if (value._id === draggableId) {
                    value.status = destination.droppableId
                }
                return 1
            })

            const newColumn = {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            }


            localStorage.setItem("baseData", JSON.stringify(newColumn));
            setColumns(newColumn);

            editTask({
                id: draggableId,
                status: destination.droppableId
            })

            console.log("Khong bang")
        } else {
            console.log("bang")
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            const newColumn = {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            }

            localStorage.setItem("baseData", JSON.stringify(newColumn));
            setColumns(newColumn);

        }

        // localStorage.setItem('baseData', token);
    };

    const HandleSave = async (e, column) => {
        e.preventDefault()

        const newTask = await createTask({
            title: keyAdd,
            status: column.title
        })
        // setListTodo([...listTodo, newTask]);

        const newObj = { ...columns }
        const list = newObj[column.title].items

        newObj[column.title].items = [...list, newTask]

        setColumns(newObj);
    }

    //Delete
    const handleDelete = async (item, event) => {
        event.stopPropagation()

        console.log(item)

        const newObj = { ...columns }
        const list = newObj[item.status].items

        const index = list.findIndex(object => {
            return object._id === item._id;
        });

        if (index !== -1) {
            list.splice(index, 1);
            newObj[item.status].items = list

            await removeTask({
                id: item._id
            })
        }

        setColumns(newObj)


        // var arrayCopy = [...listTodo];

        // var index = arrayCopy.indexOf(idItem)

        // if (index !== -1) {
        //     arrayCopy.splice(index, 1);
        // }

        // await removeTask({
        //     id: idItem._id
        // })

        // setListTodo(arrayCopy);

    }

    //Edit
    const handleEdit = async (idItem, contentItem, titleItem) => {

        console.log(idItem, contentItem, titleItem)

        const newObj = { ...columns }

        newObj[titleItem].items.map(obj => {
            if (obj._id === idItem) {
                obj.title = contentItem
            }
            return obj
        });

        // const newArr = listTodo.map(obj => {
        //     if (obj._id === idItem) {
        //         return { ...obj, title: content };
        //     }

        //     return obj;
        // });
        // setListTodo(newArr);

        if (!!contentItem) {
            await editTask({
                id: idItem,
                title: contentItem,
                status: titleItem
            })
        }

        setColumns(newObj)
    }


    console.log(columns);
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
                                                                                columnDetail={column}
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
                                            <button className="task-block-action-add" onClick={(e) => HandleSave(e, column)}>
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