import React from 'react';
import deleteIcon from './delete.png';

const Elements = ({ todos, setTodos }) => {
  const handleDelete = async (id) => {
    const response = await fetch("/api/deleteNote", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    })

    if (response.status === 200){
      const jsonResponse = await response.json();
      setTodos(jsonResponse.notes)
    }
  };

  const handleSelect = async (id) => {
    const response = await fetch("/api/taskComplete", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    })

    if (response.status === 200){
      const jsonResponse = await response.json();
      setTodos(jsonResponse.notes)
    }
  };

  return (
    <div className='todos-List'>
      {todos.map((element, index) => (
        <div 
          className='todo-element'
          style={{
            textDecoration: element.completed ? "line-through" : "none",
            opacity: element.completed ? "0.5" : "1"
          }}
          key={index}
        >
          <div className='todo-name' >
            <input 
              className='todo-check' 
              type="checkbox" onChange={() => handleSelect(element.id)} 
              checked={element.completed}
            />
            <li>{element.note}</li>
          </div>
          <button style={{padding: "0 1px"}} onClick={() => handleDelete(element.id)}>
            <img
              className='delete'
              src={deleteIcon} 
              alt='Delete'
            />
          </button>
        </div>
      ))}


    </div>

  )
}

export default Elements