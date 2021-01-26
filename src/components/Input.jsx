import React, {useState} from 'react';

function Input(props) {
  let [text, setText] = useState('');

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    let input = text.trim();

    if (input !== '') {
      props.add(input);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add new"
          aria-label="Add new"
          aria-describedby="button-addon2"
          value={text}
          onChange={handleChange}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default Input;
