import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import {reject} from 'lodash';

import Users from './components/Users';
import Input from './components/Input';

// user: id, name
// task: id, description, completed, assigned_to(user_id)
// filter: all, completed, incomplete, archive, unassigned

function App() {
  let [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) ?? []
  );

  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addUser = name => {
    setUsers([{id: uuidv4(), name}, ...users]);
  };

  const removeUser = id => {
    setUsers(reject(users, {id}));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">One of three columns</div>
        <div className="col-md-3">
          <h1>Users</h1>
          <Input add={addUser} />
          <Users users={users} tasks={tasks} remove={removeUser} />
        </div>
      </div>
    </div>
  );
}

export default App;
