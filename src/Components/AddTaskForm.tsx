import { identity } from 'lodash';
import React, { ChangeEvent, FormEvent, useState } from 'react'

interface AddTaskFormProps {
    addNewTask: (title: string, completed: boolean, id: number, due: string) => void;
}
// interface newTaskProps {
//     task: {
//         title: string,
//         due: string,
//         completed: boolean,
//         id: number
//     };
// }

class Task {
    static nextId: number = 0;
    id: number;
    taskTitle: string;
    due: string;
    completed: boolean;
    constructor(taskTitle: string, due: string) {
        this.id = ++Task.nextId;
        this.taskTitle = taskTitle;
        this.due = due;
        this.completed = false;
    }
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ addNewTask }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    
    const handleTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value)
    }
    const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value)
    }
    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let newoneTask = new Task(taskTitle, dueDate)
        addNewTask(newoneTask.taskTitle, newoneTask.completed, newoneTask.id, newoneTask.due)
        setTaskTitle('')
        setDueDate('')
    }
    return (
        <form>
            <label>Add task:</label>
            <input type='text' placeholder='Task title' value={taskTitle} onChange={handleTaskTitleChange} />
            <input type='text' placeholder='Due date' value={dueDate} onChange={handleDueDateChange} />
            <button type='submit' onClick={handleSubmit}>Add new</button>
        </form>
    )
}
