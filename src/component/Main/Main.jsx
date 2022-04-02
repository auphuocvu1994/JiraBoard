import React from "react";
import './style.css';
import TaskBlock from '../Task/TaskBlock';

export default function Main(props) {
    return (
        <main className="wrap-content">
            <TaskBlock></TaskBlock>
        </main>
    );
}