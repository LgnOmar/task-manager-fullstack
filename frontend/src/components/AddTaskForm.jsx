import { useState } from "react";
import apiClient from "../api";

// revieve the onTaskAdded function as a prop
function AddTaskForm({ onTaskAdded }){
    // State to manage the title of the new task
    const [title, setTitle] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation: do not submit if title is empty
        if (!title.trim()) {
            return;
        }

        try {
            // Use our apiClient to send a POST request
            const response = await apiClient.post('/api/tasks/', {
                title: title,
            });

            // call the function passed down from the parent to notify it that a new task has been created.
            // we pass the new task object from the API response
            onTaskAdded(response.data);

            setTitle('');

        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task!"
            />

            <button type="submit">Add Task</button>
        </form>
    );
}

export default AddTaskForm;