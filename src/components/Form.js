import React from 'react';

const Form = ({ input, setInput, todos, setTodos }) => {
  const onInputChange = (event) => {
    setInput(event.target.value);
  }
  const onFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/addNote", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({input}),
    })

    if (response.status === 200){
      const jsonResponse = await response.json();
      setTodos(jsonResponse.notes)
    }

    setInput("")
  }
  return (
    <form onSubmit={onFormSubmit} className='todo-form'>
      <input
        type="text"
        placeholder='Enter a Todo...'
        className='task-input'
        value={input}
        required
        onChange={onInputChange}
      />
      <button className='button-add' type='submit'>
        Add
      </button>
    </form>
  )
}

export default Form