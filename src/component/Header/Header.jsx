import React, { useState } from "react";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faCircleInfo, faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getTask } from "../../service/ActionTask";
import ListItem from "../ListItem/ListItem";
//Lấy ra state và dispatch từ store
// import { useStore } from "../../store/hooks";


export default function Header(props) {
    const navigate = useNavigate();
    const [lstFilter, setLstFilter] = useState();
    const [isShow, setIsShow] = useState(false);
    // const [state, dispatch] = useStore()
    // console.log(state)

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }

    const handleChange = async (e) => {
        // setTxtContent(() => e.target.value)

        if (e.target.value.length > 0) {
            const lstTask = await getTask({
                query: e.target.value
            })

            setLstFilter(() => lstTask)

            setIsShow(true)
            console.log(lstTask)
        } else {
            setLstFilter(() => [])
            
            setIsShow(false)
        }
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
                        <Form.Control onChange={(e) => handleChange(e)} type="text" placeholder="Search" />
                    </Form.Group>
                    {isShow && <div className="search-box-filter-list task-block-main">
                        {lstFilter.map((item, index) => {
                            return (
                                <ListItem
                                    key={item._id}
                                    id={item._id}
                                    obj={item}
                                    name={item.title}
                                // onEdit={handleEdit}
                                // onDelete={handleDelete}
                                />)
                        })}
                    </div>
                    }

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