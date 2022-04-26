import React, { useState, Fragment } from "react";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';

//list item 
function ListItem(props) {
    const handleShow = () => setShow(true);
    const { obj, name, onEdit, onDelete } = props;

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
                <a href="/#" className="task-block-action-edit" onClick={(e) => onDelete(obj, e)}>
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

export default ListItem