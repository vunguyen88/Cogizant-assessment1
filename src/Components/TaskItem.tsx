import React, { ChangeEvent, FormEvent, useState } from 'react'

interface TaskItemProps {
    task: {
        title: string,
        due: string,
        completed: boolean,
        id: number
    };
    editTask: (title: string, id: number, due: string) => void;
    deleteTask: (id: number) => void;
    completeTask: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({task, editTask, deleteTask, completeTask}) => {
    const [taskTitle, setTaskTtitle] = useState(task.title)
    const [dueDate, setDueDate] = useState(task.due)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [newDueDate, setNewDueDate] = useState('')
    const [editForm, setEditForm] = useState(false)
    const openEditForm = () => {
        setEditForm(true) 
    }
    const closeEditForm = () => {
        setEditForm(false)
    }
    const handleNewTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }
    const handleNewDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewDueDate(e.target.value)
    }
    const handleEditSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        editTask(newTaskTitle, task.id, newDueDate)
    }
    const deleteCurrentTask = () => {
        console.log('delete task ', task.id)
        deleteTask(task.id)
    }
    const handleCompleteTask = () => {
        completeTask(task.id)
    }
    return (
        <div>
            <li>{task.title} - Due on: {task.due} - Completed ?  {task.completed===true ? 'Yes' : 'No'} &nbsp;&nbsp;&nbsp; 
                <button onClick={openEditForm}>Edit</button>
                <button onClick={handleCompleteTask}>Complete</button>
                <button onClick={deleteCurrentTask}>Delete</button>
            </li>
            {editForm === true 
                ? <form>
                    <input placeholder='New task title' type='text' value={newTaskTitle} onChange={handleNewTaskTitleChange}/>
                    <input placeholder='New due date' type='text' value={newDueDate} onChange={handleNewDueDateChange}/>
                    <button type='submit' onClick={handleEditSubmit}>Change</button>
                    <button onClick={closeEditForm}>Cancel</button>
                    </form>
                : <></>
            }
        </div> 
    )
}
