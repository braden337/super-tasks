import React, {Fragment} from 'react';
import { capitalize } from 'lodash';

function Filter(props) {
  let filters = ['all', 'archive', 'complete', 'incomplete', 'unassigned'];

  props.filterUser ? filters.push('user') : null;

  return (
    <div className="my-3">
      {filters.map((filter, i) => 
      <Fragment key={filter}>
        <input type="radio" className="btn-check" name="filter" id={`filter${i}`} value={filter} onChange={() => props.change(filter)} checked={filter === 'user'}/>
        <label className="btn btn-secondary mx-1 my-1" htmlFor={`filter${i}`}>{capitalize(filter)}</label>
      </Fragment>
      )}
    </div>
  );
}

export default Filter;