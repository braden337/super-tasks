import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import {reject, update, find, set, filter} from 'lodash';

import Users from './components/Users';
import Input from './components/Input';
import Tasks from './components/Tasks';
import Filters from './components/Filters';

import {fakeUsers, fakeTasks} from './data';

// user: id, name
// task: id, description, complete, user_id
// filters: all, complete, incomplete, archive, unassigned, user

function App() {
  let [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) ?? []
  );

  let [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) ?? []
  );

  let [filtered, setFiltered] = useState(
    JSON.parse(localStorage.getItem('filtered')) ?? []
  );

  let [currentFilter, setCurrentFilter] = useState(
    JSON.parse(localStorage.getItem('currentFilter')) ?? 'all'
  );

  let [predicate, setPredicate] = useState(
    JSON.parse(localStorage.getItem('predicate')) ?? {archive: false}
  );

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('filtered', JSON.stringify(filtered));
  }, [filtered]);

  useEffect(() => {
    localStorage.setItem('currentFilter', JSON.stringify(currentFilter));
  }, [currentFilter]);

  useEffect(() => {
    localStorage.setItem('predicate', JSON.stringify(predicate));
  }, [predicate]);

  useEffect(() => {
    setFiltered(filter(tasks, predicate));
  }, [tasks, predicate]);

  const load = () => {
    setUsers(fakeUsers);
    setTasks(fakeTasks);
  };

  const reset = () => {
    localStorage.clear();
    window.location = '/';
  };

  const addUser = name => {
    setUsers([{id: uuidv4(), name}, ...users]);
  };

  const removeUser = id => {
    setUsers(reject(users, {id}));
  };

  const addTask = description => {
    setTasks([
      {
        id: uuidv4(),
        description,
        complete: false,
        archive: false,
        user_id: '_',
      },
      ...tasks,
    ]);
  };

  const removeTask = task => {
    if (task.complete) {
      let modified = [...tasks];
      let foundTask = find(modified, {id: task.id});
      set(foundTask, 'archive', true);

      setTasks(modified);
    } else {
      setTasks(reject(tasks, {id: task.id}));
    }
  };

  const toggleTask = id => {
    let modified = [...tasks];
    let task = find(modified, {id});
    update(task, 'complete', x => !x);

    setTasks(modified);
  };

  const assignTask = (user_id, id) => {
    let modified = [...tasks];
    let task = find(modified, {id});
    set(task, 'user_id', user_id);

    setTasks(modified);
  };

  const changeFilter = (type, user) => {
    const predicate = {};

    if (['all', 'complete', 'incomplete', 'unassigned', null].includes(type)) {
      predicate.archive = false;
    }

    switch (type) {
      case 'archive':
        predicate.archive = true;
        break;
      case 'complete':
        predicate.complete = true;
        break;
      case 'incomplete':
        predicate.complete = false;
        break;
      case 'unassigned':
        predicate.user_id = '_';
        break;
      case null:
        predicate.user_id = user.id;
    }

    setCurrentFilter(type ?? user.name);
    setPredicate(predicate);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <h1>Tasks</h1>
          <Input add={addTask} />
          <Filters change={changeFilter} currentFilter={currentFilter} />
          <Tasks
            {...{tasks: filtered, users, removeTask, toggleTask, assignTask}}
          />
        </div>
        <div className="col-md-3">
          <h1>Users</h1>
          <Input add={addUser} />
          <Users {...{users, tasks, removeUser, changeFilter}} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {users.length || tasks.length ? (
            <button className="btn btn-warning" onClick={reset}>
              Reset
            </button>
          ) : (
            <button className="btn btn-info" onClick={load}>
              Load
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
