import React from 'react';
import ToDoListItem from '../ToDoListItem';
import './ToDoList.css';

const ToDoList = ({ stuffList, onDeleted, onToggleDone, onToggleImportant }) => {
    const items = stuffList.map((item) => {

        const { id, label, important, done } = item;

        return (
            <li className="list-group-item" key={ id }>
                <ToDoListItem 
                    label={label} important={important} done={done}
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant={()=>onToggleImportant(id)}
                    onToggleDone={()=>onToggleDone(id)}/>
            </li>
        );      
    });

    return (
        <ul className="list-group todo-list">
            { items }
        </ul>
    );
};

export default ToDoList;