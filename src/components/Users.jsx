import React from 'react';
import {filter, reject} from 'lodash';

function Users(props) {
  const remove = id => {
    props.remove(id);
  };

  let users = props.users.map(({id, name}) => ({
    id,
    name,
    complete: filter(filter(props.tasks, 'completed'), {user_id: id}).length,
    incomplete: filter(reject(props.tasks, 'completed'), {user_id: id}).length,
  }));

  return (
    <table className="table">
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td className="align-middle">{user.name}</td>
            <td className="text-center">
              <button type="button" className="btn btn-success" disabled>
                <span className="px-1">{user.complete}</span>
                <i className="bi bi-check2-circle"></i>
                <span className="px-1">{user.incomplete}</span>
                <i className="bi bi-circle-fill"></i>
              </button>
            </td>
            <td className="text-end">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => remove(user.id)}>
                <i className="bi bi-x-circle"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Users;
