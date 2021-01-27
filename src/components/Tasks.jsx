import React from 'react';

export default function Tasks(props) {
  const handleChange = (e, id) => {
    let user_id = e.target.value;

    props.assignTask(user_id, id);
  };

  return props.tasks.length ? (
    <table className="table">
      <tbody>
        {props.tasks.map(task => (
          <tr key={task.id}>
            <td className="align-middle">{task.description}</td>
            <td className="text-center">
              <button
                type="button"
                className="btn btn-success mx-1"
                onClick={() => props.toggleTask(task.id)}
                disabled={task.archive}>
                {task.complete ? (
                  <i className="bi bi-check2-circle"></i>
                ) : (
                  <i className="bi bi-circle"></i>
                )}
              </button>
              <button
                type="button"
                className="btn btn-danger mx-1"
                onClick={() => props.removeTask(task)}
                disabled={task.archive}>
                <i className="bi bi-x-circle"></i>
              </button>
            </td>
            <td>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={e => handleChange(e, task.id)}
                value={task.user_id}
                disabled={task.archive}>
                <option defaultValue>{task.archived_by ?? '_'}</option>
                {props.users.map(user => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h3>No tasks found</h3>
  );
}
