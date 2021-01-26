import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import {reject, update, find, set, filter} from 'lodash';

import Users from './components/Users';
import Input from './components/Input';
import Tasks from './components/Tasks';
import Filters from './components/Filters';

// user: id, name
// task: id, description, completed, assigned_to(user_id)
// filter: all, completed, incomplete, archive, unassigned

function App() {
  let [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) ?? []
  );

  let [filtered, setFiltered] = useState(
    JSON.parse(localStorage.getItem('filtered')) ?? []
  );

  let [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) ?? []
  );

  let [predicate, setPredicate] = useState(
    JSON.parse(localStorage.getItem('predicate')) ?? {archive: false}
  );

  let [currentFilter, setCurrentFilter] = useState(
    JSON.parse(localStorage.getItem('currentFilter')) ?? 'all'
  );

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('currentFilter', JSON.stringify(currentFilter));
  }, [currentFilter]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setFiltered(filter(tasks, predicate));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('filtered', JSON.stringify(filtered));
  }, [filtered]);

  useEffect(() => {
    localStorage.setItem('predicate', JSON.stringify(predicate));
    setFiltered(filter(tasks, predicate));
  }, [predicate]);

  const load = () => {
    let one = uuidv4();
    let two = uuidv4();
    let three = uuidv4();

    setUsers([
      {id: one, name: 'Prince'},
      {id: two, name: 'Oscar'},
      {id: three, name: 'Fred'},
    ]);

    setTasks([
      {
        id: one,
        description: 'Eat',
        complete: true,
        archive: true,
        user_id: one,
      },
      {
        id: two,
        description: 'Walk',
        complete: false,
        archive: false,
        user_id: two,
      },
      {
        id: three,
        description: 'Sleep',
        complete: false,
        archive: false,
        user_id: '_',
      },
    ]);
  };

  const reset = () => {
    setUsers([]);
    setTasks([]);
    setFiltered([]);
    setPredicate({archive: false});
    setCurrentFilter('all');
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

  const changeFilter = filter => {
    const predicate = {};

    setCurrentFilter(filter);

    switch (filter) {
      case 'all':
        predicate.archive = false;
        break;
      case 'archive':
        predicate.archive = true;
        break;
      case 'complete':
        predicate.archive = false;
        predicate.complete = true;
        break;
      case 'incomplete':
        predicate.archive = false;
        predicate.complete = false;
        break;
      case 'unassigned':
        predicate.archive = false;
        predicate.user_id = '_';
        break;
      default:
        predicate.archive = false;
        predicate.user_id = filter.id;
        setCurrentFilter(filter.name);
    }

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
