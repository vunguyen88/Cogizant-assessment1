import { initial } from 'lodash';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { TaskItem } from './Components/TaskItem';
import { AddTaskForm } from './Components/AddTaskForm';
import moment from 'moment';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { Input } from '@material-ui/core';
var array = require('lodash/array')

type Task = {
  title: string;
  completed: boolean;
  id: number;
  due: string;
}

const initialTasks: Array<Task> = []

const App: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchInput, setSearchInput] = useState('')
  let todayDate: string = moment().format('MM/DD/YYYY');
  let taskSearch = tasks;
  const addNewTask = (title: string, completed: boolean, id: number, due: string)  => {
    setTasks([...tasks, {title: title, completed: completed, id: id, due: due}])
  }
  const editTask = (title: string, id: number, due:string) => {
    let index = array.findIndex(tasks, function(o: any) {return o.id === id})
    tasks[index] = {...tasks[index], title, due}
    setTasks([...tasks])
  }
  const deleteTask = (id: number) => {
    array.remove(tasks, function(task:any) {
      return task.id === id
    })
    setTasks([...tasks])
  }
  const completeTask = (id: number) => {
    let index = array.findIndex(tasks, function(o: any) {return o.id === id})
    tasks[index] = {...tasks[index], completed: !tasks[index].completed}
    setTasks([...tasks])
  }
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value)
  }
  if(searchInput.length > 0){
    console.log('search input ', searchInput)
    taskSearch = taskSearch.filter(task => {
      return task.title.match(searchInput)
    })
  }
  return (
    <div>
      <p>Today date is: {todayDate}</p>
      {tasks.map(task => {
        return <TaskItem task={task} key={task.id} editTask={editTask} deleteTask={deleteTask} completeTask={completeTask}/>
      })}
      <AddTaskForm addNewTask={addNewTask}/>
      <input 
        type='text'
        placeholder='Search'
        onChange={handleSearchChange}
        value={searchInput}
      />
      {searchInput.length >0 ? 
        taskSearch.map((task, index) => {
          return(
             <div key={index}>{task.title}</div>
          )
        }) : <></>
      }
    </div>
  );
}

export default App;
