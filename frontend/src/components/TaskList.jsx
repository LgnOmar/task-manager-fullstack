import { useState, useEffect } from "react";
import apiClient from "../api";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

function TaskList(){
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // apiClient.get('/tasks/').then(response =>{
        //     setTasks(response.data);
        // }).catch(error => console.error('Failed to fetch tasks:', error));

        const fetchTasks = async () => {
            try {
                const response = await apiClient.get('/api/tasks/');
                if (Array.isArray(response.data)) {
                    setTasks(response.data);
                } else {
                    console.log("API did not return an array for tasks:", response.data);
                    setTasks([]);
                }
            } catch (error) {
                console.log("Failed to fetch fasks",error);
                setTasks([]);
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
            //apiClient.patch to update 'completed' field
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
        <div className="max-w-2x1 mx-auto bg-white rounded-xl shadow-md p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                My Tasks
            </h2>

            <AddTaskForm onTaskAdded={handleTaskAdded} />
            <ul className="mt-4 space-y-2">
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