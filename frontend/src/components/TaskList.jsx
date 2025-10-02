import { useState, useEffect } from "react";
import apiClient from "../api";
import AddTaskForm from "./AddTaskForm";

function TaskList(){
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // apiClient makes GET requests to the /api/tasks/ endpoint
                const response = await apiClient.get('/api/tasks/');
                setTasks(response.data) //store fetched data in state
            } catch (error) {
                console.error('Failed to fetch tasks:', error)
                
            }
        };

        fetchTasks();
    }, []);

    // responsible for updating the state
    const handleTaskAdded = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask])
    };

    return (
        <div>
            <h2>My Tasks</h2>
            <AddTaskForm onTaskAdded={handleTaskAdded} />
            <ul>
                {/* Map over the tasks array and create a list item for each one*/}
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default TaskList;