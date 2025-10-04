import React from "react";

//this component recieves the task data and two functions as props
function Task({task, onToggleCompleted, onDelete}){
    return (
        <li className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
        <div className="flex items-center">
            <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompleted(task.id, !task.completed)}
            className="h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
            />
            <span
            className={`ml-3 font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}
            >
            {task.title}
            </span>
        </div>
        <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 font-semibold"
        >
            Delete
        </button>
        </li>
    );
}

export default Task;