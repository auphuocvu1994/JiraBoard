import React from "react";
import './style.css';
import TaskBlock from '../Task/TaskBlock';
import Drag from '../Task/Drag';

export default function Main(props) {
    return (
        <main className="wrap-content">
            <TaskBlock></TaskBlock>
        </main>
    );
}