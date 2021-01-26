import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { reject, update, find, set } from 'lodash';

import Users from './components/Users';
import Input from './components/Input';
import Tasks from './components/Tasks'

// user: id, name
// task: id, description, completed, assigned_to(user_id)
// filter: all, completed, incomplete, archive, unassigned

function App() {
  let [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) ?? []
  );

  let [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) ?? []
  );

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks)
  }, [tasks]);

  const addUser = name => {
    setUsers([{ id: uuidv4(), name }, ...users]);
  };

  const removeUser = id => {
    setUsers(reject(users, { id }));
  };

  const addTask = description => {
    setTasks([{ id: uuidv4(), description, complete: false, archive: false }, ...tasks])
  }

  const removeTask = task => {
    if (task.complete) {
      let modified = [...tasks]
      let foundTask = find(modified, { id: task.id })
      set(foundTask, 'archive', true)
      
      setTasks(modified)
    } else {
      setTasks(reject(tasks, { id: task.id }))
    }
  }

  const toggleTask = (id) => {
    let modified = [...tasks]
    let task = find(modified, { id })
    update(task, 'complete', x => !x)

    setTasks(modified)
  }

  const assignTask = (user_id, id) => {
    let modified = [...tasks]
    let task = find(modified, { id })
    set(task, 'user_id', user_id)

    setTasks(modified)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <h1>Tasks</h1>
          <Input add={addTask} />
          <Tasks {...{ tasks, users, removeTask, toggleTask, assignTask }} />
        </div>
        <div className="col-md-3">
          <h1>Users</h1>
          <Input add={addUser} />
          <Users {...{ users, tasks, removeUser }} />
        </div>
      </div>
    </div>
  );
}

export default App;
