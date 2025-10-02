import React from "react";

//this component recieves the task data and two functions as props
function Task({task, onToggleCompleted, onDelete}){
    return (
        <li>
            <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompleted(task.id, !task.completed)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none'}}>
                {task.title}
            </span>

            <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
    );
}

export default Task;