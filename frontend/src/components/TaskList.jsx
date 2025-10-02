import { useState, useEffect } from "react";
import apiClient from "../api";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

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

    // Updating a task
    const handleToggleCompleted = async (taskId, newCompletedStatus) => {
        try {
            //apiClient.path to update 'completed' field
            const response = await apiClient.patch(`/api/tasks/${taskId}/`, {
                completed: newCompletedStatus,
            });

            //update state locally to remove task from UI
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? response.data : task
                )
            );
        } catch (error) {
            console.error('Failed to update task', error)
        }
    };

    const handleDeleteTask = async (taskId) =>{
        try {
            // apiClient.delelte to remove the task from the backend
            await apiClient.delete(`/api/tasks/${taskId}/`);
            
            //update state locally to remove task from UI
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Failed to delete task:',error)
        }
    };

    return (
        <div>
            <h2>My Tasks</h2>
            <AddTaskForm onTaskAdded={handleTaskAdded} />
            <ul>
                {/* Map over the tasks array and create a list item for each one*/}
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onToggleCompleted={handleToggleCompleted}
                        onDelete={handleDeleteTask}
                    />
                ))}
            </ul>
        </div>
    );
}


export default TaskList;